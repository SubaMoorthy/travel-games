# Testing Dynamic Content Features

## Quick Test Guide

### 1. Open the App
Open `index.html` in your browser (any modern browser - Chrome, Firefox, Edge, Safari)

### 2. Test Destinations

Try these destinations to see dynamic content in action:

#### National Parks (Best for NPS integration)
- **Yellowstone National Park**
  - Should fetch: NPS park info, geothermal features
  - Story will recognize: **Geothermal** environment (geysers, hot springs, steam)
  - Expect: Geysers erupting, hot springs bubbling, colorful minerals, steam vents, sulfur smell
  
- **Mount Rainier National Park** 
  - Should fetch: NPS info, Wikipedia about stratovolcano, glaciers
  - Story will recognize: **Glacial** environment (glaciers take priority over volcanic)
  - Expect: Snow-covered peak, glaciers, ice fields, mountain majesty (NOT hot springs!)
  
- **Grand Canyon**
  - Should fetch: NPS canyon info, geological features
  - Story will recognize: **Desert** environment
  - Expect: Dry landscape, vast canyons, below sea level areas, extreme heat

- **Yosemite**
  - Should fetch: NPS park details, wildlife info
  - Wikipedia: Rock formations, waterfalls

#### Cities (Best for Wikipedia integration)
- **Paris** - Type: City
  - Should fetch: Eiffel Tower, Louvre, history
  - Rich Wikipedia content about landmarks
  
- **New York** - Type: City
  - Should fetch: Buildings, cultural landmarks
  - Diverse facts about the city

- **Tokyo** - Type: City
  - Should fetch: Cultural info, landmarks
  - International destination facts

#### Beaches
- **Malibu Beach** - Type: Beach
  - Should fetch: Coastal information
  - California beach facts

#### Theme Parks
- **Legoland** - Type: Any
  - Should fetch: Wikipedia info about theme park, attractions, rides
  - Story will recognize: Theme park environment (rides, entertainment, attractions)
  - Expect: Rides, shows, characters, excitement, family entertainment
  
- **Disneyland** - Type: Any
  - Should fetch: Theme park information, iconic attractions
  - Story will recognize: Theme park environment
  - Expect: Magic, rides, characters, entertainment

### 3. Open Browser Console (F12)

Watch for console logs showing:
```
[ToolRegistry] Registered tool: fetch_wikipedia
[ToolRegistry] Registered tool: fetch_nps
[ContentFetcher] Fetching content for: Yellowstone (mountains)
[WikipediaFetchTool] Fetching content for: Yellowstone
[NPSFetchTool] Fetching NPS content for: Yellowstone
[WikipediaFetchTool] Successfully fetched: Yellowstone National Park
[NPSFetchTool] Found 1 parks
[ContentFetcher] Fetched content from: Wikipedia, National Park Service
```

### 4. Generate a Story

1. Select age group: **Ages 2-4** or **Ages 4-8**
2. Enter destination (try one from above)
3. Select appropriate trip type
4. Click "Generate Games!"
5. Choose "Story Book" or "Reading Story Book"

### 5. Verify Contextual Accuracy

Look for:
- ✅ **Natural integration**: Facts woven into the story, not just listed
- ✅ **Character-driven narrative**: Emma and Sophia discover landmarks through adventure
- ✅ **Environmental awareness**: Stories adapt to ACTUAL environment, not just trip type
- ✅ **Location-appropriate details**: Desert stories mention heat/dryness, NOT pine trees!
- ✅ **Fun storytelling**: Stories remain engaging and age-appropriate
- ✅ **Real activities**: Fetched activities become part of what characters try
- ✅ "✨ Powered by real facts from Wikipedia & NPS" badge

**Example for Death Valley (Type: Mountains):**
- Story recognizes it's actually a DESERT, not typical mountains
- Mentions: Dry, hot, vast, below sea level, sand and rock (NOT pine trees!)

**Example for Mt. Rainier:**
- Story recognizes it's a **GLACIAL MOUNTAIN**, not just a volcano
- Mentions: Glaciers, snow, ice fields, mountain peak (NOT hot springs or geysers!)

**Example for Yellowstone:**
- Story recognizes it's **GEOTHERMAL** (volcanic with active features)  
- Mentions: Geysers, hot springs, steam, colorful minerals

### 6. Environment Detection Priorities

The system now distinguishes between similar environments:

1. **Geothermal** (Yellowstone) = Active volcanic features with hot springs, geysers, steam
2. **Glacial** (Mt. Rainier, Alaska) = Snow, ice, glaciers (takes priority even if volcanic origin)
3. **Volcanic** (dormant/extinct volcanoes) = Volcanic mountain without active geothermal features
4. **Desert** (Death Valley, Mojave) = Hot, dry, vast, below sea level
5. **Theme Park** (Legoland, Disneyland) = Rides, attractions, entertainment

This ensures stories are contextually accurate to what Wikipedia actually says!
- Emma experiences extreme heat, wide open landscapes, desert adaptations

**Example for Yellowstone (Type: Mountains):**
- Story recognizes VOLCANIC/GEOTHERMAL environment
- Mentions: Geysers, hot springs, steam, colorful minerals (NOT just pine trees!)
- Emma witnesses Earth's geothermal power, learns about volcanic activity

**Example for Sequoia (Type: Mountains):**
- Story recognizes FOREST environment
- Mentions: Giant trees, forest smells, woodland creatures
- Emma experiences actual mountain forest characteristics

The stories should feel like **adventures that happen to be educational**, not textbooks that happen to have characters!

### 6. Test Caching

1. Generate a story for "Yellowstone"
2. Check console - should see "Fetching content"
3. Generate another game for "Yellowstone"
4. Check console - should see "Cache hit"

### Example Expected Output

For **Yellowstone National Park + Story Book**:

```
Page 1: My Big Yellowstone National Park Adventure!
Page 2: I went on a trip to Yellowstone National Park.
Page 3: [Real Wikipedia fact about Yellowstone]
Page 4: [Landmark or nature info from NPS]
...
```

## Troubleshooting

### No Dynamic Content?
- Check console for errors
- Try a well-known destination like "Paris" or "Yellowstone"
- Check network tab (F12) for failed API calls

### CORS Errors?
- Wikipedia API should work (has CORS enabled)
- NPS API should work with demo key
- If issues persist, open index.html directly (not through file:// protocol)

### Fallback Content?
If you see generic content, it means:
- Destination wasn't found in Wikipedia/NPS
- API calls failed
- Network is offline
- This is expected behavior - app provides good fallback stories

## Advanced Testing

### Test the Tool Registry
Open browser console and run:

```javascript
// List available tools
ToolRegistry.listTools()
// Should return: ["fetch_wikipedia", "fetch_nps"]

// Test Wikipedia tool directly
await ToolRegistry.invokeTool('fetch_wikipedia', { destination: 'Paris' })

// Test NPS tool directly
await ToolRegistry.invokeTool('fetch_nps', { destination: 'Yellowstone', tripType: 'mountains' })

// Check cache
ContentFetcher.cache
```

### Clear Cache
```javascript
ContentFetcher.cache.clear()
```

## Performance Expectations

- Initial fetch: 1-3 seconds (parallel API calls)
- Cached fetch: Instant
- Story generation: Immediate after content fetched
- Page load: Fast (no dependencies)

## Success Criteria

✅ Stories include real destination facts
✅ National parks show NPS data
✅ Cities show Wikipedia landmarks
✅ Content is age-appropriate (simplified for younger kids)
✅ Fallback works when no data available
✅ Caching improves performance
✅ Console shows tool invocation logs
