# Travel Games Generator

An interactive web application that generates age-appropriate travel games and activities for children based on their age group and destination.

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
│   ├── app.js            # Main application logic
│   └── gameGenerators.js # Game generation functions
└── README.md             # This file
```

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
