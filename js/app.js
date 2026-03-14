// Main application logic
const app = {
    destination: '',
    ageGroup: '',
    tripType: '',
    
    init() {
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => this.showGameSelection());
        document.getElementById('printBtn').addEventListener('click', () => window.print());
        document.getElementById('newGameBtn').addEventListener('click', () => this.showGameSelection());
    },
    
    showGameSelection() {
        this.destination = document.getElementById('destination').value.trim();
        this.ageGroup = document.getElementById('ageGroup').value;
        this.tripType = document.getElementById('tripType').value;
        
        if (!this.destination || !this.ageGroup) {
            alert('Please select an age group and enter a destination!');
            return;
        }
        
        const gamesList = document.getElementById('gamesList');
        const gameSelection = document.getElementById('gameSelection');
        const gameOutput = document.getElementById('gameOutput');
        
        gamesList.innerHTML = '';
        gameOutput.classList.add('hidden');
        
        document.getElementById('selectedAge').textContent = this.ageGroup;
        
        const games = this.getGamesForAge(this.ageGroup);
        
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="icon">${game.icon}</div>
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            `;
            card.addEventListener('click', () => this.generateGame(game.id));
            gamesList.appendChild(card);
        });
        
        gameSelection.classList.remove('hidden');
    },
    
    getGamesForAge(age) {
        const gamesByAge = {
            '2-4': [
                { id: 'story-book', name: 'Story Book', icon: '📖', description: 'Simple fill-in story' },
                { id: 'search-find', name: 'Search & Find', icon: '🔍', description: 'Find items in picture' },
                { id: 'coloring', name: 'Coloring Page', icon: '🎨', description: 'Simple coloring fun' },
                { id: 'counting', name: 'Counting Game', icon: '🔢', description: 'Count 1-5 objects' }
            ],
            '4-8': [
                { id: 'bingo', name: 'Travel Bingo', icon: '🎯', description: 'Spot items on your trip' },
                { id: 'guess-in-10', name: 'Guess in 10', icon: '❓', description: 'Riddle game' },
                { id: 'pictionary', name: 'Pictionary List', icon: '✏️', description: 'Drawing game words' },
                { id: 'comic-creation', name: 'Comic Creation', icon: '�', description: '3 templates: Blank, Starters, Storyboard' },
                { id: 'itinerary', name: 'Kids Itinerary', icon: '📅', description: 'Your daily plan' },
                { id: 'feelings-chart', name: 'Feelings Detective', icon: '🕵️', description: 'Understand & manage emotions' },
                { id: 'gratitude-journal', name: 'Gratitude Journal', icon: '🙏', description: 'What are you thankful for?' }
            ],
            '9-12': [
                { id: 'scavenger-hunt', name: 'Scavenger Hunt', icon: '🗺️', description: 'Photo challenges' },
                { id: 'crossword', name: 'Crossword Puzzle', icon: '📝', description: 'Test your knowledge' },
                { id: 'trivia', name: 'Trivia Quiz', icon: '🧠', description: 'Learn fun facts' },
                { id: 'mad-libs', name: 'Mad Libs', icon: '😄', description: 'Silly stories' },
                { id: 'journal-prompts', name: 'Travel Journal', icon: '📔', description: 'Reflection prompts' },
                { id: 'empathy-challenge', name: 'Empathy Challenge', icon: '❤️', description: 'Cultural understanding' }
            ],
            '13+': [
                { id: 'photo-challenge', name: 'Photo Challenge', icon: '📸', description: 'Creative photography' },
                { id: 'budget-game', name: 'Budget Planning', icon: '💰', description: 'Plan a day trip' },
                { id: 'culture-quiz', name: 'Culture Quiz', icon: '🌏', description: 'Deep dive quiz' },
                { id: 'language-cards', name: 'Language Cards', icon: '💬', description: 'Learn key phrases' },
                { id: 'mindful-journal', name: 'Mindful Journal', icon: '🧘', description: 'Self-reflection' },
                { id: 'perspective-taking', name: 'Perspective Taking', icon: '👁️', description: 'Cultural awareness' }
            ]
        };
        
        return gamesByAge[age] || [];
    },
    
    generateGame(gameId) {
        const gameTitle = document.getElementById('gameTitle');
        const gameContent = document.getElementById('gameContent');
        const gameOutput = document.getElementById('gameOutput');
        
        let content = '';
        let title = '';
        
        switch(gameId) {
            case 'bingo':
                title = `${this.destination} Travel Bingo`;
                content = GameGenerators.generateBingo(this.destination, this.tripType);
                break;
            case 'story-book':
                title = `My Trip to ${this.destination}`;
                content = GameGenerators.generateStoryBook(this.destination, this.tripType);
                break;
            case 'search-find':
                title = `Search & Find: ${this.destination}`;
                content = GameGenerators.generateSearchFind(this.destination, this.tripType);
                break;
            case 'coloring':
                title = `Color ${this.destination}`;
                content = GameGenerators.generateColoringPage(this.destination, this.tripType);
                break;
            case 'counting':
                title = `Count at ${this.destination}`;
                content = GameGenerators.generateCountingGame(this.destination, this.tripType);
                break;
            case 'guess-in-10':
                title = 'Guess in 10 Questions';
                content = GameGenerators.generateGuessIn10(this.destination, this.tripType);
                break;
            case 'pictionary':
                title = `${this.destination} Pictionary`;
                content = GameGenerators.generatePictionary(this.destination, this.tripType);
                break;
            case 'comic-creation':
                title = 'Create Your Travel Comic';
                content = GameGenerators.generateComicSheet(this.destination);
                break;
            case 'itinerary':
                title = `My ${this.destination} Adventure`;
                content = GameGenerators.generateKidsItinerary(this.destination);
                break;
            case 'feelings-chart':
                title = 'My Travel Feelings';
                content = GameGenerators.generateFeelingsChart();
                break;
            case 'gratitude-journal':
                title = 'Things I\'m Grateful For';
                content = GameGenerators.generateGratitudeJournal(this.destination);
                break;
            case 'scavenger-hunt':
                title = `${this.destination} Photo Scavenger Hunt`;
                content = GameGenerators.generateScavengerHunt(this.destination, this.tripType);
                break;
            case 'crossword':
                title = `${this.destination} Crossword`;
                content = GameGenerators.generateCrossword(this.destination, this.tripType);
                break;
            case 'trivia':
                title = `${this.destination} Trivia`;
                content = GameGenerators.generateTrivia(this.destination, this.tripType);
                break;
            case 'mad-libs':
                title = 'Travel Mad Libs';
                content = GameGenerators.generateMadLibs(this.destination);
                break;
            case 'journal-prompts':
                title = 'Travel Journal Prompts';
                content = GameGenerators.generateJournalPrompts(this.destination);
                break;
            case 'empathy-challenge':
                title = 'Empathy & Culture Challenge';
                content = GameGenerators.generateEmpathyChallenge(this.destination);
                break;
            case 'photo-challenge':
                title = `${this.destination} Photo Challenge`;
                content = GameGenerators.generatePhotoChallenge(this.destination, this.tripType);
                break;
            case 'budget-game':
                title = 'Budget Your Day';
                content = GameGenerators.generateBudgetGame(this.destination);
                break;
            case 'culture-quiz':
                title = `${this.destination} Culture Quiz`;
                content = GameGenerators.generateCultureQuiz(this.destination);
                break;
            case 'language-cards':
                title = `${this.destination} Language Cards`;
                content = GameGenerators.generateLanguageCards(this.destination);
                break;
            case 'mindful-journal':
                title = 'Mindful Travel Journal';
                content = GameGenerators.generateMindfulJournal(this.destination);
                break;
            case 'perspective-taking':
                title = 'Perspective Taking Exercise';
                content = GameGenerators.generatePerspectiveTaking(this.destination);
                break;
            default:
                title = 'Game';
                content = '<p>Game generator coming soon!</p>';
        }
        
        gameTitle.textContent = title;
        gameContent.innerHTML = content;
        gameOutput.classList.remove('hidden');
        gameOutput.scrollIntoView({ behavior: 'smooth' });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
