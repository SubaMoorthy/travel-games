// MCP-style Tool System for Dynamic Content Fetching
// Models the content fetching as composable tools similar to Model Context Protocol

// Tool Registry - Register all available content fetching tools
const ToolRegistry = {
    tools: new Map(),
    
    register(toolName, toolImpl) {
        this.tools.set(toolName, toolImpl);
        console.log(`[ToolRegistry] Registered tool: ${toolName}`);
    },
    
    async invokeTool(toolName, params) {
        const tool = this.tools.get(toolName);
        if (!tool) {
            throw new Error(`Tool not found: ${toolName}`);
        }
        return await tool.execute(params);
    },
    
    listTools() {
        return Array.from(this.tools.keys());
    }
};

// Wikipedia Fetch Tool (MCP-style)
const WikipediaFetchTool = {
    name: 'fetch_wikipedia',
    description: 'Fetches content from Wikipedia for a given destination',
    
    async execute({ destination, query = '' }) {
        try {
            console.log(`[WikipediaFetchTool] Fetching content for: ${destination}`);
            
            // Search for the page
            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(destination)}&format=json&origin=*`;
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();
            
            if (!searchData.query?.search?.length) {
                return { facts: [], landmarks: [], history: [], source: 'wikipedia' };
            }
            
            const pageId = searchData.query.search[0].pageid;
            const pageTitle = searchData.query.search[0].title;
            
            // Fetch page content, categories, and links for better context
            const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts|categories|extlinks&exintro=false&explaintext=true&excllimit=50&ellimit=10&format=json&origin=*`;
            const contentResponse = await fetch(contentUrl);
            const contentData = await contentResponse.json();
            
            const pageData = contentData.query.pages[pageId];
            const extract = pageData.extract || '';
            const categories = pageData.categories || [];
            const extlinks = pageData.extlinks || [];
            
            console.log(`[WikipediaFetchTool] Successfully fetched: ${pageTitle}`);
            console.log(`[WikipediaFetchTool] Categories:`, categories.map(c => c.title).slice(0, 5));
            
            return this.parseContent(extract, destination, categories, extlinks);
            
        } catch (error) {
            console.error('[WikipediaFetchTool] Error:', error);
            return { facts: [], landmarks: [], history: [], source: 'wikipedia', error: error.message };
        }
    },
    
    parseContent(text, destination, categories = [], extlinks = []) {
        const facts = [];
        const landmarks = [];
        const history = [];
        
        // Extract category context for better environment detection
        const categoryText = categories.map(c => c.title).join(' ');
        
        if (!text) return { facts, landmarks, history, categories: categoryText, source: 'wikipedia' };
        
        // Split into sentences (get more content, not just intro)
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        
        // Extract interesting facts (first 8-10 sentences for better context)
        const factSentences = sentences
            .filter(s => s.length > 50 && s.length < 300)
            .slice(0, 10);
        
        factSentences.forEach(sentence => {
            const cleaned = sentence.trim();
            
            // Categorize based on keywords
            if (/founded|established|built|history|century|year|ago|ancient|historic/i.test(cleaned)) {
                history.push(cleaned);
            } else if (/monument|landmark|building|tower|statue|park|museum|site|cathedral|temple/i.test(cleaned)) {
                landmarks.push(cleaned);
            } else {
                facts.push(cleaned);
            }
        });
        
        return { facts, landmarks, history, categories: categoryText, source: 'wikipedia' };
    }
};

