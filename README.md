# Travel Games Generator

An interactive web application that generates age-appropriate travel games and activities for children based on their age group and destination. **Now featuring dynamic, real-world content from Wikipedia and National Park Service!**

## 🌟 New Features

### Dynamic Content Integration
Stories are now powered by **real facts** from:
- **Wikipedia** - Historical facts, landmarks, and general destination information
- **National Park Service (NPS)** - Nature information, activities, and park details

**✨ Stories are fun AND educational!** We don't just dump facts - we weave them naturally into engaging character-driven narratives. The stories use **smart environment analysis** to understand what the destination is REALLY like:
- **Desert environments** (Death Valley, Sahara): Hot, dry, vast landscapes, below sea level features
- **Volcanic areas** (Yellowstone, Iceland): Geysers, hot springs, geothermal activity
- **Forests** (Sequoia, Amazon): Giant trees, woodland creatures, forest ecosystems
- **Coastal regions** (Malibu, Great Barrier Reef): Beaches, tidal zones, marine life
- **Urban areas** (Paris, Tokyo): Architecture, culture, city life

Real landmarks appear as discoveries in the adventure. Historical details add depth to the experience. Location-specific activities become part of the fun. Every story adapts to the actual environment, not just generic trip types!

### MCP-Style Tool Architecture
The app uses a tool-based architecture inspired by the Model Context Protocol (MCP):
- **Tool Registry**: Modular system for registering and invoking content fetching tools
- **Wikipedia Fetch Tool**: Fetches and parses Wikipedia content
- **NPS Fetch Tool**: Fetches National Park Service data
- **Composable Design**: Easy to add new content sources as tools

### Smart Content Caching
- Caches fetched content to reduce API calls
- Improves performance for repeated destinations
- Logging system for debugging and monitoring

## Features

### Age Groups Supported
- **Ages 2-4** (Toddlers/Preschool): Story books, search & find, coloring pages, counting games
- **Ages 4-8** (Early Elementary): Bingo, riddles, pictionary, comics, itineraries, emotional intelligence activities
- **Ages 9-12** (Tweens): Scavenger hunts, crosswords, trivia, journals, empathy challenges
- **Ages 13+** (Teens): Photography challenges, budget games, culture quizzes, language learning, mindfulness journals

### Game Categories
- **Fun & Games**: Traditional travel entertainment
- **Emotional Intelligence**: Feelings charts, gratitude journals, empathy exercises
- **Educational**: Cultural learning, language practice, historical trivia
- **Creative**: comic creation, photography, journaling

### Trip Types
- City/Urban
- Beach
- Mountains
- Theme Park
- Road Trip
- International Travel

## How to Use

1. Open `index.html` in a web browser
2. Select the child's age group
3. Enter your destination
4. Choose your trip type
5. Click "Generate Games!"
6. Browse available games for that age group
7. Click on any game to generate a customized version
8. Print the game for on-the-go fun!

## Files Structure

```
travel-games-generator/
├── index.html              # Main HTML page
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── contentFetcher.js  # MCP-style tool system for dynamic content
│   ├── app.js             # Main application logic
│   └── gameGenerators.js  # Game generation functions
└── README.md              # This file
```

## How Dynamic Content Works

1. **User enters destination** (e.g., "Yellowstone", "Paris", "Grand Canyon")
2. **Tool Registry invokes tools** in parallel:
   - Wikipedia Fetch Tool searches and retrieves destination info
   - NPS Fetch Tool checks for national park data
3. **Content is parsed and categorized**:
   - Facts: General information
   - Landmarks: Notable places and structures
   - History: Historical context
   - Nature: Natural features (from NPS)
   - Activities: Things to do
4. **Stories are dynamically generated** using real facts adapted to reading level
5. **Results are cached** for performance

### Content Sources Badge
Stories now display: "✨ Powered by real facts from Wikipedia & NPS"

### Console Logging
Check browser console (F12) to see:
- Which tools are being invoked
- What content is fetched
- Cache hits/misses
- Any errors

## Development Notes

### Adding New Content Tools

The MCP-style architecture makes it easy to add new content sources:

```javascript
// Create a new tool
const MyCustomTool = {
    name: 'fetch_custom_api',
    description: 'Fetches content from custom API',
    
    async execute({ destination, query }) {
        // Your fetch logic here
        return { facts: [], landmarks: [], ... };
    }
};

// Register it
ToolRegistry.register('fetch_custom_api', MyCustomTool);

// Invoke it
await ToolRegistry.invokeTool('fetch_custom_api', { destination });
```

### NPS API Key
Currently using the demo API key. For production:
1. Get your free API key at https://www.nps.gov/subjects/developer/get-started.htm
2. Replace `const apiKey = 'demo';` in NPSFetchTool with your key

## Browser Compatibility

- Requires modern browser with ES6+ support
- Uses async/await for content fetching
- Fetch API for network requests
- No build step required - runs directly in browser

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript (ES6+)
- Print-friendly CSS

## Customization

To add new games:
1. Add the game to the appropriate age group in `app.js` (`getGamesForAge()`)
2. Create a generator function in `gameGenerators.js`
3. Add the case in `app.js` (`generateGame()`)

## Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

- PDF export functionality
- Save/load custom game sets
- Multi-language support
- More trip types and destinations
- Interactive digital versions of games
- User accounts to save favorite games

## License

Free to use for personal and educational purposes.

---

**Made with ❤️ for traveling families**
