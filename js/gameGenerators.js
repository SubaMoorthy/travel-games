// Game generation functions
const GameGenerators = {
    
    // Ages 2-4 Games
    async generateStoryBook(destination) {
        // Show loading indicator
        const loadingHtml = `
            <div style="padding: 40px; text-align: center;">
                <div style="font-size: 60px; margin-bottom: 20px;">📚</div>
                <h3>Creating your personalized ${destination} story...</h3>
                <p style="margin-top: 20px; color: #666;">Gathering interesting facts from Wikipedia and NPS...</p>
                <div style="margin-top: 20px; font-size: 30px;">⏳</div>
            </div>
        `;
        
        // Fetch dynamic content
        let content;
        try {
            content = await ContentFetcher.fetchDestinationContent(destination);
        } catch (error) {
            console.error('Error fetching content:', error);
            content = ContentFetcher.getFallbackContent(destination);
        }
        const createStoryPage = (text, emoji) => `
            <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #667eea; border-radius: 15px; margin-bottom: 20px; min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div style="font-size: 120px; margin-bottom: 20px; text-align: center;">${emoji}</div>
                <p style="font-size: 1.8em; text-align: center; line-height: 1.6; color: #333; font-weight: 500;">${text}</p>
            </div>
        `;
        
        // Helper to extract a kid-friendly detail
        const getSpecialThing = () => {
            if (content.landmarks && content.landmarks.length > 0) {
                const landmark = content.landmarks[0].split(' - ')[0]; // Remove extra descriptions
                return landmark.length < 40 ? landmark : 'something special';
            }
            return 'something special';
        };
        
        const getActivityName = () => {
            if (content.activities && content.activities.length > 0) {
                return content.activities[0].toLowerCase();
            }
            return 'exploring';
        };
        
        // Analyze environment to determine what this place is REALLY like
        const env = ContentFetcher.analyzeEnvironment(content);
        console.log(`[Story] Environment analysis for ${destination}:`, env.characteristics);
        
        // Create contextually appropriate story based on actual environment
        const stories = [];
        const specialThing = getSpecialThing();
        const activity = getActivityName();
        
        // Story arc - Keep it fun and simple!
        stories.push({ text: `My Big ${destination} Adventure!`, emoji: '🌆' });
        stories.push({ text: `Today I'm going somewhere exciting!\nCan you guess where?\n${destination}!`, emoji: '✈️' });
        
        // Generate contextually appropriate experiences based on ACTUAL environment
        let environmentStories = [];
        
        if (env.isThemePark) {
            // Theme park environment
            environmentStories = [
                { text: `${destination} is SO fun!\nRides everywhere!\n${specialThing !== 'something special' ? `I even saw ${specialThing}!` : 'I can\'t wait!'}`, emoji: '🎢' },
                { text: 'Round and round!\nUp and down!\nWeee!', emoji: '🎠' },
                { text: 'Cotton candy!\nSo pink and sweet!\nYum yum!', emoji: '🍭' },
                { text: 'Music plays!\nI dance!\nBest day ever!', emoji: '🎵' },
                { text: 'Characters wave!\nI wave back!\nSo exciting!', emoji: '🤡' }
            ];
        } else if (env.isDesert) {
            // Desert-specific story
            environmentStories = [
                { text: `${destination} is so different!\nThe land is dry and vast.\n${specialThing !== 'something special' ? `I can see ${specialThing} far away!` : 'Sand and rocks everywhere!'}`, emoji: '🏜️' },
                { text: 'It is SO HOT here!\nThe sun is very bright.\nI wear my hat and drink water!', emoji: '☀️' },
                { text: `The ground looks special.\nRed rocks! Sandy dunes!\n${env.isVolcanic ? 'And valleys down below!' : 'Wide open spaces!'}`, emoji: '🗻' },
                { text: 'Look! A lizard runs fast!\nAnimals here love the heat.\nThey are so cool!', emoji: '🦎' },
                { text: 'At night it gets cold!\nThe stars are SO bright!\nI can see millions!', emoji: '✨' }
            ];
        } else if (env.isGeothermal) {
            // Geothermal/hot springs environment (Yellowstone)
            environmentStories = [
                { text: `${destination} is bubbling!\nSteam comes from the ground!\n${specialThing !== 'something special' ? `Look at ${specialThing}!` : 'So magical!'}`, emoji: '💨' },
                { text: 'I see hot springs!\nThe water is steamy.\nIt smells like sulfur!', emoji: '♨️' },
                { text: 'The ground feels warm!\nColors everywhere - yellow, orange!\nNature is amazing!', emoji: '🌋' },
                { text: 'Geysers shoot up HIGH!\nWoosh! Up it goes!\nThen it comes back down!', emoji: '💦' },
                { text: 'This place is special!\nThe earth is alive here!\nSo incredible!', emoji: '🔥' }
            ];
        } else if (env.isGlacial) {
            // Glacial/snow/ice environment (Mt. Rainier, Alaska)
            environmentStories = [
                { text: `${destination} is covered in snow!\nWhite everywhere!\n${specialThing !== 'something special' ? `I see ${specialThing}!` : 'So beautiful!'}`, emoji: '🏔️' },
                { text: 'The mountain is SO tall!\nIt touches the clouds!\nI feel tiny!', emoji: '⛰️' },
                { text: 'Ice and snow sparkle!\nGlaciers are huge!\nLike frozen rivers!', emoji: '❄️' },
                { text: 'The air is cold!\nI bundle up warm!\nMy breath makes clouds!', emoji: '🧊' },
                { text: 'This place is special!\nNature is so powerful!\nAmazing!', emoji: '✨' }
            ];
        } else if (env.isVolcanic) {
            // Volcanic mountain without geothermal (dormant volcano)
            environmentStories = [
                { text: `${destination} is a huge mountain!\n${specialThing !== 'something special' ? `I can see ${specialThing}!` : 'It looks like a giant!'}`, emoji: '🌋' },
                { text: 'This was a volcano!\nA long time ago!\nNow it sleeps!', emoji: '⛰️' },
                { text: 'The peak is so high!\nClouds float below!\nSo amazing!', emoji: '☁️' },
                { text: 'I see the crater!\nLike a big bowl on top!\nNature is powerful!', emoji: '🏔️' },
                { text: 'This mountain is special!\nFormed by fire!\nSo cool!', emoji: '🔥' }
            ];
        } else if (env.isForest) {
            // Forest environment
            environmentStories = [
                { text: `${destination} has GIANT trees!\nThey are so tall!\n${specialThing !== 'something special' ? `I saw ${specialThing} too!` : 'I feel tiny here!'}`, emoji: '🌲' },
                { text: 'The forest smells so good!\nPine needles everywhere.\nFresh and clean!', emoji: '🌿' },
                { text: 'Birds sing in the trees!\nTWEET TWEET!\nI try to find them!', emoji: '🐦' },
                { text: 'Squirrels run up and down!\nThey gather acorns.\nSo busy and fast!', emoji: '🐿️' },
                { text: 'The trees make shade!\nIt is cool and peaceful.\nI love the forest!', emoji: '🌳' }
            ];
        } else if (env.isCoastal) {
            // Coastal environment
            environmentStories = [
                { text: `${destination} smells like salt!\nThe ocean is HUGE!\n${specialThing !== 'something special' ? `I can see ${specialThing}!` : 'Water everywhere!'}`, emoji: '🌊' },
                { text: 'Waves go SPLASH!\nThey tickle my toes!\nSo cold and fun!', emoji: '💦' },
                { text: 'I find seashells!\nPretty and shiny.\nThe ocean gave them to me!', emoji: '🐚' },
                { text: 'Seagulls fly overhead!\nCAW CAW CAW!\nThey look for food!', emoji: '🕊️' },
                { text: 'The sand is soft!\nI dig and dig.\nI make a big hole!', emoji: '🏖️' }
            ];
        } else if (env.isUrban) {
            // City/urban environment
            environmentStories = [
                { text: `${destination} has tall buildings!\nThey touch the sky!\n${specialThing !== 'something special' ? `I even saw ${specialThing}!` : 'Everything looks amazing!'}`, emoji: '🏢' },
                { text: 'Cars go BEEP BEEP!\nBuses go VROOM!\nSo many sounds!', emoji: '🚕' },
                { text: 'So many people!\nThey walk fast.\nEveryone is busy!', emoji: '👨‍👩‍👧‍👦' },
                { text: 'We eat yummy food!\nI try something new.\nIt is delicious!', emoji: '🍕' },
                { text: 'At night, lights turn on!\nThe city sparkles!\nSo pretty!', emoji: '✨' }
            ];
        } else if (env.isMountain && !env.isDesert) {
            // True mountain environment (not desert mountains)
            environmentStories = [
                { text: `${destination} has huge mountains!\nThey are SO tall!\n${specialThing !== 'something special' ? `I see ${specialThing}!` : 'They touch the clouds!'}`, emoji: '🏔️' },
                { text: 'Pine trees everywhere!\nThey smell so good!\nNature is amazing!', emoji: '🌲' },
                { text: 'Birds sing songs!\nTWEET TWEET!\nThe air is fresh!', emoji: '🐦' },
                { text: 'I find a stream!\nThe water is cold.\nSplish splash!', emoji: '💧' },
                { text: 'A deer says hello!\nIt looks at me.\nThen hops away!', emoji: '🦌' }
            ];
        } else {
            // Generic natural environment based on trip type
            const genericStories = {
                'theme-park': [
                    { text: `${destination} is SO fun!\nRides everywhere!\nI can't wait!`, emoji: '🎢' },
                    { text: 'Round and round!\nUp and down!\nWeee!', emoji: '🎠' },
                    { text: 'Cotton candy!\nSo pink and sweet!\nYum yum!', emoji: '🍭' },
                    { text: 'Music plays!\nI dance!\nBest day ever!', emoji: '🎵' },
                    { text: 'Characters wave!\nI wave back!\nSo exciting!', emoji: '🤡' }
                ],
                'road-trip': [
                    { text: `The drive to ${destination} is long.\nBut fun!\nI look out the window!`, emoji: '🪟' },
                    { text: 'Cows say MOO!\nTrucks say RUMBLE!\nSo much to see!', emoji: '🐄' },
                    { text: 'We stop for snacks!\nI pick my favorite!\nYummy!', emoji: '🍪' },
                    { text: 'We sing songs!\nLoud and silly!\nFamily time!', emoji: '🎶' },
                    { text: 'We made it!\nTime to explore!\nYay!', emoji: '🎉' }
                ]
            };
            // Use road-trip as default when no specific environment detected
            environmentStories = genericStories['road-trip'];
        }
        
        stories.push(...environmentStories);
        
        // Fun ending
        stories.push({ text: `Time to go home.\nBut I'll never forget ${destination}!\nWhat an adventure!`, emoji: '😊' });
        stories.push({ text: 'The End! ❤️\n(But maybe not forever...)', emoji: '🌟' });
        
        return `
            <div style="padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 2em;">📖 Story Time!</h2>
                    <p style="margin: 10px 0 0 0; font-size: 1.2em; opacity: 0.9;">A picture book about your ${destination} adventure</p>
                    <p style="margin: 10px 0 0 0; font-size: 0.9em; opacity: 0.8;">✨ Powered by real facts from Wikipedia & NPS</p>
                </div>
                
                ${stories.map(page => createStoryPage(page.text, page.emoji)).join('')}
                
                <div style="page-break-after: always; padding: 30px; background: #fff9e6; border: 3px dashed #ffd700; border-radius: 15px; margin-top: 20px;">
                    <h3 style="text-align: center; color: #f57c00; margin-bottom: 20px;">🎨 Your Turn to Draw!</h3>
                    <p style="text-align: center; font-size: 1.2em; margin-bottom: 20px;">Draw your favorite part of the story!</p>
                    <div style="height: 400px; background: white; border: 3px solid #ffd700; border-radius: 10px; margin: 20px;"></div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 10px; text-align: center;">
                    <p style="font-size: 1.1em;">🌟 Great job reading! You can read this story again and again! 🌟</p>
                    ${content.facts.length > 0 ? `<p style="font-size: 0.9em; margin-top: 10px; color: #666;">This story includes real facts about ${destination}!</p>` : ''}
                </div>
            </div>
        `;
    },
    
    // Ages 4-8 Reading Story Book
    async generateReadingStoryBook(destination) {
        // Fetch dynamic content first
        let content;
        try {
            content = await ContentFetcher.fetchDestinationContent(destination);
        } catch (error) {
            console.error('Error fetching content:', error);
            content = ContentFetcher.getFallbackContent(destination);
        }
        
        return `
            <div style="padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 2em;">📚 My ${destination} Reading Adventure</h2>
                    <p style="margin: 10px 0 0 0; font-size: 1.1em; opacity: 0.9;">A story book just for you!</p>
                    <p style="margin: 10px 0 0 0; font-size: 0.9em; opacity: 0.8;">✨ Featuring real facts from Wikipedia & NPS</p>
                </div>
                
                <div style="background: #fff9e6; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 5px solid #ffd700;">
                    <h3 style="margin: 0 0 15px 0; color: #f57c00;">📖 Choose Your Reading Level:</h3>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <button onclick="showDynamicStory('beginner', '${destination}', ${JSON.stringify(content).replace(/"/g, '&quot;')})" style="padding: 15px 25px; background: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">🌱 Beginner Reader</button>
                        <button onclick="showDynamicStory('intermediate', '${destination}', ${JSON.stringify(content).replace(/"/g, '&quot;')})" style="padding: 15px 25px; background: #2196f3; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">📗 Intermediate Reader</button>
                        <button onclick="showDynamicStory('advanced', '${destination}', ${JSON.stringify(content).replace(/"/g, '&quot;')})" style="padding: 15px 25px; background: #9c27b0; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">🌟 Advanced Reader</button>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
                        <p style="margin: 0; font-size: 0.95em; color: #666;"><strong>Tip:</strong></p>
                        <p style="margin: 5px 0; font-size: 0.9em;">• <strong>Beginner:</strong> Short sentences, simple words (Ages 4-5)</p>
                        <p style="margin: 5px 0; font-size: 0.9em;">• <strong>Intermediate:</strong> Longer sentences, more vocabulary (Ages 6-7)</p>
                        <p style="margin: 5px 0; font-size: 0.9em;">• <strong>Advanced:</strong> Chapter-style, descriptive (Ages 7-8)</p>
                    </div>
                </div>
                
                <div id="storyContent" style="min-height: 200px;"></div>
            </div>
            
            <script>
            function showDynamicStory(level, destination, content) {
                const stories = {
                    beginner: generateBeginnerDynamicStory(destination, content),
                    intermediate: generateIntermediateDynamicStory(destination, content),
                    advanced: generateAdvancedDynamicStory(destination, content)
                };
                document.getElementById('storyContent').innerHTML = stories[level];
                document.getElementById('storyContent').scrollIntoView({ behavior: 'smooth' });
            }
            
            function generateBeginnerDynamicStory(dest, content) {
                // Extract location-specific details in kid-friendly way
                const specialPlace = content.landmarks && content.landmarks.length > 0 
                    ? content.landmarks[0].split(' - ')[0].substring(0, 30) 
                    : 'something amazing';
                
                const funActivity = content.activities && content.activities.length > 0 
                    ? content.activities[0].toLowerCase() 
                    : 'exploring';
                
                // Analyze actual environment
                const env = ContentFetcher.analyzeEnvironment(content);
                console.log('[BeginnerStory] Environment:', env.characteristics);
                
                // Fun story skeleton with contextually appropriate details
                const chapters = [
                    { ch: 1, title: 'We Go!', text: 'Today we go to ' + dest + '.\\nI am so happy!\\nMom packs my bag.\\nDad gets the car.', emoji: '🚗' },
                    { ch: 2, title: 'We Are Here!', text: 'We are in ' + dest + '!\\nWow! Look at everything!\\nThis is so cool!', emoji: '🏢' },
                ];
                
                // Generate contextually appropriate chapters based on ACTUAL environment
                let envChapters = [];
                
                if (env.isThemePark) {
                    envChapters = [
                        { ch: 3, title: 'So Fun!', text: 'Rides everywhere!\\n' + (specialPlace.length < 25 ? specialPlace + '!\\n' : '') + 'I can\\'t wait!', emoji: '🎢' },
                        { ch: 4, title: 'Wheee!', text: 'Round and round!\\nUp and down!\\nSo much fun!', emoji: '🎠' },
                        { ch: 5, title: 'Yummy!', text: 'Cotton candy!\\nIce cream!\\nSo sweet!', emoji: '🍭' }
                    ];
                } else if (env.isDesert) {
                    envChapters = [
                        { ch: 3, title: 'So Hot!', text: 'The sun is very hot!\\nThe land is dry.\\n' + (specialPlace.length < 25 ? 'I see ' + specialPlace + '!' : 'Sand and rocks!'), emoji: '🏜️' },
                        { ch: 4, title: 'Wide Open!', text: 'The desert is so big!\\nI can see far away.\\nNo trees here.\\nJust open space!', emoji: '☀️' },
                        { ch: 5, title: 'Desert Life!', text: 'A lizard runs fast!\\nAnimals like it hot.\\nSo cool to see!', emoji: '🦎' }
                    ];
                } else if (env.isGeothermal) {
                    envChapters = [
                        { ch: 3, title: 'Steam!', text: 'Steam comes up!\\nFrom the ground!\\n' + (specialPlace.length < 25 ? specialPlace + ' is here!' : 'So magical!'), emoji: '💨' },
                        { ch: 4, title: 'Hot Water!', text: 'I see hot springs!\\nThey bubble and steam.\\nDon\\'t touch! Too hot!', emoji: '♨️' },
                        { ch: 5, title: 'Colors!', text: 'The rocks are yellow!\\nAnd orange too!\\nSo pretty!', emoji: '🌋' }
                    ];
                } else if (env.isGlacial) {
                    envChapters = [
                        { ch: 3, title: 'Snow!', text: 'Everything is white!\\nSnow and ice!\\n' + (specialPlace.length < 25 ? specialPlace + ' is big!' : 'So sparkly!'), emoji: '🏔️' },
                        { ch: 4, title: 'Cold!', text: 'Brrr! So cold!\\nI wear my warm coat!\\nMy breath makes clouds!', emoji: '❄️' },
                        { ch: 5, title: 'Glaciers!', text: 'Huge ice rivers!\\nThey move slow!\\nSo pretty and blue!', emoji: '🧊' }
                    ];
                } else if (env.isVolcanic) {
                    envChapters = [
                        { ch: 3, title: 'Big Mountain!', text: 'The mountain is huge!\\n' + (specialPlace.length < 25 ? specialPlace + '!\\n' : '') + 'It was a volcano!', emoji: '🌋' },
                        { ch: 4, title: 'So Tall!', text: 'The peak is in the clouds!\\nI look up and up!\\nSo high!', emoji: '⛰️' },
                        { ch: 5, title: 'Special!', text: 'This mountain is special!\\nMade by fire!\\nNow it sleeps!', emoji: '🔥' }
                    ];
                } else if (env.isForest) {
                    envChapters = [
                        { ch: 3, title: 'Big Trees!', text: 'The trees are huge!\\nSo tall!\\n' + (specialPlace.length < 25 ? 'I see ' + specialPlace + '!' : 'I feel tiny!'), emoji: '🌲' },
                        { ch: 4, title: 'Forest Sounds!', text: 'Birds sing!\\nTweet! Tweet!\\nThe forest is alive!', emoji: '🐦' },
                        { ch: 5, title: 'Nature!', text: 'Squirrels run!\\nUp and down trees!\\nSo fast!', emoji: '🐿️' }
                    ];
                } else if (env.isCoastal) {
                    envChapters = [
                        { ch: 3, title: 'Water!', text: 'The ocean is so blue!\\nSplash! Splash!\\n' + (specialPlace.length < 25 ? specialPlace + ' is there!' : 'Waves are big!'), emoji: '🌊' },
                        { ch: 4, title: 'Beach Fun!', text: 'I build in the sand!\\nTowers and walls!\\nSo fun!', emoji: '🏰' },
                        { ch: 5, title: 'Shells!', text: 'I find pretty shells!\\nThe ocean gave them!\\nIn my bucket!', emoji: '🐚' }
                    ];
                } else if (env.isUrban) {
                    envChapters = [
                        { ch: 3, title: specialPlace.length < 20 ? 'I See It!' : 'Amazing!', text: 'Look! ' + specialPlace + '!\\nIt is so big!\\nI want to see more!', emoji: '🏛️' },
                        { ch: 4, title: 'So Busy!', text: 'I see many cars.\\nBeep! Beep!\\nSo many people!', emoji: '🚕' },
                        { ch: 5, title: 'Yummy!', text: 'We eat lunch.\\nThe food is yummy!\\nI try something new!', emoji: '🍕' }
                    ];
                } else {
                    // Mountain or general nature
                    envChapters = [
                        { ch: 3, title: 'Nature!', text: (specialPlace.length < 25 ? specialPlace + '!\\n' : '') + 'This place is special!\\nTrees and rocks!\\nSo pretty!', emoji: '🏔️' },
                        { ch: 4, title: 'Fresh Air!', text: 'The air smells good.\\nI take deep breaths.\\nSo fresh!', emoji: '🌲' },
                        { ch: 5, title: 'Wildlife!', text: 'I see animals!\\nThey live here.\\nSo cool!', emoji: '🦌' }
                    ];
                }
                
                chapters.push(...envChapters);
                
                // Fun activity ending
                chapters.push({ 
                    ch: 6, title: 'More Fun!', 
                    text: 'We try ' + funActivity + '!\\nI love it so much!\\nThis is the best!', 
                    emoji: '🎉' 
                });
                
                chapters.push({ ch: 7, title: 'Best Day', text: 'I love ' + dest + '!\\nI am happy.\\nI want to come back!\\nThe End!', emoji: '😊' });
                
                return chapters.map(page => \`
                    <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #4caf50; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #4caf50; color: white; padding: 10px 20px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong>Chapter \${page.ch}: \${page.title}</strong>
                        </div>
                        <div style="font-size: 100px; text-align: center; margin: 20px 0;">\${page.emoji}</div>
                        <p style="font-size: 1.6em; line-height: 2; text-align: center; color: #333; white-space: pre-line;">\${page.text}</p>
                    </div>
                \`).join('') + '<div style="margin-top: 30px; padding: 25px; background: #e8f5e9; border-radius:10px; text-align: center;"><p style="font-size: 1.3em; margin: 0;">🌟 You did it! You read the whole book about ' + dest + '! 🌟</p></div>';
            }
            
            function generateIntermediateDynamicStory(dest, content) {
                // Extract details for the narrative
                const specialPlace = content.landmarks && content.landmarks.length > 0 
                    ? content.landmarks[0].split(' - ')[0] 
                    : null;
                
                const interestingFact = content.facts && content.facts.length > 0 
                    ? ContentFetcher.moderateText(content.facts[0])
                    : null;
                
                const activity = content.activities && content.activities.length > 0 
                    ? content.activities[0].toLowerCase() 
                    : 'exploring';
                
                // Analyze actual environment
                const env = ContentFetcher.analyzeEnvironment(content);
                console.log('[IntermediateStory] Environment:', env.characteristics);
                
                // Character-driven story with contextually appropriate adventures
                const chapters = [];
                
                // Story arc with protagonist
                chapters.push({ 
                    ch: 1, title: 'The Journey Begins', 
                    text: 'Emma packed her backpack with excitement. Today she was going to ' + dest + '! She had been dreaming about this trip for weeks. "Are you ready for an adventure?" her dad asked with a smile. Emma nodded eagerly. She couldn\\'t wait!', 
                    emoji: '🎒' 
                });
                
                chapters.push({ 
                    ch: 2, title: 'First Impressions', 
                    text: 'When Emma arrived at ' + dest + ', her eyes went wide. Everything was so different from home! ' + (interestingFact || 'The place was full of wonders to discover.') + ' "Wow!" Emma whispered, trying to take it all in.',
                    emoji: '😮' 
                });
                
                // Contextually appropriate adventures based on actual environment
                if (env.isThemePark) {
                    chapters.push({ 
                        ch: 3, title: 'Welcome to the Park', 
                        text: 'Emma walked through the gates of ' + dest + '. Music played and colorful attractions surrounded her. ' + (specialPlace ? 'She spotted ' + specialPlace + ' and knew she had to try it!' : 'Rides, shows, and games stretched as far as she could see.') + ' This was going to be the best day ever!',
                        emoji: '🎢' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Thrill and Wonder', 
                        text: 'Emma rode roller coasters that made her stomach flip. She watched incredible shows with amazing performers. Everywhere she looked, there was something new and exciting. ' + (activity !== 'exploring' ? 'She especially loved ' + activity + '!' : 'Each attraction was more fun than the last!') + ' Her face hurt from smiling so much.',
                        emoji: '🎠' 
                    });
                } else if (env.isDesert) {
                    chapters.push({ 
                        ch: 3, title: 'Desert Discovery', 
                        text: 'Emma stepped out into the desert heat. The dry, vast landscape stretched endlessly. ' + (specialPlace ? 'In the distance, she could see ' + specialPlace + ', surrounded by nothing but sand and rock.' : 'Red rock formations and sandy valleys created an otherworldly scene.') + ' She had never seen anything like this!',
                        emoji: '🏜️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Extreme Conditions', 
                        text: 'The sun beat down intensely. Emma learned that deserts get very hot during the day but cold at night. She saw how plants and animals adapted to survive with almost no water. A quick lizard darted across the hot sand. Nature was tough here!',
                        emoji: '🦎' 
                    });
                } else if (env.isGeothermal) {
                    chapters.push({ 
                        ch: 3, title: 'Geothermal Wonders', 
                        text: 'Emma couldn\\'t believe her eyes. Steam rose from vents in the ground! ' + (specialPlace ? specialPlace + ' erupted with a loud whoosh, sending hot water high into the air.' : 'Hot springs bubbled with colorful minerals.') + ' The earth was alive beneath her feet!',
                        emoji: '💨' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Earth\\'s Power', 
                        text: 'A ranger explained how ' + dest + ' sits on top of volcanic activity. The colorful rocks were created by minerals and heat. Emma learned about geysers, hot springs, and fumaroles. She felt like she was standing on a different planet!',
                        emoji: '🌋' 
                    });
                } else if (env.isGlacial) {
                    chapters.push({ 
                        ch: 3, title: 'Frozen Majesty', 
                        text: 'Emma gazed up at the snow-covered peak. ' + (specialPlace ? specialPlace + ' rose before her, a massive mountain draped in glaciers and snow.' : 'The mountain towered above, its white slopes gleaming in the sunlight.') + ' She\\'d never seen anything so magnificent!',
                        emoji: '🏔️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Rivers of Ice', 
                        text: 'A guide explained how ' + dest + '\\'s glaciers formed over thousands of years. Emma learned about ice fields, crevasses, and how glaciers slowly carve valleys. The air was crisp and cold. ' + (activity !== 'exploring' ? 'They went ' + activity + ' to see more of the mountain.' : 'Every view took her breath away!') + '',
                        emoji: '❄️' 
                    });
                } else if (env.isVolcanic) {
                    chapters.push({ 
                        ch: 3, title: 'Volcanic Giant', 
                        text: 'Emma stood at the base of the massive volcanic mountain. ' + (specialPlace ? specialPlace + ' towered above, its peak reaching into the clouds.' : 'The volcanic peak dominated the landscape.') + ' This mountain was born from fire millions of years ago!',
                        emoji: '🌋' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Mountain Majesty', 
                        text: 'A ranger told Emma how ' + dest + ' formed through volcanic eruptions. The mountain\\'s crater was still visible at the summit. Though the volcano sleeps now, it shaped everything around it. Emma learned about lava flows, craters, and volcanic rock. Nature\\'s power was incredible!',
                        emoji: '⛰️' 
                    });
                } else if (env.isForest) {
                    chapters.push({ 
                        ch: 3, title: 'Into the Forest', 
                        text: 'Emma entered the forest, surrounded by massive trees. ' + (specialPlace ? specialPlace + ' towered above, making her feel tiny.' : 'The forest canopy blocked out the sun.') + ' The air smelled fresh and piney. Birds sang overhead. This was magical!',
                        emoji: '🌲' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Forest Life', 
                        text: 'Emma spotted squirrels gathering acorns and birds flitting between branches. She learned how the forest ecosystem works - trees providing homes, decomposing leaves feeding the soil. Everything was connected. Nature was amazing!',
                        emoji: '🐿️' 
                    });
                } else if (env.isCoastal) {
                    chapters.push({ 
                        ch: 3, title: 'Ocean Adventures', 
                        text: 'Emma ran to the water\\'s edge. The waves splashed her toes - cold at first, but refreshing! ' + (specialPlace ? 'In the distance, she could see ' + specialPlace + ', which made the beach even more special.' : 'The endless blue ocean stretched to the horizon.') + ' She couldn\\'t believe she was really here!',
                        emoji: '🌊' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Treasure Hunt', 
                        text: 'Emma searched the shoreline for shells and sea glass. Each find felt like discovering treasure! She found a perfect sand dollar and couldn\\'t stop smiling. An older boy showed her the best spots to search. "The beach at ' + dest + ' has the coolest shells," he said proudly.',
                        emoji: '🐚' 
                    });
                } else if (env.isUrban) {
                    chapters.push({ 
                        ch: 3, title: 'City Exploration', 
                        text: specialPlace 
                            ? 'As Emma walked through the city, she saw ' + specialPlace + '. It was even more amazing in person! She took out her camera to capture the moment. A friendly local told her fun facts about it, and Emma listened eagerly.'
                            : 'As Emma explored the busy streets, she discovered hidden gems around every corner. The tall buildings, the bustling crowds, and the energy of the city made her feel alive. This was the adventure she had been waiting for!',
                        emoji: '🏛️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'A New Friend', 
                        text: 'At a park, Emma met a girl named Maya who lived in ' + dest + '. "Want to feed the birds?" Maya asked. Soon they were laughing and chatting like old friends. Maya showed Emma her favorite secret spots. ' + dest + ' felt less overwhelming with a friend by her side.',
                        emoji: '👭' 
                    });
                } else {
                    // Mountain or general nature
                    chapters.push({ 
                        ch: 3, title: 'Natural Beauty', 
                        text: specialPlace 
                            ? 'Emma hiked along the trail, breathing in the fresh air. When she reached a clearing, she gasped. There it was - ' + specialPlace + '! Even better than the pictures. She felt like she was on top of the world.'
                            : 'Emma explored ' + dest + ', taking in all the natural beauty. Mountains, valleys, and wide open spaces surrounded her. The fresh air and peaceful quiet made her feel connected to nature.',
                        emoji: '🏔️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Wildlife Encounter', 
                        text: 'Emma sat quietly to rest. Suddenly, wildlife appeared! ' + (env.hasWildlife ? 'She watched in amazement as animals went about their day in their natural habitat.' : 'Birds flew overhead and small creatures rustled in the bushes.') + ' Emma\\'s heart pounded with excitement. ' + dest + ' was full of surprises.',
                        emoji: '🦌' 
                    });
                }
                
                // Activity chapter
                chapters.push({ 
                    ch: 5, title: 'Trying Something New', 
                    text: 'Emma decided to be brave and try ' + activity + '. At first she was nervous, but her family encouraged her. "You can do it!" they cheered. Emma took a deep breath and gave it a try. It turned out to be her favorite part of the whole trip!',
                    emoji: '🎉' 
                });
                
                // Reflection ending
                chapters.push({ 
                    ch: 6, title: 'Memories Made', 
                    text: 'On the last evening, Emma looked at her photos and smiled. She had explored ' + dest + ', made new friends, and tried new things. She felt different somehow - braver and more curious about the world. "Can we come back next year?" she asked hopefully.',
                    emoji: '📸' 
                });
                
                chapters.push({ 
                    ch: 7, title: 'Going Home', 
                    text: 'As Emma packed her bag to leave, she took one last look around. ' + dest + ' would always be special to her now. She couldn\\'t wait to tell her friends about her adventure. But she also knew - this was just the beginning. The world was full of amazing places to explore. The End.',
                    emoji: '🏡' 
                });
                
                return chapters.map(page => \`
                    <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #2196f3; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #2196f3; color: white; padding: 12px 24px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong style="font-size: 1.2em;">Chapter \${page.ch}: \${page.title}</strong>
                        </div>
                        <div style="font-size: 80px; text-align: center; margin: 20px 0;">\${page.emoji}</div>
                        <p style="font-size: 1.3em; line-height: 1.8; color: #333; text-align: justify; text-indent: 30px;">\${page.text}</p>
                    </div>
                \`).join('') + '<div style="margin-top: 30px; padding: 25px; background: #e3f2fd; border-radius: 10px; text-align: center;"><p style="font-size: 1.3em; margin: 0;">📚 Excellent reading! You finished Emma\\'s adventure in ' + dest + '! 📚</p></div>';
            }
            
            function generateAdvancedDynamicStory(dest, content) {
                // Extract rich details for advanced narrative
                const specialPlace = content.landmarks && content.landmarks.length > 0 
                    ? content.landmarks[0].split(' - ')[0] 
                    : null;
                
                const historicalDetail = content.history && content.history.length > 0 
                    ? content.history[0]
                    : null;
                
                const naturalFeature = content.nature && content.nature.length > 0 
                    ? content.nature[0] 
                    : null;
                
                const activity = content.activities && content.activities.length > 0 
                    ? content.activities[0].toLowerCase() 
                    : 'exploring';
                
                // Analyze actual environment
                const env = ContentFetcher.analyzeEnvironment(content);
                console.log('[AdvancedStory] Environment:', env.characteristics);
                
                // Rich, character-driven narrative with contextually appropriate adventures
                const chapters = [];
                
                chapters.push({ 
                    ch: 1, title: 'An Unexpected Journey', 
                    text: 'Sophia had always loved reading about faraway places, but she\\'d never imagined she would actually visit ' + dest + '. When her parents surprised her with the trip, she could hardly believe it. That night, she researched everything she could find. The more she learned, the more excited she became. This wasn\\'t just a vacation - it was going to be an adventure.',
                    emoji: '🌟' 
                });
                
                chapters.push({ 
                    ch: 2, title: 'First Impressions', 
                    text: 'The moment Sophia arrived at ' + dest + ', she felt both overwhelmed and thrilled. ' + (historicalDetail || 'The place had a character and presence that was impossible to ignore.') + ' Walking through, Sophia tried to imagine all the stories this place could tell.',
                    emoji: '🎭' 
                });
                
                // Generate contextually rich narrative based on actual environment
                if (env.isThemePark) {
                    chapters.push({ 
                        ch: 3, title: 'Entering the Magic', 
                        text: 'Sophia walked through the entrance of ' + dest + ', and suddenly she wasn\\'t just a visitor - she was part of something magical. ' + (specialPlace ? 'The iconic ' + specialPlace + ' rose before her, a symbol of imagination brought to life.' : 'Carefully designed attractions created immersive worlds.') + ' Every detail, from the music to the architecture, was intentional. She appreciated the artistry and engineering that made wonder possible.',
                        emoji: '✨' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'More Than Entertainment', 
                        text: 'As Sophia explored ' + dest + ', she noticed how it brought people together. Families laughed on rides, children\\'s faces lit up meeting characters, and everyone - regardless of age or background - shared in the joy. ' + (activity !== 'exploring' ? 'She particularly enjoyed ' + activity + ', marveling at the technology and creativity involved.' : 'She saw how imagination and engineering combined to create shared happiness.') + ' This place was about more than thrills - it was about creating memories.',
                        emoji: '🎢' 
                    });
                } else if (env.isDesert) {
                    chapters.push({ 
                        ch: 3, title: 'Desert Majesty', 
                        text: 'Sophia stood at the edge of the vast desert landscape. ' + (specialPlace ? specialPlace + ' stretched before her, a testament to millions of years of geological forces.' : 'The dry, expansive terrain was unlike anything she\\'d seen.') + ' The intense heat, the barren beauty, the sense of being below sea level in some areas - it all created an otherworldly feeling. This harsh environment demanded respect and inspired awe.',
                        emoji: '🏜️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Lessons in Extremes', 
                        text: 'A ranger explained how ' + dest + ' represented one of Earth\\'s most extreme environments. Life here adapted in remarkable ways - plants with deep roots, animals nocturnal to avoid heat, minerals creating vivid colors in the rocks. Sophia learned about elevation, temperature extremes, and the delicate balance of desert ecosystems. The harshness made the beauty even more profound.',
                        emoji: '🌡️' 
                    });
                } else if (env.isGeothermal) {
                    chapters.push({ 
                        ch: 3, title: 'Earth\\'s Power Revealed', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia watched in amazement as ' + (specialPlace ? specialPlace : 'geysers and hot springs') + ' demonstrated the raw power beneath Earth\\'s surface. Steam rose from countless vents, hot water bubbled with minerals creating rainbow colors, and the smell of sulfur hung in the air. She was witnessing geology in action.',
                        emoji: '💨' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'A Living Laboratory', 
                        text: 'A geologist explained the unique geothermal features of ' + dest + '. Sophia learned about magma chambers, thermal activity, and how these conditions created an ecosystem found nowhere else on Earth. Thermophilic bacteria thrived in boiling water, creating otherworldly colors. Science came alive before her eyes.',
                        emoji: '🔬' 
                    });
                } else if (env.isGlacial) {
                    chapters.push({ 
                        ch: 3, title: 'Rivers of Ancient Ice', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia stood before the magnificent glaciers of ' + dest + '. ' + (specialPlace ? specialPlace + ' rose dramatically, its slopes covered in permanent snow and ice fields.' : 'The mountain\\'s glaciers gleamed with an otherworldly blue light.') + ' These frozen rivers had been carving the landscape for millennia, creating valleys and shaping peaks.',
                        emoji: '🏔️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Climate Written in Ice', 
                        text: 'A glaciologist explained how ' + dest + '\\'s glaciers were archives of climate history. Sophia learned about ice cores, crevasses, glacial retreat, and how these massive ice formations influenced weather patterns for hundreds of miles. ' + (activity !== 'exploring' ? 'They went ' + activity + ', observing the dramatic landscape shaped by ice.' : 'Standing in the presence of such ancient forces was humbling.') + ' She understood that glaciers were both beautiful and fragile.',
                        emoji: '❄️' 
                    });
                } else if (env.isVolcanic) {
                    chapters.push({ 
                        ch: 3, title: 'Born of Fire', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia gazed up at the volcanic peak of ' + dest + '. ' + (specialPlace ? specialPlace + ' stood as a testament to Earth\\'s fiery origins.' : 'The massive stratovolcano dominated the skyline.') + ' Though it appeared peaceful now, this mountain was built by countless eruptions over millions of years. The crater at its summit told stories of its volcanic past.',
                        emoji: '🌋' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Volcanic Legacy', 
                        text: 'A volcanologist shared the history of ' + dest + '. Sophia learned about magma formation, eruption patterns, volcanic rock types, and how volcanoes create fertile soil. ' + (activity !== 'exploring' ? 'During ' + activity + ', she observed volcanic features firsthand.' : 'Every rock, every slope told part of the mountain\\'s fiery story.') + ' She understood that volcanoes, while potentially dangerous, were also creators - building mountains, enriching soil, and shaping entire regions.',
                        emoji: '⛰️' 
                    });
                } else if (env.isForest) {
                    chapters.push({ 
                        ch: 3, title: 'Cathedral of Trees', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia entered the ancient forest, where ' + (specialPlace ? specialPlace + ' stood as monuments to time itself.' : 'massive trees created a living cathedral.') + ' The canopy filtered sunlight into green-gold beams. The smell of pine and earth filled her lungs. She felt small in the best possible way - part of something vast and timeless.',
                        emoji: '🌲' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Ecosystem Connections', 
                        text: 'A naturalist helped Sophia understand the complex web of life in ' + dest + '. From mycorrhizal fungi connecting tree roots underground to woodpeckers creating homes for dozens of other species, everything was interconnected. The forest wasn\\'t just a collection of trees - it was a community thriving through cooperation.',
                        emoji: '🌿' 
                    });
                } else if (env.isCoastal) {
                    chapters.push({ 
                        ch: 3, title: 'Where Worlds Meet', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia walked along the shore where ' + (specialPlace ? specialPlace + ' met the endless ocean.' : 'land and sea created their own unique world.') + ' The intertidal zone fascinated her - a place that was sometimes underwater, sometimes exposed, home to creatures that adapted to constant change. The rhythm of waves was hypnotic.',
                        emoji: '🌊' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Tides of Understanding', 
                        text: 'A marine biologist showed Sophia tide pools teeming with life. She learned about ocean currents, coastal erosion, and how beaches like ' + dest + ' were crucial to both marine ecosystems and human communities. Each wave carried stories from across the ocean. She felt connected to the vastness of Earth\\'s waters.',
                        emoji: '🐚' 
                    });
                } else if (env.isUrban) {
                    chapters.push({ 
                        ch: 3, title: 'Urban Tapestry', 
                        text: specialPlace 
                            ? 'Sophia\\'s breath caught when she first saw ' + specialPlace + '. Standing before it, she understood why it drew millions of visitors. But beyond the famous landmark, she discovered the real city - vibrant neighborhoods, hidden courtyards, street art telling stories. ' + dest + ' was layers upon layers of human creativity and resilience.'
                            : 'Walking through ' + dest + ', Sophia felt the energy of urban life. The architecture told stories of different eras. Street vendors offered flavors from around the world. Every block revealed something new. The city was a living museum of human achievement.',
                        emoji: '🏛️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Cultural Crossroads', 
                        text: (historicalDetail ? historicalDetail + ' ' : '') + 'Sophia discovered that ' + dest + ' was more than just a city - it was a crossroads where cultures, ideas, and people converged. She visited markets where languages blended, ate food that fused traditions, and met people whose families had shaped the city\\'s identity. Every street corner had a story.',
                        emoji: '🌆' 
                    });
                } else {
                    // Mountain or general nature - but contextually aware
                    chapters.push({ 
                        ch: 3, title: 'Natural Grandeur', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia hiked through ' + dest + ', taking in the landscape\\'s raw beauty. ' + (specialPlace ? specialPlace + ' rose majestically, shaped by countless forces over millennia.' : 'The terrain told a story of geological time - uplift, erosion, and the slow dance of tectonic plates.') + ' Standing there, she felt the weight of deep time.',
                        emoji: '🏔️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Reading the Landscape', 
                        text: 'A geologist helped Sophia \\"read\\" the landscape like a book. Rock layers revealed ancient seas and volcanic activity. ' + (env.hasWildlife ? 'Wildlife tracks showed the presence of bears, deer, and countless other creatures thriving in this habitat.' : 'The patterns of erosion told stories of ice ages and floods.') + ' ' + dest + ' wasn\\'t just scenery - it was Earth\\'s autobiography.',
                        emoji: '📖' 
                    });
                }
                
                chapters.push({ 
                    ch: 5, title: 'Personal Challenge', 
                    text: 'Sophia decided to try ' + activity + ', something that initially intimidated her. As she began, doubt crept in, but she pushed through. With each small success, her confidence grew. When she finished, she realized the real accomplishment wasn\\'t the activity itself - it was discovering that she was capable of more than she\\'d believed. ' + dest + ' had shown her something about herself.',
                    emoji: '💪' 
                });
                
                chapters.push({ 
                    ch: 6, title: 'Connections Beyond Words', 
                    text: 'That evening, Sophia shared stories with other travelers - families from different countries, solo adventurers, elderly couples on lifelong journeys. Despite their different languages and backgrounds, they all understood the transformative power of exploration. ' + dest + ' had given them each something unique, yet they all shared a sense of wonder. Travel, Sophia realized, was humanity\\'s universal language.',
                    emoji: '🌍' 
                });
                
                chapters.push({ 
                    ch: 7, title: 'Transformed', 
                    text: 'As Sophia prepared to leave ' + dest + ', she reflected on how profoundly the experience had changed her. She\\'d been challenged, inspired, and transformed. The place itself was extraordinary - ' + (env.characteristics.length > 0 ? 'its ' + env.characteristics.join(', ') + ' character' : 'its unique character') + ' creating memories she\\'d carry forever. But the real journey had been internal. She\\'d discovered courage, curiosity, and a deep appreciation for Earth\\'s diversity. ' + dest + ' wasn\\'t just a destination anymore - it was part of who she was. The End - but truly, just the beginning.',
                    emoji: '✨' 
                });
                
                return chapters.map(page => \`
                    <div style="page-break-after: always; padding: 35px; background: white; border: 3px solid #9c27b0; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #9c27b0; color: white; padding: 14px 28px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong style="font-size: 1.3em;">Chapter \${page.ch}</strong>
                        </div>
                        <h3 style="color: #9c27b0; margin: 15px 0; font-size: 1.6em;">\${page.title}</h3>
                        <div style="font-size: 60px; text-align: center; margin: 20px 0;">\${page.emoji}</div>
                        <p style="font-size: 1.2em; line-height: 1.9; color: #333; text-align: justify; text-indent: 40px;">\${page.text}</p>
                    </div>
                \`).join('') + '<div style="margin-top: 30px; padding: 25px; background: #f3e5f5; border-radius: 10px; text-align: center;"><h3 style="color: #9c27b0; margin: 0 0 10px 0;">🎉 Congratulations! 🎉</h3><p style="font-size: 1.2em; margin: 0;">You completed Sophia\\'s transformative journey to ' + dest + '! You\\'re an amazing reader!</p></div>';
            }
                
                const historicalDetail = content.history && content.history.length > 0 
                    ? content.history[0]
                    : null;
                
                const naturalFeature = content.nature && content.nature.length > 0 
                    ? content.nature[0] 
                    : null;
                
                const activity = content.activities && content.activities.length > 0 
                    ? content.activities[0].toLowerCase() 
                    : 'exploring';
                
                // Rich, character-driven narrative with location details naturally integrated
                const chapters = [];
                
                chapters.push({ 
                    ch: 1, title: 'An Unexpected Journey', 
                    text: 'Sophia had always loved reading about faraway places, but she\\'d never imagined she would actually visit ' + dest + '. When her parents surprised her with the trip, she could hardly believe it. That night, she researched everything she could find. The more she learned, the more excited she became. This wasn\\'t just a vacation - it was going to be an adventure.',
                    emoji: '🌟' 
                });
                
                chapters.push({ 
                    ch: 2, title: 'First Impressions', 
                    text: 'The moment Sophia arrived at ' + dest + ', she felt both overwhelmed and thrilled. ' + (historicalDetail || 'The place had a rich history that seemed to echo in every corner.') + ' Walking through, Sophia tried to imagine all the people who had been here before her. This place had stories to tell.',
                    emoji: '🎭' 
                });
                
                // Trip-type specific deep narrative
                if (type === 'city') {
                    chapters.push({ 
                        ch: 3, title: 'The Heart of the City', 
                        text: specialPlace 
                            ? 'Sophia\\'s breath caught when she first saw ' + specialPlace + '. Standing before it, she understood why people traveled from all over the world to see it. She sat on a nearby bench, sketching it in her journal, trying to capture not just how it looked, but how it made her feel - small yet connected to something greater.'
                            : 'Walking through the heart of ' + dest + ', Sophia felt the pulse of the city. Each street had its own personality. She discovered hidden cafes, street musicians, and local artisans. This wasn\\'t the ' + dest + ' she\\'d seen in guidebooks - this was the real, living city.',
                        emoji: '🏛️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'A Chance Encounter', 
                        text: 'In a small bookshop, Sophia met an elderly woman who had lived in ' + dest + ' her whole life. They talked for over an hour about the city\\'s secrets, its changes, and its timeless beauty. The woman shared stories her grandmother had told her. Sophia realized that places aren\\'t just buildings and streets - they\\'re the people and their memories too.',
                        emoji: '📚' 
                    });
                } else if (type === 'beach') {
                    chapters.push({ 
                        ch: 3, title: 'The Call of the Ocean', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia walked along the shore of ' + dest + ' beach, her footprints disappearing behind her with each wave. ' + (specialPlace ? 'She could see ' + specialPlace + ' in the distance, a testament to nature\\'s power and beauty.' : 'The rhythmic sound of waves created a peaceful soundtrack.') + ' Here, she could think clearly.',
                        emoji: '🌊' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Lessons from the Tide', 
                        text: 'Sophia joined a marine biology student collecting samples at the tide pools. She learned about the delicate ecosystem that thrived where land met sea. Each tiny creature had a purpose. As they worked, the student explained how beaches like ' + dest + ' were important for both wildlife and for understanding our planet. Sophia felt honored to witness it.',
                        emoji: '🐚' 
                    });
                } else if (type === 'mountains') {
                    chapters.push({ 
                        ch: 3, title: 'Above the Clouds', 
                        text: (naturalFeature ? naturalFeature + ' ' : '') + 'Sophia climbed steadily up the mountain trail at ' + dest + '. ' + (specialPlace ? 'Her goal was to reach ' + specialPlace + ', something she\\'d dreamed about for months.' : 'Each step brought her higher, the air growing thinner and crisper.') + ' When she finally reached the summit, the view took her breath away. The world stretched endlessly below.',
                        emoji: '⛰️' 
                    });
                    chapters.push({ 
                        ch: 4, title: 'Wilderness Wisdom', 
                        text: 'A park ranger explained the geology and ecology of ' + dest + '. Sophia learned how these mountains formed over millions of years, how the ecosystem adapted to harsh conditions, and why protecting these wild places mattered. She felt humbled by nature\\'s patience and power. Some things were bigger than any one person.',
                        emoji: '🌲' 
                    });
                }
                
                chapters.push({ 
                    ch: 5, title: 'Stepping Outside Comfort', 
                    text: 'Sophia decided to try ' + activity + ', something that scared her a little. Her hands trembled as she began, but she refused to give up. Slowly, her confidence grew. When she finished, she felt triumphant - not because it was easy, but because she\\'d pushed past her fears. ' + dest + ' was teaching her that growth happens outside your comfort zone.',
                    emoji: '💪' 
                });
                
                chapters.push({ 
                    ch: 6, title: 'Connections Across Cultures', 
                    text: 'That evening, Sophia shared a meal with travelers from three different countries. Despite speaking different languages and coming from different backgrounds, they found common ground in their love of exploration. They exchanged stories and contact information. Sophia realized that travel didn\\'t just show you new places - it helped you see humanity\\'s shared hopes and dreams.',
                    emoji: '🌍' 
                });
                
                chapters.push({ 
                    ch: 7, title: 'Transformed', 
                    text: 'As Sophia prepared to leave ' + dest + ', she reflected on how much she\\'d changed in just a few days. She\\'d been challenged, inspired, and transformed. The places she\\'d seen were incredible, but the real journey had been internal. She\\'d discovered courage she didn\\'t know she had and learned that the world was both vast and intimate. ' + dest + ' would always hold a special place in her heart, not just as a destination, but as the place where she truly found herself. The End - but really, just the beginning.',
                    emoji: '✨' 
                });
                
                return chapters.map(page => \`
                    <div style="page-break-after: always; padding: 35px; background: white; border: 3px solid #9c27b0; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #9c27b0; color: white; padding: 14px 28px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong style="font-size: 1.3em;">Chapter \${page.ch}</strong>
                        </div>
                        <h3 style="color: #9c27b0; margin: 15px 0; font-size: 1.6em;">\${page.title}</h3>
                        <div style="font-size: 60px; text-align: center; margin: 20px 0;">\${page.emoji}</div>
                        <p style="font-size: 1.2em; line-height: 1.9; color: #333; text-align: justify; text-indent: 40px;">\${page.text}</p>
                    </div>
                \`).join('') + '<div style="margin-top: 30px; padding: 25px; background: #f3e5f5; border-radius: 10px; text-align: center;"><h3 style="color: #9c27b0; margin: 0 0 10px 0;">🎉 Congratulations! 🎉</h3><p style="font-size: 1.2em; margin: 0;">You completed Sophia\\'s transformative journey to ' + dest + '! You\\'re an amazing reader!</p></div>';
            }
            </script>
        `;
    },
    
    generateSearchFind(destination) {
        const items = {
            city: ['🏢 Building', '🚕 Taxi', '🚦 Traffic Light', '🌳 Tree', '👮 Police Officer'],
            beach: ['🐚 Seashell', '⭐ Starfish', '🦀 Crab', '🏖️ Beach Ball', '☀️ Sun'],
            mountains: ['🌲 Pine Tree', '🦌 Deer', '🏔️ Mountain Peak', '🦅 Eagle', '⛺ Tent'],
            'theme-park': ['🎢 Roller Coaster', '🎠 Carousel', '🎈 Balloon', '🍦 Ice Cream', '🎪 Tent'],
            'road-trip': ['🚗 Car', '⛽ Gas Station', '🌉 Bridge', '🐄 Cow', '🛣️ Road Sign'],
            international: ['✈️ Airplane', '🗼 Tower', '🏛️ Monument', '🍜 Food', '🎭 Culture']
        };
        
        // Use generic city items as default
        const searchItems = items.city;
        
        return `
            <div class="search-find-container">
                <h3>Can you find these at ${destination}?</h3>
                <p style="margin: 20px 0;">Check them off when you see them!</p>
                <div class="search-items">
                    ${searchItems.map(item => `<div class="search-item">☐ ${item}</div>`).join('')}
                </div>
                <div style="margin-top: 40px; border: 3px solid #333; padding: 30px; text-align: center; background: #f9f9f9;">
                    <p style="font-size: 1.2em; margin-bottom: 20px;"><strong>Look around and draw what you see!</strong></p>
                    <div style="height: 300px; background: white; border: 2px dashed #999;"></div>
                </div>
            </div>
        `;
    },
    
    generateColoringPage(destination) {
        return `
            <div class="coloring-page">
                <h3>Color Your ${destination} Adventure!</h3>
                <div class="coloring-outline">
                    <div style="font-size: 120px; text-align: center; filter: grayscale(100%) opacity(30%);">
                        🏙️
                    </div>
                    <p style="margin-top: 20px; font-size: 1.2em; text-align: center; color: #999;">
                        ${destination.toUpperCase()}
                    </p>
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                    <p><strong>Coloring Tips:</strong></p>
                    <ul style="margin: 10px 0 0 30px; line-height: 1.8;">
                        <li>Use your favorite colors!</li>
                        <li>Stay inside the lines</li>
                        <li>Have fun!</li>
                    </ul>
                </div>
            </div>
        `;
    },
    
    generateCountingGame(destination) {
        const objects = {
            city: '🏢',
            beach: '🐚',
            mountains: '🌲',
            'theme-park': '🎈',
            'road-trip': '🚗',
            international: '✈️'
        };
        
        // Use star as generic default
        const obj = '⭐';
        
        return `
            <div style="padding: 20px;">
                <h3>Let's Count at ${destination}!</h3>
                <div style="margin: 30px 0;">
                    <p style="font-size: 1.3em; margin-bottom: 20px;"><strong>Count how many you see:</strong></p>
                    <div style="font-size: 60px; text-align: center; margin: 20px 0;">
                        ${obj}
                    </div>
                    <p style="text-align: center; font-size: 1.5em;">I counted: _____</p>
                </div>
                <div style="margin: 30px 0;">
                    <div style="font-size: 60px; text-align: center; margin: 20px 0;">
                        ${obj} ${obj}
                    </div>
                    <p style="text-align: center; font-size: 1.5em;">I counted: _____</p>
                </div>
                <div style="margin: 30px 0;">
                    <div style="font-size: 60px; text-align: center; margin: 20px 0;">
                        ${obj} ${obj} ${obj}
                    </div>
                    <p style="text-align: center; font-size: 1.5em;">I counted: _____</p>
                </div>
                <div style="margin: 30px 0;">
                    <div style="font-size: 60px; text-align: center; margin: 20px 0;">
                        ${obj} ${obj} ${obj} ${obj}
                    </div>
                    <p style="text-align: center; font-size: 1.5em;">I counted: _____</p>
                </div>
                <div style="margin-top: 40px; padding: 20px; background: #fff9e6; border-radius: 10px;">
                    <p style="font-size: 1.2em;"><strong>Great job counting! 🌟</strong></p>
                </div>
            </div>
        `;
    },
    
    // Ages 4-8 Games
    generateBingo(destination) {
        const itemSets = {
            city: [
                'Tall Building', 'Red Car', 'Traffic Light', 'Park', 'Restaurant',
                'Museum', 'Taxi', 'Street Performer', 'Fountain', 'Bridge',
                'Statue', 'Bus', 'Cafe', 'Street Sign', 'Bicycle',
                'Dog Walker', 'Food Truck', 'Store Window', 'Flag', 'Tree',
                'Police Car', 'Fire Hydrant', 'Mailbox', 'Bench'
            ],
            beach: [
                'Seashell', 'Sandcastle', 'Volleyball Net', 'Surfboard', 'Beach Umbrella',
                'Seagull', 'Lifeguard', 'Ice Cream Stand', 'Beach Ball', 'Sunglasses',
                'Flip Flops', 'Waves', 'Sailboat', 'Pier', 'Beach Towel',
                'Sand Bucket', 'Starfish', 'Crab', 'Palm Tree', 'Kite',
                'Boogie Board', 'Snorkel', 'Dolphin', 'Beach Chair'
            ],
            mountains: [
                'Pine Tree', 'Stream', 'Rock', 'Bird', 'Hiking Trail',
                'Mountain Peak', 'Deer', 'Cabin', 'Campfire', 'Tent',
                'Backpack', 'Walking Stick', 'Squirrel', 'Wild Flowers', 'Bridge',
                'Waterfall', 'Eagle', 'Compass', 'Map', 'Pinecone',
                'Chipmunk', 'Lake', 'Fishing Rod', 'Binoculars'
            ],
            'theme-park': [
                'Roller Coaster', 'Carousel', 'Cotton Candy', 'Balloon', 'Mascot',
                'Popcorn', 'Ice Cream', 'Gift Shop', 'Photo Booth', 'Fireworks',
                'Face Painting', 'Game Booth', 'Prize', 'Ferris Wheel', 'Food Stand',
                'Churros', 'Souvenir Cup', 'Map', 'Fast Pass', 'Show',
                'Parade', 'Character', 'Stroller', 'Locker'
            ],
            'road-trip': [
                'License Plate', 'Gas Station', 'Rest Stop', 'Billboard', 'Bridge',
                'Truck', 'Motorcycle', 'Cow', 'Horse', 'Barn',
                'Windmill', 'Water Tower', 'Mile Marker', 'Speed Limit Sign', 'Exit Sign',
                'Welcome Sign', 'Restaurant', 'Hotel', 'Car Wash', 'Flag',
                'Train', 'Airport', 'Lake', 'Mountain'
            ],
            international: [
                'Foreign Language Sign', 'Local Food', 'Monument', 'Flag', 'Currency',
                'Souvenir Shop', 'Tour Guide', 'Map', 'Museum', 'Local Costume',
                'Traditional Building', 'Street Market', 'Public Transport', 'Landmark', 'Photo Spot',
                'Local Animal', 'Cultural Symbol', 'Temple/Church', 'Plaza', 'Street Art',
                'Local Music', 'Traditional Food', 'Fountain', 'Garden'
            ]
        };
        
        // Use generic city items as default
        const items = itemSets.city;
        const shuffled = items.sort(() => Math.random() - 0.5).slice(0, 24);
        shuffled.splice(12, 0, 'FREE SPACE');
        
        return `
            <div>
                <p style="text-align: center; margin-bottom: 20px; font-size: 1.1em;">
                    Mark off each item when you see it during your trip to ${destination}!
                </p>
                <div class="bingo-grid">
                    ${shuffled.map((item, i) => 
                        `<div class="bingo-cell ${item === 'FREE SPACE' ? 'free' : ''}">${item}</div>`
                    ).join('')}
                </div>
                <p style="text-align: center; margin-top: 20px; font-size: 1.1em;">
                    <strong>Get 5 in a row to win! (across, down, or diagonal)</strong>
                </p>
            </div>
        `;
    },
    
    generateGuessIn10(destination) {
        const riddleSets = {
            city: [
                { q: 'I light up at night and help you cross the street safely. What am I?', a: 'Traffic Light' },
                { q: 'I\'m yellow and black, and I take people where they need to go. What am I?', a: 'Taxi/Cab' },
                { q: 'I\'m tall, have many floors, and people work or live inside me. What am I?', a: 'Building/Skyscraper' },
                { q: 'I have wheels, carry many people, and stop at every corner. What am I?', a: 'Bus' },
                { q: 'People come to see old things and learn about history in me. What am I?', a: 'Museum' }
            ],
            beach: [
                { q: 'I used to be a home for a sea creature, now I\'m on the sand. What am I?', a: 'Seashell' },
                { q: 'I fly above, I\'m white and gray, and I love french fries. What am I?', a: 'Seagull' },
                { q: 'I watch over swimmers and sit up high. What am I?', a: 'Lifeguard' },
                { q: 'I have five arms and live in the ocean. What am I?', a: 'Starfish' },
                { q: 'I come in and out twice a day and make waves. What am I?', a: 'Tide/Ocean' }
            ],
            mountains: [
                { q: 'I\'m green with needles, and I stay green all year. What am I?', a: 'Pine Tree' },
                { q: 'I have antlers and I\'m shy around people. What am I?', a: 'Deer' },
                { q: 'I flow over rocks and down the mountain. What am I?', a: 'Stream/River' },
                { q: 'I soar high above looking for food. What am I?', a: 'Eagle/Hawk' },
                { q: 'I\'m a cozy place to sleep when camping. What am I?', a: 'Tent/Cabin' }
            ]
        };
        
        // Use generic city riddles as default
        const riddles = riddleSets.city;
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Can you guess in 10 questions or less?</h3>
                ${riddles.map((riddle, i) => `
                    <div class="quiz-question">
                        <p style="font-size: 1.1em; margin-bottom: 10px;"><strong>Riddle ${i + 1}:</strong></p>
                        <p style="font-size: 1.1em; color: #333; margin: 15px 0;">${riddle.q}</p>
                        <p style="margin-top: 15px; font-size: 0.9em; color: #666;"><em>Answer: ${riddle.a}</em></p>
                    </div>
                `).join('')}
                <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                    <p><strong>💡 Tip:</strong> Take turns asking yes/no questions to figure out the answer!</p>
                </div>
            </div>
        `;
    },
    
    generatePictionary(destination) {
        const wordSets = {
            city: ['Skyscraper', 'Taxi', 'Subway', 'Park', 'Restaurant', 'Museum', 'Traffic Jam', 'Street Performer', 'Coffee Shop', 'Fire Truck', 'Statue', 'Bridge', 'Fountain', 'Sidewalk', 'Billboard'],
            beach: ['Sandcastle', 'Surfboard', 'Seashell', 'Waves', 'Seagull', 'Beach Ball', 'Sunscreen', 'Pier', 'Lifeguard', 'Palm Tree', 'Flip Flops', 'Sand Bucket', 'Volleyball', 'Sailboat', 'Starfish'],
            mountains: ['Mountain Peak', 'Hiking Trail', 'Backpack', 'Tent', 'Campfire', 'Pine Tree', 'Deer', 'Stream', 'Compass', 'Binoculars', 'Waterfall', 'Cabin', 'Sleeping Bag', 'S\'mores', 'Trail Sign'],
            'theme-park': ['Roller Coaster', 'Carousel', 'Cotton Candy', 'Ferris Wheel', 'Mascot', 'Popcorn', 'Ticket', 'Fireworks', 'Parade', 'Balloon', 'Ice Cream', 'Game Booth', 'Face Paint', 'Souvenir', 'Map']
        };
        
        // Use generic city words as default
        const words = wordSets.city;
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px;">${destination} Pictionary Words</h3>
                <p style="text-align: center; margin-bottom: 30px;">Cut out these cards and draw!</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    ${words.map(word => `
                        <div style="border: 2px dashed #333; padding: 15px; text-align: center; background: white;">
                            <strong>${word}</strong>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 10px;">
                    <p><strong>How to Play:</strong></p>
                    <ol style="margin: 10px 0 0 30px; line-height: 1.8;">
                        <li>Pick a card (don't show anyone!)</li>
                        <li>Draw the word (no letters or numbers!)</li>
                        <li>Others try to guess what you're drawing</li>
                        <li>Set a timer for extra fun!</li>
                    </ol>
                </div>
            </div>
        `;
    },
    
    generateComicSheet(destination) {
        const storyStarters = [
            `When I arrived at ${destination}, I couldn't believe my eyes...`,
            `The funniest thing happened when we...`,
            `I discovered something amazing...`,
            `At first I was nervous, but then...`,
            `The best part of the day was when...`,
            `And that's how our ${destination} adventure ended!`
        ];
        
        const storyboardPrompts = [
            { title: 'The Journey Begins', prompt: 'Draw yourself starting the trip' },
            { title: 'First Impression', prompt: 'What did you see first?' },
            { title: 'Something Surprising!', prompt: 'Draw something that surprised you' },
            { title: 'A Challenge', prompt: 'Show a tricky moment' },
            { title: 'The Best Part', prompt: 'Draw your favorite moment' },
            { title: 'The Happy Ending', prompt: 'How does the story end?' }
        ];
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px;">📖 Create Your ${destination} Adventure Story!</h3>
                <p style="text-align: center; margin-bottom: 30px; font-size: 1.1em;">Choose your comic style below (or print all three!)</p>
                
                <!-- Template Selection Buttons -->
                <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap;">
                    <button onclick="document.getElementById('blank-template').scrollIntoView({behavior: 'smooth'})" 
                            style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em;">
                        📄 Blank Sheets
                    </button>
                    <button onclick="document.getElementById('story-starters').scrollIntoView({behavior: 'smooth'})" 
                            style="padding: 12px 24px; background: #f5576c; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em;">
                        💡 Story Starters
                    </button>
                    <button onclick="document.getElementById('storyboard').scrollIntoView({behavior: 'smooth'})" 
                            style="padding: 12px 24px; background: #4ecdc4; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em;">
                        🎬 Storyboard
                    </button>
                </div>

                <!-- Template 1: Blank Sheets -->
                <div id="blank-template" style="page-break-after: always; margin-bottom: 60px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0;">📄 Template 1: Blank Comic Sheets</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">Total creative freedom - draw whatever you imagine!</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        ${[1, 2, 3, 4, 5, 6].map(i => `
                            <div style="border: 3px solid #333; padding: 15px; background: white; border-radius: 8px;">
                                <div style="height: 180px; border: 2px dashed #999; margin-bottom: 10px; background: #f9f9f9; border-radius: 4px;"></div>
                                <div style="border-top: 2px solid #ccc; padding-top: 10px;">
                                    <p style="font-size: 0.9em; color: #666; font-weight: bold;">Panel ${i}</p>
                                    <div style="border-bottom: 1px solid #999; margin: 5px 0; padding: 3px;"></div>
                                    <div style="border-bottom: 1px solid #999; margin: 5px 0; padding: 3px;"></div>
                                    <div style="border-bottom: 1px solid #999; margin: 5px 0; padding: 3px;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Template 2: Story Starters -->
                <div id="story-starters" style="page-break-after: always; margin-bottom: 60px;">
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0;">💡 Template 2: Story Starters</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">Use these sentence starters to build your story!</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        ${storyStarters.map((starter, i) => `
                            <div style="border: 3px solid #f5576c; padding: 15px; background: white; border-radius: 8px;">
                                <div style="background: #fff9e6; padding: 10px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #ffd700;">
                                    <p style="font-size: 0.95em; font-weight: bold; color: #333; margin: 0; font-style: italic;">"${starter}"</p>
                                </div>
                                <div style="height: 160px; border: 2px dashed #f5576c; margin-bottom: 10px; background: #fef5f8; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: #ccc; font-size: 0.9em;">Draw your story here</span>
                                </div>
                                <div style="border-top: 2px solid #ccc; padding-top: 10px;">
                                    <p style="font-size: 0.85em; color: #666;">Continue the story:</p>
                                    <div style="border-bottom: 1px solid #999; margin: 5px 0; padding: 3px;"></div>
                                    <div style="border-bottom: 1px solid #999; margin: 5px 0; padding: 3px;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: #fff0f5; border-radius: 8px; border-left: 4px solid #f5576c;">
                        <p style="margin: 0;"><strong>💡 Tip:</strong> Read the starter, then draw what happens next. Add speech bubbles to show what people are saying!</p>
                    </div>
                </div>

                <!-- Template 3: Storyboard -->
                <div id="storyboard" style="page-break-after: always; margin-bottom: 40px;">
                    <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin: 0;">🎬 Template 3: Professional Storyboard</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">Follow the story structure like a real filmmaker!</p>
                    </div>
                    
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #4caf50;">
                        <h4 style="margin: 0 0 10px 0; color: #2e7d32;">📚 Story Arc Guide:</h4>
                        <p style="margin: 5px 0; line-height: 1.6;">Every great story has: <strong>Beginning</strong> → <strong>Middle</strong> → <strong>End</strong></p>
                        <p style="margin: 5px 0; font-size: 0.95em;">Your storyboard follows this path!</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr; gap: 25px;">
                        ${storyboardPrompts.map((panel, i) => {
                            const sectionColors = {
                                0: '#e3f2fd', 1: '#e3f2fd',  // Beginning (blue)
                                2: '#fff3e0', 3: '#fff3e0',  // Middle (orange)
                                4: '#e8f5e9', 5: '#e8f5e9'   // End (green)
                            };
                            const sectionLabels = {
                                0: '🎬 BEGINNING',
                                2: '⚡ MIDDLE',
                                4: '🌟 ENDING'
                            };
                            return `
                                ${sectionLabels[i] ? `
                                    <div style="text-align: center; font-weight: bold; font-size: 1.2em; color: #667eea; margin: 10px 0;">
                                        ${sectionLabels[i]}
                                    </div>
                                ` : ''}
                                <div style="border: 3px solid #4ecdc4; padding: 20px; background: ${sectionColors[i]}; border-radius: 8px; display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
                                    <div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                            <h4 style="margin: 0; color: #333; font-size: 1.1em;">${i + 1}. ${panel.title}</h4>
                                            <span style="background: #4ecdc4; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: bold;">Scene ${i + 1}</span>
                                        </div>
                                        <div style="background: white; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #4ecdc4;">
                                            <p style="margin: 0; font-weight: bold; color: #555; font-size: 0.95em;">📝 ${panel.prompt}</p>
                                        </div>
                                        <div style="height: 220px; border: 3px dashed #4ecdc4; background: white; border-radius: 4px; position: relative;">
                                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #ccc;">
                                                <p style="font-size: 2em; margin: 0;">🎨</p>
                                                <p style="font-size: 0.9em; margin: 5px 0;">Draw here</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style="background: white; padding: 15px; border-radius: 8px; height: 100%; display: flex; flex-direction: column;">
                                            <p style="font-weight: bold; margin: 0 0 10px 0; font-size: 0.9em; color: #666;">📋 Scene Notes:</p>
                                            <div style="flex: 1;">
                                                <p style="font-size: 0.85em; color: #888; margin: 5px 0;">Who is here?</p>
                                                <div style="border-bottom: 1px solid #ddd; margin: 3px 0; padding: 3px;"></div>
                                                
                                                <p style="font-size: 0.85em; color: #888; margin: 10px 0 5px 0;">What happens?</p>
                                                <div style="border-bottom: 1px solid #ddd; margin: 3px 0; padding: 3px;"></div>
                                                <div style="border-bottom: 1px solid #ddd; margin: 3px 0; padding: 3px;"></div>
                                                
                                                <p style="font-size: 0.85em; color: #888; margin: 10px 0 5px 0;">How do I feel?</p>
                                                <div style="border-bottom: 1px solid #ddd; margin: 3px 0; padding: 3px;"></div>
                                                
                                                <div style="margin-top: 15px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                                                    <p style="font-size: 0.75em; color: #666; margin: 0;">💬 Speech bubble idea:</p>
                                                    <div style="border-bottom: 1px solid #ccc; margin: 3px 0; padding: 3px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #fff9e6; border-radius: 10px; border: 2px dashed #ffd700;">
                        <h4 style="margin: 0 0 10px 0; color: #f57c00;">🎯 Storyboard Success Tips:</h4>
                        <ul style="margin: 5px 0 0 20px; line-height: 1.8;">
                            <li><strong>Beginning:</strong> Set the scene - Where are you? Who's with you?</li>
                            <li><strong>Middle:</strong> Show the adventure - What happened? Any surprises?</li>
                            <li><strong>Ending:</strong> Wrap it up - How did it end? How do you feel?</li>
                            <li><strong>Details matter:</strong> Add facial expressions, backgrounds, and speech bubbles!</li>
                        </ul>
                    </div>
                </div>

                <!-- General Comic Tips -->
                <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #fff9e6 0%, #ffe8cc 100%); border-radius: 10px; border: 3px solid #ffd700;">
                    <h3 style="margin: 0 0 15px 0; color: #333;">🎨 Comic Creation Tips for All Templates:</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.2em; margin: 0 0 5px 0;">💭</p>
                            <p style="margin: 0; font-weight: bold;">Speech Bubbles</p>
                            <p style="margin: 5px 0 0 0; font-size: 0.9em;">Show what people say!</p>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.2em; margin: 0 0 5px 0;">😊😢😠</p>
                            <p style="margin: 0; font-weight: bold;">Facial Expressions</p>
                            <p style="margin: 5px 0 0 0; font-size: 0.9em;">Show how people feel!</p>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.2em; margin: 0 0 5px 0;">🎨</p>
                            <p style="margin: 0; font-weight: bold;">Use Colors</p>
                            <p style="margin: 5px 0 0 0; font-size: 0.9em;">Make it bright and fun!</p>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <p style="font-size: 1.2em; margin: 0 0 5px 0;">➡️</p>
                            <p style="margin: 0; font-weight: bold;">Arrows & Lines</p>
                            <p style="margin: 5px 0 0 0; font-size: 0.9em;">Show movement & action!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    generateKidsItinerary(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">My ${destination} Adventure Plan! 🗺️</h3>
                ${['Morning', 'Midday', 'Afternoon', 'Evening'].map(time => `
                    <div style="margin: 20px 0; padding: 20px; border: 2px solid #667eea; border-radius: 10px; background: #f8f9fa;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">${time}</h4>
                        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 15px; align-items: center;">
                            <div style="width: 70px; height: 70px; border: 2px dashed #999; background: white;"></div>
                            <div>
                                <p style="margin-bottom: 5px;"><strong>What we'll do:</strong></p>
                                <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                                <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                                <p style="margin-top: 10px; font-size: 0.9em;">How I feel about this: _______________</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <div style="margin-top: 30px; padding: 20px; background: #ffd700; border-radius: 10px;">
                    <p style="text-align: center;"><strong>⭐ My most exciting activity today: ________________</strong></p>
                </div>
            </div>
        `;
    },
    
    generateFeelingsChart() {
        const travelSituations = [
            {
                emoji: '✈️',
                situation: 'Getting on the airplane',
                feelings: ['Excited 🤗', 'Nervous 😰', 'Curious 🤔', 'Scared 😨'],
                color: '#e3f2fd'
            },
            {
                emoji: '🏨',
                situation: 'Arriving at a new place',
                feelings: ['Happy 😊', 'Tired 😴', 'Confused 😕', 'Amazed 😲'],
                color: '#f3e5f5'
            },
            {
                emoji: '🍽️',
                situation: 'Trying new food',
                feelings: ['Excited 😋', 'Worried 😰', 'Brave 💪', 'Unsure 🤨'],
                color: '#fff9c4'
            },
            {
                emoji: '🗣️',
                situation: 'Hearing a different language',
                feelings: ['Curious 🤔', 'Confused 😵', 'Interested 👂', 'Frustrated 😤'],
                color: '#c8e6c9'
            },
            {
                emoji: '🏠',
                situation: 'Missing home',
                feelings: ['Sad 😢', 'Lonely 😔', 'Okay 😌', 'Homesick 💔'],
                color: '#ffcdd2'
            },
            {
                emoji: '🎉',
                situation: 'Doing something really fun',
                feelings: ['Thrilled 🥳', 'Joyful 😄', 'Proud 😎', 'Grateful 🙏'],
                color: '#fff59d'
            }
        ];
        
        const copingStrategies = [
            { feeling: 'Scared or Nervous', strategies: ['Take deep breaths', 'Hold someone\'s hand', 'Talk about it', 'Think happy thoughts'] },
            { feeling: 'Sad or Homesick', strategies: ['Look at family photos', 'Write in your journal', 'Call/text someone you love', 'Remember you\'ll be home soon'] },
            { feeling: 'Angry or Frustrated', strategies: ['Count to 10', 'Take a break', 'Use your words to explain', 'Draw or write your feelings'] },
            { feeling: 'Tired or Overwhelmed', strategies: ['Rest for a bit', 'Have a quiet moment', 'Drink water and eat a snack', 'Do something calm'] }
        ];
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px;">🕵️ Travel Feelings Detective & Coping Kit</h3>
                <p style="text-align: center; margin-bottom: 30px; font-size: 1.1em;">Discover your feelings and learn what to do with them!</p>
                
                <div style="background: #fff9e6; padding: 20px; border-radius: 10px; margin-bottom: 30px; border-left: 5px solid #ffd700;">
                    <h4 style="margin-bottom: 10px;">📝 How to Use This:</h4>
                    <ol style="margin: 5px 0 0 20px; line-height: 1.8;">
                        <li>Read each travel situation</li>
                        <li>Circle or color the feelings you have</li>
                        <li>Use the "Feeling Thermometer" to show how STRONG your feeling is</li>
                        <li>Write what helped you feel better!</li>
                    </ol>
                </div>
                
                <h4 style="margin: 30px 0 20px 0; color: #667eea;">Part 1: Feelings Detective 🔍</h4>
                ${travelSituations.map((item, index) => `
                    <div style="margin: 20px 0; padding: 25px; background: ${item.color}; border-radius: 12px; border: 2px solid #ddd;">
                        <div style="display: flex; align-items: center; margin-bottom: 15px;">
                            <span style="font-size: 2.5em; margin-right: 15px;">${item.emoji}</span>
                            <h4 style="font-size: 1.2em; color: #333;">${item.situation}</h4>
                        </div>
                        
                        <p style="margin: 10px 0; font-weight: bold;">Circle or color the feelings you had:</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0;">
                            ${item.feelings.map(feeling => `
                                <div style="padding: 8px 15px; background: white; border: 2px solid #999; border-radius: 20px; font-size: 1em;">
                                    ${feeling}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">Feeling Thermometer - How STRONG was this feeling?</p>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 0.9em;">Small</span>
                                <div style="flex: 1; height: 30px; background: linear-gradient(to right, #90ee90, #ffd700, #ff6347); border-radius: 15px; border: 2px solid #333; position: relative;">
                                    <div style="position: absolute; top: -25px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 10px; font-size: 0.8em;">
                                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                                    </div>
                                </div>
                                <span style="font-size: 0.9em;">BIG</span>
                            </div>
                            <p style="margin-top: 10px; font-size: 0.9em;">Circle your number: 1  2  3  4  5</p>
                        </div>
                        
                        <p style="margin: 10px 0;"><strong>What made me feel this way?</strong></p>
                        <div style="border-bottom: 2px solid #666; margin: 5px 0; padding: 5px;"></div>
                        
                        <p style="margin: 10px 0;"><strong>What helped me feel better?</strong></p>
                        <div style="border-bottom: 2px solid #666; margin: 5px 0; padding: 5px;"></div>
                    </div>
                `).join('')}
                
                <h4 style="margin: 40px 0 20px 0; color: #667eea;">Part 2: My Coping Toolkit 🧰</h4>
                <p style="margin-bottom: 20px;">When you have big feelings, here are things you can try!</p>
                
                ${copingStrategies.map(item => `
                    <div style="margin: 15px 0; padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #667eea;">
                        <h4 style="color: #667eea; margin-bottom: 10px;">When I feel ${item.feeling}:</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                            ${item.strategies.map(strategy => `
                                <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #ddd;">
                                    ☐ ${strategy}
                                </div>
                            `).join('')}
                        </div>
                        <p style="margin-top: 15px;"><strong>What worked best for me:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 30px; padding: 25px; background: #e8f5e9; border-radius: 10px;">
                    <h4 style="margin-bottom: 10px;">🌟 What I Learned About My Feelings:</h4>
                    <p style="margin: 10px 0;"><strong>I felt the strongest when:</strong></p>
                    <div style="border-bottom: 2px solid #666; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>I'm proud that I:</strong></p>
                    <div style="border-bottom: 2px solid #666; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>Next time I travel, I'll remember to:</strong></p>
                    <div style="border-bottom: 2px solid #666; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div style="margin-top: 20px; padding: 20px; background: #fff9e6; border-radius: 10px; border: 2px dashed #ffd700;">
                    <p style="text-align: center; font-size: 1.1em;"><strong>🎉 Remember: ALL feelings are okay! You're doing a great job learning about your emotions!</strong></p>
                </div>
            </div>
        `;
    },
    
    generateGratitudeJournal(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Things I'm Grateful For at ${destination} 🙏</h3>
                ${[1, 2, 3, 4, 5].map(day => `
                    <div class="journal-prompt" style="margin: 20px 0;">
                        <h4 style="margin-bottom: 15px;">Day ${day}</h4>
                        <p style="margin: 10px 0;"><strong>1. Today I'm thankful for:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <p style="margin: 10px 0;"><strong>2. Something kind someone did:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <p style="margin: 10px 0;"><strong>3. Something beautiful I saw:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <p style="margin-top: 15px;">Draw or doodle something you're grateful for:</p>
                        <div style="height: 80px; border: 2px dashed #999; background: white; margin-top: 10px;"></div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // Ages 9-12 Games
    generateScavengerHunt(destination) {
        const challenges = {
            city: [
                '📸 A building reflection in a window',
                '📸 Someone walking their dog',
                '📸 A unique door or entrance',
                '📸 Street art or graffiti',
                '📸 A statue or monument (from a creative angle)',
                '📸 Public transportation',
                '📸 A local restaurant sign',
                '📸 Something in your favorite color',
                '📸 A person helping someone',
                '📸 Nature in the city (tree, bird, flower)',
                '📸 An interesting shadow',
                '📸 A sign in a different language',
                '📸 Your group having fun',
                '📸 Something that starts with the first letter of the city',
                '📸 A view from up high'
            ],
            beach: [
                '📸 A perfect seashell',
                '📸 Footprints in the sand',
                '📸 A wave at the perfect moment',
                '📸 A sandcastle (yours or someone else\'s)',
                '📸 A bird in flight',
                '📸 Something blue',
                '📸 A reflection in water',
                '📸 Shells arranged in a pattern (make your own!)',
                '📸 Someone jumping',
                '📸 A beach sunrise or sunset',
                '📸 Interesting cloud formation',
                '📸 Beach toys',
                '📸 Something heart-shaped in nature',
                '📸 Your shadow',
                '📸 A unique perspective of the beach'
            ]
        };
        
        // Use generic city challenges as default
        const items = challenges.city;
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px;">${destination} Photo Scavenger Hunt 📸</h3>
                <p style="text-align: center; margin-bottom: 30px;">Check off each item as you photograph it!</p>
                <div style="background: white; padding: 20px; border-radius: 10px;">
                    ${items.map((item, i) => `
                        <div style="padding: 12px; margin: 10px 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
                            <span style="font-size: 1.5em; margin-right: 15px;">☐</span>
                            <span style="flex: 1;">${item}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 10px;">
                    <p><strong>Bonus Challenge:</strong> Create a photo story with your pictures!</p>
                    <p style="margin-top: 10px;">🏆 Complete all items to become a ${destination} Explorer!</p>
                </div>
            </div>
        `;
    },
    
    generateCrossword(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">${destination} Crossword Puzzle</h3>
                <div style="max-width: 600px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; margin: 20px 0;">
                        ${Array(100).fill(0).map((_, i) => `
                            <div style="aspect-ratio: 1; border: 1px solid #333; background: ${Math.random() > 0.3 ? 'white' : '#333'};"></div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 30px;">
                        <h4>Across</h4>
                        <ol>
                            <li>Famous landmark in ${destination}</li>
                            <li>Local food specialty</li>
                            <li>Traditional greeting</li>
                            <li>Popular activity</li>
                        </ol>
                        <h4 style="margin-top: 20px;">Down</h4>
                        <ol>
                            <li>Historical fact</li>
                            <li>Cultural symbol</li>
                            <li>Type of transportation</li>
                            <li>Local animal</li>
                        </ol>
                    </div>
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                    <p><em>Note: Research ${destination} to fill in the answers! Use books, websites, or ask locals.</em></p>
                </div>
            </div>
        `;
    },
    
    generateTrivia(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">${destination} Trivia Challenge! 🧠</h3>
                <p style="text-align: center; margin-bottom: 30px;">Test your knowledge and learn fun facts!</p>
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `
                    <div class="quiz-question">
                        <p style="font-size: 1.1em; margin-bottom: 15px;"><strong>Question ${i}:</strong></p>
                        <p style="margin: 10px 0;">What is a famous fact about ${destination}?</p>
                        <div style="margin: 15px 0;">
                            <p>A) ______________________</p>
                            <p>B) ______________________</p>
                            <p>C) ______________________</p>
                            <p>D) ______________________</p>
                        </div>
                        <p style="border-top: 1px dashed #999; padding-top: 10px; margin-top: 15px; font-size: 0.9em; color: #666;">
                            <strong>Answer:</strong> ____ | <strong>Fun Fact:</strong> ____________________
                        </p>
                    </div>
                `).join('')}
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 10px;">
                    <p><strong>💡 Activity:</strong> Research ${destination} and fill in your own trivia questions! Quiz your family and friends.</p>
                </div>
            </div>
        `;
    },
    
    generateMadLibs(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Travel Mad Libs - ${destination} Adventure!</h3>
                <div style="background: #fff9e6; padding: 25px; border-radius: 10px; margin: 20px 0;">
                    <p style="font-size: 1.1em; line-height: 2;">
                        Today we traveled to the <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span> 
                        city of ${destination}! First, we saw a giant <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(noun)</span> 
                        and it was <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span>! 
                        For lunch, we ate <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(plural noun)</span> 
                        at a <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span> restaurant.
                    </p>
                    <p style="font-size: 1.1em; line-height: 2; margin-top: 20px;">
                        In the afternoon, we decided to <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(verb)</span> 
                        around the <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(noun)</span>. 
                        We met a <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span> 
                        local who showed us how to <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(verb)</span>. 
                        It was so <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span>!
                    </p>
                    <p style="font-size: 1.1em; line-height: 2; margin-top: 20px;">
                        By evening, we were <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(feeling)</span> 
                        and ready to <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(verb)</span>. 
                        Our favorite part was when we saw <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(number)</span> 
                        <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(plural noun)</span> 
                        doing a <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span> dance!
                    </p>
                    <p style="font-size: 1.1em; line-height: 2; margin-top: 20px;">
                        ${destination} is definitely the most <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(adjective)</span> 
                        place I've ever <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(past tense verb)</span>. 
                        I can't wait to come back and <span style="border-bottom: 2px solid #333; padding: 0 40px; display: inline-block; margin: 0 5px;">(verb)</span> again!
                    </p>
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                    <p><strong>How to Play:</strong></p>
                    <ol style="margin: 10px 0 0 30px; line-height: 1.8;">
                        <li>Ask someone for the words in parentheses (don't show them the story!)</li>
                        <li>Write their answers in the blanks</li>
                        <li>Read the silly story out loud!</li>
                    </ol>
                </div>
            </div>
        `;
    },
    
    generateJournalPrompts(destination) {
        const prompts = [
            'What surprised me most about ' + destination + '?',
            'If I could bring one thing home from this trip, it would be...',
            'The bravest thing I did today was...',
            'I felt proud when...',
            'One challenge I faced and how I handled it:',
            'A new thing I learned about myself:',
            'Someone interesting I met:',
            'If I could do anything here tomorrow, I would...',
            'The best food I tried was... and it tasted like...',
            'What I miss about home:',
            'What I\'ll remember forever about this trip:',
            'How this trip changed my perspective:'
        ];
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">My ${destination} Travel Journal 📔</h3>
                ${prompts.map((prompt, i) => `
                    <div class="journal-prompt" style="margin: 20px 0;">
                        <p style="font-size: 1.1em; font-weight: bold; margin-bottom: 15px;">${prompt}</p>
                        <div style="border-bottom: 1px solid #999; margin: 8px 0; padding: 5px;"></div>
                        <div style="border-bottom: 1px solid #999; margin: 8px 0; padding: 5px;"></div>
                        <div style="border-bottom: 1px solid #999; margin: 8px 0; padding: 5px;"></div>
                        <div style="border-bottom: 1px solid #999; margin: 8px 0; padding: 5px;"></div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    generateEmpathyChallenge(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Empathy & Culture Challenge ❤️</h3>
                <p style="text-align: center; margin-bottom: 30px;">Understand ${destination} through others' eyes</p>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Observation Challenge</h4>
                    <p style="margin: 10px 0;">Watch people in ${destination} and notice:</p>
                    <p><strong>How do they greet each other?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p><strong>What seems important to them?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p><strong>How is it different from home?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Perspective Taking</h4>
                    <p><strong>If I lived in ${destination}, my daily life would be:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p><strong>What I appreciate about this culture:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Kindness Mission</h4>
                    <p><strong>One way I can show respect for this culture:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p><strong>Something kind I did for someone today:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #ffe0e6; border-radius: 10px;">
                    <p><strong>Remember:</strong> Every culture has its own beautiful ways of doing things. Being curious and respectful helps us learn and grow!</p>
                </div>
            </div>
        `;
    },
    
    // Ages 13+ Games
    generatePhotoChallenge(destination) {
        const challenges = [
            '📷 Golden hour shot (sunrise or sunset)',
            '📷 Black and white street photography',
            '📷 Symmetry in architecture',
            '📷 Leading lines composition',
            '📷 Local life candid moment',
            '📷 Detail shot (texture, pattern)',
            '📷 From a unique angle (bird\'s eye or worm\'s eye view)',
            '📷 Rule of thirds landscape',
            '📷 Silhouette',
            '📷 Reflection (water, glass, metal)',
            '📷 Motion blur or freeze action',
            '📷 Frame within a frame',
            '📷 Shadow play',
            '📷 Local food artfully arranged',
            '📷 Contrast (old vs new, nature vs urban)',
            '📷 Portrait of a local (with permission)',
            '📷 Abstract composition',
            '📷 Your travel crew having fun',
            '📷 Cultural symbol or tradition',
            '📷 Sunset/sunrise over ${destination} landmark'
        ];
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px;">${destination} Photography Challenge 📸</h3>
                <p style="text-align: center; margin-bottom: 30px;">Level up your photography skills while exploring!</p>
                <div style="background: white; padding: 20px; border-radius: 10px;">
                    ${challenges.map((challenge, i) => `
                        <div style="padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; background: #f8f9fa;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="flex: 1;">${challenge}</span>
                                <input type="checkbox" style="width: 20px; height: 20px;">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 10px;">
                    <p><strong>Pro Tips:</strong></p>
                    <ul style="margin: 10px 0 0 30px; line-height: 1.8;">
                        <li>Natural light is your best friend</li>
                        <li>Clean your lens before shooting</li>
                        <li>Take multiple shots from different angles</li>
                        <li>Edit thoughtfully - less is often more</li>
                        <li>Always ask permission before photographing people</li>
                    </ul>
                </div>
            </div>
        `;
    },
    
    generateBudgetGame(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Budget Your Perfect Day in ${destination} 💰</h3>
                <div style="background: #fff9e6; padding: 25px; border-radius: 10px; margin: 20px 0;">
                    <h4 style="text-align: center; font-size: 1.5em; margin-bottom: 20px;">Your Budget: $100</h4>
                </div>
                
                <div style="margin: 20px 0;">
                    <h4>Plan Your Day:</h4>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🍳 Breakfast</p>
                        <p>Where: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🚌 Transportation</p>
                        <p>Method: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🎯 Morning Activity</p>
                        <p>Activity: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🍕 Lunch</p>
                        <p>Where: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🎨 Afternoon Activity</p>
                        <p>Activity: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🍽️ Dinner</p>
                        <p>Where: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">🎁 Souvenir</p>
                        <p>What: _______________________</p>
                        <p>Cost: $ _______</p>
                    </div>
                </div>
                
                <div style="margin: 30px 0; padding: 25px; background: #e8f5e9; border-radius: 10px;">
                    <h4 style="text-align: center; margin-bottom: 15px;">Total Spent: $ _______</h4>
                    <h4 style="text-align: center;">Money Left: $ _______</h4>
                </div>
                
                <div style="margin-top: 20px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                    <p><strong>Challenge Questions:</strong></p>
                    <ol style="margin: 10px 0 0 30px; line-height: 1.8;">
                        <li>What would you cut if you only had $75?</li>
                        <li>How could you save money while still having fun?</li>
                        <li>What free activities could you do?</li>
                    </ol>
                </div>
            </div>
        `;
    },
    
    generateCultureQuiz(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">${destination} Deep Dive Culture Quiz 🌏</h3>
                <p style="text-align: center; margin-bottom: 30px;">Research and discover fascinating facts!</p>
                
                ${[
                    'History & Origins',
                    'Traditional Customs',
                    'Language & Communication',
                    'Food & Cuisine',
                    'Arts & Music',
                    'Festivals & Celebrations',
                    'Architecture',
                    'Social Etiquette',
                    'Modern Culture',
                    'Geography & Climate'
                ].map((category, i) => `
                    <div class="quiz-question">
                        <h4 style="margin-bottom: 15px;">${category}</h4>
                        <p style="margin: 10px 0;"><strong>Question:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <p style="margin: 10px 0;"><strong>Answer:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                        <p style="margin: 10px 0;"><strong>Interesting Fact I Learned:</strong></p>
                        <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 10px;">
                    <p><strong>Research Tips:</strong> Use local museums, libraries, tour guides, documentaries, and reputable websites. Talk to locals when possible!</p>
                </div>
            </div>
        `;
    },
    
    generateLanguageCards(destination) {
        const phrases = [
            { english: 'Hello', local: '___________', pronunciation: '___________' },
            { english: 'Thank you', local: '___________', pronunciation: '___________' },
            { english: 'Please', local: '___________', pronunciation: '___________' },
            { english: 'Excuse me', local: '___________', pronunciation: '___________' },
            { english: 'Yes / No', local: '___________', pronunciation: '___________' },
            { english: 'How much?', local: '___________', pronunciation: '___________' },
            { english: 'Where is...?', local: '___________', pronunciation: '___________' },
            { english: 'Bathroom', local: '___________', pronunciation: '___________' },
            { english: 'Help', local: '___________', pronunciation: '___________' },
            { english: 'Beautiful', local: '___________', pronunciation: '___________' },
            { english: 'Delicious', local: '___________', pronunciation: '___________' },
            { english: 'Goodbye', local: '___________', pronunciation: '___________' }
        ];
        
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Essential ${destination} Phrases 💬</h3>
                <p style="text-align: center; margin-bottom: 30px;">Learn key phrases to connect with locals!</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
                    ${phrases.map(phrase => `
                        <div style="border: 2px solid #667eea; border-radius: 10px; padding: 20px; background: white;">
                            <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px; color: #667eea;">${phrase.english}</p>
                            <p style="margin: 8px 0;"><strong>Local:</strong> ${phrase.local}</p>
                            <p style="margin: 8px 0;"><strong>Say:</strong> ${phrase.pronunciation}</p>
                            <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px; text-align: center;">
                                ☐ Practiced
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #fff9e6; border-radius: 10px;">
                    <p><strong>💡 Pro Tip:</strong> Even if your pronunciation isn't perfect, locals appreciate the effort! A smile goes a long way.</p>
                    <p style="margin-top: 10px;"><strong>Challenge:</strong> Try to use at least 3 phrases each day!</p>
                </div>
            </div>
        `;
    },
    
    generateMindfulJournal(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Mindful Travel Journal - ${destination} 🧘</h3>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Morning Intention</h4>
                    <p style="margin: 10px 0;"><strong>Today I want to experience:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>How do I want to show up today?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Mindful Moments</h4>
                    <p style="margin: 10px 0;"><strong>What did I notice with my senses today?</strong></p>
                    <p>Saw: _________________________</p>
                    <p>Heard: _________________________</p>
                    <p>Smelled: _________________________</p>
                    <p>Tasted: _________________________</p>
                    <p>Felt: _________________________</p>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Personal Growth</h4>
                    <p style="margin: 10px 0;"><strong>What challenged me today?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>What did I learn about myself?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Gratitude & Reflection</h4>
                    <p style="margin: 10px 0;"><strong>Three things I'm grateful for today:</strong></p>
                    <p>1. _________________________</p>
                    <p>2. _________________________</p>
                    <p>3. _________________________</p>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Evening Reflection</h4>
                    <p style="margin: 10px 0;"><strong>The most meaningful moment of today was:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>Tomorrow I want to:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
            </div>
        `;
    },
    
    generatePerspectiveTaking(destination) {
        return `
            <div style="padding: 20px;">
                <h3 style="text-align: center; margin-bottom: 30px;">Perspective Taking in ${destination} 👁️</h3>
                <p style="text-align: center; margin-bottom: 30px;">Understanding culture through different viewpoints</p>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>My Culture vs. ${destination} Culture</h4>
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <tr style="background: #667eea; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Aspect</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">My Culture</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">${destination}</th>
                        </tr>
                        ${['Greetings', 'Meal Times', 'Family Structure', 'Communication Style', 'Values'].map(aspect => `
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${aspect}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;"></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"></td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Walking in Someone Else's Shoes</h4>
                    <p style="margin: 10px 0;"><strong>If I lived here, my typical day would include:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>Challenges I might face:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>Things I would enjoy:</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Critical Thinking</h4>
                    <p style="margin: 10px 0;"><strong>What assumptions did I have before coming here?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>How have my views changed?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div class="journal-prompt" style="margin: 20px 0;">
                    <h4>Building Bridges</h4>
                    <p style="margin: 10px 0;"><strong>What can I learn from this culture to improve my own life?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <p style="margin: 10px 0;"><strong>How can I be a cultural ambassador when I return home?</strong></p>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                    <div style="border-bottom: 2px solid #999; margin: 5px 0; padding: 5px;"></div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 10px;">
                    <p><strong>Remember:</strong> Cultural differences are not better or worse - they're simply different. Every culture has wisdom to offer.</p>
                </div>
            </div>
        `;
    }
};