// NPS Fetch Tool (MCP-style)
const NPSFetchTool = {
    name: 'fetch_nps',
    description: 'Fetches content from National Park Service API for parks and nature destinations',
    
    async execute({ destination }) {
        try {
            console.log(`[NPSFetchTool] Fetching NPS content for: ${destination}`);
            
            // Check if destination might be a national park
            const parkKeywords = ['park', 'national', 'monument', 'forest', 'wilderness', 'trail', 'canyon', 'mountain', 'valley', 'lake', 'river'];
            const isLikelyPark = parkKeywords.some(keyword => 
                destination.toLowerCase().includes(keyword)
            );
            
            if (!isLikelyPark) {
                console.log(`[NPSFetchTool] Skipping - not a likely park destination`);
                return { nature: [], activities: [], landmarks: [], source: 'nps' };
            }
            
            // NPS API - search for parks
            const apiKey = 'demo'; // Using demo key - replace with real key for production
            const searchUrl = `https://developer.nps.gov/api/v1/parks?q=${encodeURIComponent(destination)}&limit=3&api_key=${apiKey}`;
            
            const response = await fetch(searchUrl);
            const data = await response.json();
            
            console.log(`[NPSFetchTool] Found ${data.data?.length || 0} parks`);
            return this.parseContent(data);
            
        } catch (error) {
            console.error('[NPSFetchTool] Error:', error);
            return { nature: [], activities: [], landmarks: [], source: 'nps', error: error.message };
        }
    },
    
    parseContent(data) {
        const nature = [];
        const activities = [];
        const landmarks = [];
        
        if (!data.data || data.data.length === 0) {
            return { nature, activities, landmarks, source: 'nps' };
        }
        
        data.data.forEach(park => {
            // Extract description as nature fact
            if (park.description) {
                nature.push(park.description);
            }
            
            // Extract activities
            if (park.activities && Array.isArray(park.activities)) {
                activities.push(...park.activities.map(a => a.name).slice(0, 5));
            }
            
            // Extract landmarks/points of interest
            if (park.designation) {
                landmarks.push(`${park.fullName} - ${park.designation}`);
            }
            
            // Add weather info if available
            if (park.weatherInfo) {
                nature.push(park.weatherInfo);
            }
        });
        
        return { nature, activities, landmarks, source: 'nps' };
    }
};

// Register tools
ToolRegistry.register('fetch_wikipedia', WikipediaFetchTool);
ToolRegistry.register('fetch_nps', NPSFetchTool);

// Main Content Fetcher - Orchestrates multiple tools
const ContentFetcher = {
    cache: new Map(),
    
    // Fetch content about a destination using multiple tools
    async fetchDestinationContent(destination) {
        const cacheKey = destination;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            console.log(`[ContentFetcher] Cache hit for: ${cacheKey}`);
            return this.cache.get(cacheKey);
        }
        
        console.log(`[ContentFetcher] Fetching content for: ${destination}`);
        
        const content = {
            facts: [],
            landmarks: [],
            nature: [],
            history: [],
            activities: [],
            destination: destination,
            sources: []
        };
        
        try {
            // Invoke multiple tools in parallel (MCP-style tool invocation)
            const toolInvocations = [
                ToolRegistry.invokeTool('fetch_wikipedia', { destination }),
                ToolRegistry.invokeTool('fetch_nps', { destination })
            ];
            
            const results = await Promise.allSettled(toolInvocations);
            
            // Process Wikipedia results
            if (results[0].status === 'fulfilled') {
                const wikiData = results[0].value;
                content.facts.push(...wikiData.facts);
                content.landmarks.push(...wikiData.landmarks);
                content.history.push(...wikiData.history);
                content.categories = wikiData.categories || ''; // Store categories for environment analysis
                if (wikiData.facts.length > 0 || wikiData.landmarks.length > 0) {
                    content.sources.push('Wikipedia');
                }
            }
            
            // Process NPS results
            if (results[1].status === 'fulfilled') {
                const npsData = results[1].value;
                content.nature.push(...npsData.nature);
                content.activities.push(...npsData.activities);
                content.landmarks.push(...npsData.landmarks);
                if (npsData.nature.length > 0 || npsData.activities.length > 0) {
                    content.sources.push('National Park Service');
                }
            }
            
            console.log(`[ContentFetcher] Fetched content from: ${content.sources.join(', ')}`);
            
            // Cache the result
            this.cache.set(cacheKey, content);
            return content;
            
        } catch (error) {
            console.error('[ContentFetcher] Error:', error);
            return this.getFallbackContent(destination);
        }
    },
    
    // Fallback content when tools fail
    getFallbackContent(destination) {
        console.log(`[ContentFetcher] Using fallback content for: ${destination}`);
        return {
            facts: [
                `${destination} is an interesting place with many things to discover.`,
                'Every destination has its own unique characteristics and attractions.',
                'Exploring new places helps us learn about the world.'
            ],
            landmarks: [`${destination} attractions`, 'Notable sites'],
            nature: ['Natural surroundings', 'Local landscape'],
            history: [`${destination} has its own unique story.`],
            activities: ['Exploring', 'Sightseeing', 'Discovering'],
            destination: destination,
            sources: ['Fallback']
        };
    },
    
    // Analyze content to determine actual environment type
    analyzeEnvironment(content) {
        const allText = [
            ...content.facts,
            ...content.landmarks,
            ...content.history,
            ...content.nature,
            content.categories || '' // Include Wikipedia categories for better detection
        ].join(' ').toLowerCase();
        
        const environment = {
            isThemePark: /theme park|amusement park|water park|entertainment|resort|attraction|roller coaster|rides|legoland|disneyland|disney|universal studios|six flags|carousel|ferris wheel/i.test(allText),
            isDesert: /desert|arid|dry|sand dune|heat|hot|below sea level|drought|canyon|barren/i.test(allText),
            isForest: /forest|woodland|trees|pine|oak|redwood|sequoia/i.test(allText),
            isCoastal: /coast|ocean|sea|beach|shore|maritime|tidal/i.test(allText),
            isMountain: /mountain|peak|summit|alpine|elevation|cliff/i.test(allText),
            isUrban: /city|urban|metropolitan|downtown|building|street/i.test(allText),
            // Separate geothermal volcanic (Yellowstone) from stratovolcano (Rainier)
            isGeothermal: /geyser|hot spring|geothermal|fumarole|thermal feature|thermal pool|boiling|steam vent/i.test(allText),
            isVolcanic: /volcano|volcanic|lava|crater|stratovolcano|eruption/i.test(allText),
            isGlacial: /glacier|ice|frozen|arctic|tundra|snowfield|ice cap/i.test(allText),
            isWetland: /wetland|marsh|swamp|bayou|everglades/i.test(allText),
            hasWildlife: /wildlife|animal|bird|bear|deer|elk|buffalo|bison/i.test(allText),
            isHistoric: /historic|ancient|century|founded|built|heritage/i.test(allText)
        };
        
        // Determine primary characteristics
        const characteristics = [];
        if (environment.isThemePark) characteristics.push('theme-park');
        if (environment.isDesert) characteristics.push('desert');
        if (environment.isGlacial) characteristics.push('glacial'); // Prioritize glacier over mountain
        if (environment.isGeothermal) characteristics.push('geothermal');
        if (environment.isForest) characteristics.push('forest');
        if (environment.isCoastal) characteristics.push('coastal');
        if (environment.isMountain) characteristics.push('mountain');
        if (environment.isUrban) characteristics.push('urban');
        if (environment.isVolcanic) characteristics.push('volcanic');
        if (environment.isWetland) characteristics.push('wetland');
        if (environment.hasWildlife) characteristics.push('wildlife');
        if (environment.isHistoric) characteristics.push('historic');
        
        return {
            ...environment,
            characteristics,
            primaryType: characteristics[0] || 'general'
        };
    },
    
    // Generate a story paragraph from content
    generateStoryParagraph(content, ageLevel) {
        const { facts, landmarks, history, nature, activities } = content;
        
        // Combine available content
        const allContent = [...facts, ...landmarks, ...history, ...nature];
        
        if (allContent.length === 0) {
            return null;
        }
        
        // Adapt language complexity based on age
        const fact = allContent[Math.floor(Math.random() * allContent.length)];
        
        if (ageLevel === 'beginner') {
            // Simplify for ages 4-5
            return this.simplifyText(fact);
        } else if (ageLevel === 'intermediate') {
            // Moderate complexity for ages 6-7
            return this.moderateText(fact);
        } else {
            // Use original for advanced readers
            return fact;
        }
    },
    
    // Simplify text for younger readers
    simplifyText(text) {
        // Break into shorter sentences, use simpler words
        return text
            .replace(/approximately|roughly/gi, 'about')
            .replace(/numerous|multiple/gi, 'many')
            .replace(/beautiful|magnificent|stunning/gi, 'pretty')
            .split(/[.!?]/)[0] + '.';
    },
    
    // Moderate text complexity
    moderateText(text) {
        // Keep it engaging but not too complex
        const sentences = text.split(/[.!?]/);
        return sentences.slice(0, 2).join('. ') + '.';
    },
    
    // Get specific facts for story elements
    getFactForStoryElement(content, element) {
        switch (element) {
            case 'landmark':
                return content.landmarks[0] || null;
            case 'history':
                return content.history[0] || null;
            case 'nature':
                return content.nature[0] || null;
            case 'activity':
                return content.activities[0] || null;
            default:
                return content.facts[0] || null;
        }
    }
};
