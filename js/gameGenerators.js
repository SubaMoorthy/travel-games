// Game generation functions
const GameGenerators = {
    
    // Ages 2-4 Games
    generateStoryBook(destination, tripType) {
        const createStoryPage = (text, emoji) => `
            <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #667eea; border-radius: 15px; margin-bottom: 20px; min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div style="font-size: 120px; margin-bottom: 20px; text-align: center;">${emoji}</div>
                <p style="font-size: 1.8em; text-align: center; line-height: 1.6; color: #333; font-weight: 500;">${text}</p>
            </div>
        `;
        
        const stories = {
            city: [
                { text: `My Big ${destination} Adventure!`, emoji: '🌆' },
                { text: `I went on a trip to ${destination}.`, emoji: '✈️' },
                { text: 'I saw tall buildings touching the sky!', emoji: '🏢' },
                { text: 'Cars and buses went zoom, zoom, zoom!', emoji: '🚕' },
                { text: 'I ate yummy food at a restaurant.', emoji: '🍕' },
                { text: 'There were so many people everywhere!', emoji: '👨‍👩‍👧‍👦' },
                { text: 'I heard city sounds - beep! beep!', emoji: '🚦' },
                { text: 'At night, the lights were so bright!', emoji: '✨' },
                { text: 'I had the best day ever!', emoji: '😊' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ],
            beach: [
                { text: `My ${destination} Beach Day!`, emoji: '🏖️' },
                { text: `I went to the beach at ${destination}.`, emoji: '🌊' },
                { text: 'The sand was warm and soft!', emoji: '🏝️' },
                { text: 'I found pretty seashells.', emoji: '🐚' },
                { text: 'The water went splash, splash, splash!', emoji: '💦' },
                { text: 'I built a big sandcastle!', emoji: '🏰' },
                { text: 'Seagulls flew in the sky!', emoji: '🕊️' },
                { text: 'The sun was warm and bright!', emoji: '☀️' },
                { text: 'I love the beach so much!', emoji: '😃' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ],
            mountains: [
                { text: `My ${destination} Mountain Adventure!`, emoji: '🏔️' },
                { text: `I went to the mountains at ${destination}.`, emoji: '⛰️' },
                { text: 'The mountains were so tall!', emoji: '🗻' },
                { text: 'I saw tall pine trees everywhere!', emoji: '🌲' },
                { text: 'Little birds sang tweet, tweet!', emoji: '🐦' },
                { text: 'I found a babbling brook!', emoji: '💧' },
                { text: 'A deer peeked out to say hello!', emoji: '🦌' },
                { text: 'The air smelled so fresh and clean!', emoji: '🍃' },
                { text: 'Mountains are magical!', emoji: '✨' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ],
            'theme-park': [
                { text: `My ${destination} Fun Day!`, emoji: '🎢' },
                { text: `I went to ${destination} today!`, emoji: '🎉' },
                { text: 'There were rides that go round and round!', emoji: '🎠' },
                { text: 'I saw colorful balloons everywhere!', emoji: '🎈' },
                { text: 'I ate sweet cotton candy!', emoji: '🍭' },
                { text: 'There was happy music playing!', emoji: '🎵' },
                { text: 'I met fun characters!', emoji: '🤡' },
                { text: 'Everything was so exciting!', emoji: '🎪' },
                { text: 'Best day ever!', emoji: '🎊' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ],
            'road-trip': [
                { text: `My ${destination} Road Trip!`, emoji: '🚗' },
                { text: `We drove in the car to ${destination}.`, emoji: '🛣️' },
                { text: 'I looked out the window!', emoji: '🪟' },
                { text: 'I saw cows in the fields! Moo!', emoji: '🐄' },
                { text: 'Big trucks went rumble, rumble!', emoji: '🚚' },
                { text: 'We stopped for snacks!', emoji: '🍪' },
                { text: 'The sun followed us all day!', emoji: '☀️' },
                { text: 'We sang songs in the car!', emoji: '🎶' },
                { text: 'Road trips are so fun!', emoji: '😄' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ],
            international: [
                { text: `My Trip to ${destination}!`, emoji: '✈️' },
                { text: `I went on an airplane to ${destination}!`, emoji: '🛫' },
                { text: 'Everything looked different!', emoji: '🌍' },
                { text: 'I heard new words!', emoji: '🗣️' },
                { text: 'I tried new yummy food!', emoji: '🍜' },
                { text: 'I saw interesting buildings!', emoji: '🏛️' },
                { text: 'The people were so nice!', emoji: '👋' },
                { text: 'I learned so many new things!', emoji: '📚' },
                { text: 'The world is amazing!', emoji: '🌈' },
                { text: 'The End! ❤️', emoji: '🌟' }
            ]
        };
        
        const selectedStory = stories[tripType] || stories.city;
        
        return `
            <div style="padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 2em;">📖 Story Time!</h2>
                    <p style="margin: 10px 0 0 0; font-size: 1.2em; opacity: 0.9;">A picture book about your ${destination} adventure</p>
                </div>
                
                ${selectedStory.map(page => createStoryPage(page.text, page.emoji)).join('')}
                
                <div style="page-break-after: always; padding: 30px; background: #fff9e6; border: 3px dashed #ffd700; border-radius: 15px; margin-top: 20px;">
                    <h3 style="text-align: center; color: #f57c00; margin-bottom: 20px;">🎨 Your Turn to Draw!</h3>
                    <p style="text-align: center; font-size: 1.2em; margin-bottom: 20px;">Draw your favorite part of the story!</p>
                    <div style="height: 400px; background: white; border: 3px solid #ffd700; border-radius: 10px; margin: 20px;"></div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 10px; text-align: center;">
                    <p style="font-size: 1.1em;">🌟 Great job reading! You can read this story again and again! 🌟</p>
                </div>
            </div>
        `;
    },
    
    // Ages 4-8 Reading Story Book
    generateReadingStoryBook(destination, tripType) {
        // This function will prompt for reading level and generate appropriate story
        return `
            <div style="padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0; font-size: 2em;">📚 My ${destination} Reading Adventure</h2>
                    <p style="margin: 10px 0 0 0; font-size: 1.1em; opacity: 0.9;">A story book just for you!</p>
                </div>
                
                <div style="background: #fff9e6; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 5px solid #ffd700;">
                    <h3 style="margin: 0 0 15px 0; color: #f57c00;">📖 Choose Your Reading Level:</h3>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <button onclick="showStory('beginner', '${destination}', '${tripType}')" style="padding: 15px 25px; background: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">🌱 Beginner Reader</button>
                        <button onclick="showStory('intermediate', '${destination}', '${tripType}')" style="padding: 15px 25px; background: #2196f3; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">📗 Intermediate Reader</button>
                        <button onclick="showStory('advanced', '${destination}', '${tripType}')" style="padding: 15px 25px; background: #9c27b0; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em; font-weight: bold;">🌟 Advanced Reader</button>
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
            function showStory(level, destination, tripType) {
                const stories = {
                    beginner: generateBeginnerStory(destination, tripType),
                    intermediate: generateIntermediateStory(destination, tripType),
                    advanced: generateAdvancedStory(destination, tripType)
                };
                document.getElementById('storyContent').innerHTML = stories[level];
                document.getElementById('storyContent').scrollIntoView({ behavior: 'smooth' });
            }
            
            function generateBeginnerStory(dest, type) {
                const beginnerStories = {
                    city: [
                        { ch: 1, title: 'We Go!', text: 'Today we go to ' + dest + '.\nI am so happy!\nMom packs my bag.\nDad gets the car.', emoji: '🚗' },
                        { ch: 2, title: 'We Are Here!', text: 'We are in ' + dest + '!\nI see big buildings.\nThey are very tall.\nWow!', emoji: '🏢' },
                        { ch: 3, title: 'So Many Cars!', text: 'I see many cars.\nBeep! Beep!\nThe cars go fast.\nRed, blue, yellow cars!', emoji: '🚕' },
                        { ch: 4, title: 'Yummy Food!', text: 'We eat lunch.\nThe food is yummy!\nI eat it all up.\nMy tummy is happy!', emoji: '🍕' },
                        { ch: 5, title: 'Fun Time!', text: 'We walk and walk.\nI see new things!\nThis is so fun!\nI like ' + dest + '!', emoji: '🎉' },
                        { ch: 6, title: 'Bed Time', text: 'Now it is night.\nI am sleepy.\nI had the best day!\nGood night!', emoji: '😴' }
                    ],
                    beach: [
                        { ch: 1, title: 'Beach Day!', text: 'We go to the beach!\nI bring my bucket.\nI bring my shovel.\nLet\'s go!', emoji: '🏖️' },
                        { ch: 2, title: 'Sand!', text: 'The sand is soft.\nIt feels nice.\nI dig and dig.\nI make a big hole!', emoji: '🏝️' },
                        { ch: 3, title: 'Water Fun', text: 'The water is cool!\nSplash! Splash!\nThe waves are big.\nThis is fun!', emoji: '🌊' },
                        { ch: 4, title: 'Sandcastle', text: 'I build a castle.\nIt is very tall!\nI put shells on top.\nLook at my castle!', emoji: '🏰' },
                        { ch: 5, title: 'Birds!', text: 'I see birds flying.\nThey say "CAW! CAW!"\nThey want my snack!\nSilly birds!', emoji: '🕊️' },
                        { ch: 6, title: 'Best Day', text: 'I love the beach!\nI am happy.\nI want to come back!\nThe End!', emoji: '😊' }
                    ]
                };
                const story = (beginnerStories[type] || beginnerStories.city);
                return story.map(page => `
                    <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #4caf50; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #4caf50; color: white; padding: 10px 20px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong>Chapter ${page.ch}: ${page.title}</strong>
                        </div>
                        <div style="font-size: 100px; text-align: center; margin: 20px 0;">${page.emoji}</div>
                        <p style="font-size: 1.6em; line-height: 2; text-align: center; color: #333; white-space: pre-line;">${page.text}</p>
                    </div>
                `).join('') + '<div style="margin-top: 30px; padding: 25px; background: #e8f5e9; border-radius: 10px; text-align: center;"><p style="font-size: 1.3em; margin: 0;">🌟 You did it! You read the whole book! 🌟</p></div>';
            }
            
            function generateIntermediateStory(dest, type) {
                const intermediateStories = {
                    city: [
                        { ch: 1, title: 'The Journey Begins', text: 'Emma was excited! Today she was going to visit ' + dest + ' with her family. She had never been to such a big city before. She packed her favorite stuffed bear and her camera. "I\'m going to take so many pictures!" she said.', emoji: '📸' },
                        { ch: 2, title: 'Amazing Buildings', text: 'When Emma arrived, she couldn\'t believe her eyes. The buildings were taller than she ever imagined! Some had glass windows that sparkled in the sun. "Those buildings touch the clouds!" Emma told her mom. She took her first picture.', emoji: '🏙️' },
                        { ch: 3, title: 'City Sounds', text: 'The city was loud and busy. Cars honked their horns. People talked and laughed. Music played from open windows. Emma had never heard so many sounds at once! It was different from her quiet town, but she liked it.', emoji: '🔊' },
                        { ch: 4, title: 'New Friends', text: 'At the park, Emma met a girl named Maya who lived in ' + dest + '. Maya showed Emma her favorite spot by the fountain. They fed the birds together. "You can visit me every time you come here!" Maya said with a smile.', emoji: '👭' },
                        { ch: 5, title: 'Special Lunch', text: 'For lunch, Emma tried food she had never eaten before. Her dad helped her read the menu. She chose something new and brave. When it arrived, it looked strange, but it smelled wonderful. She took a bite. "Delicious!" she exclaimed.', emoji: '🍜' },
                        { ch: 6, title: 'Night Lights', text: 'As the sun set, something magical happened. Lights turned on all over the city! Buildings glowed. Street lamps twinkled. Emma watched from her hotel window. "  ' + dest + ' is beautiful at night," she whispered.', emoji: '✨' },
                        { ch: 7, title: 'Going Home', text: 'The next day, it was time to go home. Emma felt sad to leave but happy about her adventure. She had so many photos and memories. "Can we come back soon?" she asked. Her parents smiled and said, "Of course!" The End.', emoji: '🏡' }
                    ],
                    beach: [
                        { ch: 1, title: 'Beach Vacation!', text: 'Liam had been waiting all year for this trip to the beach at ' + dest + '. He loved the ocean more than anything. The car ride seemed to take forever! Finally, he saw a sign: "Beach - 1 Mile." His heart started beating fast with excitement.', emoji: '🎊' },
                        { ch: 2, title: 'First View', text: 'When Liam saw the ocean, he stopped and stared. The water went on forever! It was bluer than the sky. White waves rolled onto the sand. Seagulls flew overhead. "It\'s more amazing than I remembered!" he shouted.', emoji: '🌊' },
                        { ch: 3, title: 'Shell Hunt', text: 'Liam walked along the beach, looking for shells. He found spiral ones, pink ones, and even a perfect sand dollar! Each shell was like a tiny treasure. He filled his bucket carefully. These would be perfect memories to take home.', emoji: '🐚' },
                        { ch: 4, title: 'Sandcastle Contest', text: 'Liam entered a sandcastle building contest. He worked hard, patting sand and carving towers. He added a moat and a bridge. Other kids built castles too. When the judges came, Liam won a ribbon for "Most Creative!" He was so proud.', emoji: '🏆' },
                        { ch: 5, title: 'Ocean Swimming', text: 'The water felt cold at first, but soon Liam got used to it. He jumped over waves and floated on his back. A small fish swam by his feet! The ocean was full of life and wonder. He could swim here all day.', emoji: '🏊' },
                        { ch: 6, title: 'Sunset Magic', text: 'That evening, Liam\'s family watched the sunset from the beach. The sky turned orange, pink, and purple. The sun looked like a giant orange ball sinking into the water. "This is the most beautiful thing I\'ve ever seen," Liam said.', emoji: '🌅' },
                        { ch: 7, title: 'Beach Memories', text: 'On the last day, Liam took one more walk on the beach. He wanted to remember everything - the sound of waves, the feeling of sand, the salty smell. He knew he would come back to ' + dest + ' again someday. The End.', emoji: '💭' }
                    ]
                };
                const story = (intermediateStories[type] || intermediateStories.city);
                return story.map(page => `
                    <div style="page-break-after: always; padding: 30px; background: white; border: 3px solid #2196f3; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #2196f3; color: white; padding: 12px 24px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong style="font-size: 1.2em;">Chapter ${page.ch}: ${page.title}</strong>
                        </div>
                        <div style="font-size: 80px; text-align: center; margin: 20px 0;">${page.emoji}</div>
                        <p style="font-size: 1.3em; line-height: 1.8; color: #333; text-align: justify; text-indent: 30px;">${page.text}</p>
                    </div>
                `).join('') + '<div style="margin-top: 30px; padding: 25px; background: #e3f2fd; border-radius: 10px; text-align: center;"><p style="font-size: 1.3em; margin: 0;">📚 Excellent reading! You finished a chapter book! 📚</p></div>';
            }
            
            function generateAdvancedStory(dest, type) {
                const advancedStories = {
                    city: [
                        { ch: 1, title: 'An Unexpected Adventure', text: 'Sophia had always lived in a small town where everyone knew everyone. So when her parents announced they were spending a week in ' + dest + ', she felt both nervous and thrilled. She spent the night before packing and repacking her suitcase, wondering what adventures awaited her in the bustling city.', emoji: '🎒' },
                        { ch: 2, title: 'First Impressions', text: 'The moment Sophia stepped out of the train station, she was overwhelmed. Towers of glass and steel reached toward the clouds. Hundreds of people rushed past, each with their own destination. Street vendors called out, offering everything from hot pretzels to colorful scarves. The energy was electric, and Sophia felt her nervousness melt into curiosity.', emoji: '🌆' },
                        { ch: 3, title: 'Getting Lost... and Found', text: 'On the second day, something unexpected happened. While her parents were busy at a museum gift shop, Sophia wandered down a colorful alley filled with street art. When she turned around, she couldn\'t find her way back! Her heart pounded. Then she remembered her dad\'s advice: "Stay calm and ask for help." A friendly shopkeeper pointed her in the right direction, and soon she was reunited with her relieved parents.', emoji: '🗺️' },
                        { ch: 4, title: 'A World of Flavors', text: 'That evening, Sophia\'s family ate at a restaurant unlike any in her hometown. The menu featured foods from around the world. Sophia decided to be brave. She ordered something she couldn\'t even pronounce! When it arrived, the dish was colorful and aromatic. Taking her first bite, she discovered flavors she never knew existed - sweet, spicy, and savory all at once. "This is amazing!" she declared, already planning what to try next.', emoji: '🍽️' },
                        { ch: 5, title: 'The View from Above', text: 'Sophia\'s favorite moment came when they visited the observation deck of the tallest building in ' + dest + '. The elevator ride made her ears pop. When the doors opened, she gasped. The entire city spread below like a toy village. She could see parks, rivers, and roads stretching to the horizon. From up here, the busy city seemed peaceful. She felt like she was on top of the world.', emoji: '🏙️' },
                        { ch: 6, title: 'Making Connections', text: 'In the park, Sophia joined a group of kids playing soccer. At first, she felt shy, but soon she was laughing and running with her new friends. They came from all over the world - Japan, Brazil, Egypt, and more. Even though they spoke with different accents and had different customs, they all understood the language of play and friendship. Sophia exchanged contact information with a girl named Keiko, promising to stay in touch.', emoji: '⚽' },
                        { ch: 7, title: 'Changed Forever', text: 'On the train ride home, Sophia pressed her face against the window, watching ' + dest + ' disappear in the distance. She thought about everything she\'d experienced - the sights, sounds, tastes, and people. She realized that the world was much bigger and more wonderful than she\'d imagined. But most importantly, she\'d discovered something about herself: she was braver and more adventurous than she\'d ever known. This trip hadn\'t just shown her a new city; it had shown her new possibilities for her own life. The End.', emoji: '🌟' }
                    ],
                    beach: [
                        { ch: 1, title: 'The Letter', text: 'Marcus found the message in a bottle on his first morning at ' + dest + ' beach. The bottle was old, covered in barnacles, and sealed with wax. Inside was a hand-drawn map with strange symbols and a riddle: "Where land meets sea, beneath the crooked tree, a treasure waits for thee." Marcus\'s heart raced. A real treasure map! He had to find out if it was genuine.', emoji: '📜' },
                        { ch: 2, title: 'The Investigation Begins', text: 'Marcus studied the map carefully. It showed distinctive rock formations and landmarks along the beach. He recognized some of them from his morning walk! Armed with the map, his notebook, and his determination, he set out on his treasure hunt. The hot sand burned his feet, but Marcus barely noticed. Adventure was calling.', emoji: '🔍' },
                        { ch: 3, title: 'Unexpected Allies', text: 'At the tidal pools, Marcus met twins named Zoe and Max who were studying sea creatures for a school project. When they saw his map, their eyes lit up. "We know this beach better than anyone," Zoe said. "We can help!" The three of them formed a team. Max had a metal detector, Zoe knew all the hidden paths, and Marcus had the map. Together, they were unstoppable.', emoji: '👫' },
                        { ch: 4, title: 'False Leads and Persistence', text: 'Their first three attempts led nowhere. The "crooked tree" in the map could have been any of dozens of palm trees bent by the wind. They dug in several spots, finding only broken shells and driftwood. As the sun climbed higher and the day grew hotter, Max wanted to give up. But Marcus convinced them to try one more location - an old tree near the northern cliffs that he\'d seen earlier.', emoji: '🌴' },
                        { ch: 5, title: 'The Discovery', text: 'Max\'s metal detector beeped frantically near the tree\'s roots. The three friends dug carefully, their hands trembling with excitement. Six inches down, they hit something hard. It was a metal box, rusty but intact! Inside, they found old coins, a weathered journal, and photographs from fifty years ago. The "treasure" wasn\'t valuable in money, but it was priceless in history - it was a time capsule left by a child their age decades ago!', emoji: '💎' },
                        { ch: 6, title: 'Sharing the Story', text: 'The local newspaper wanted to write about their discovery! The museum asked if they would donate the time capsule so everyone could learn about life at ' + dest + ' beach in the past. Marcus, Zoe, and Max agreed, proud that their adventure would teach others. The child who had buried the capsule - now a grandmother - even came to meet them, tears in her eyes, amazed her childhood treasure had been found.', emoji: '📰' },
                        { ch: 7, title: 'The Real Treasure', text: 'As the week ended, Marcus realized the real treasure wasn\'t what they\'d found in the box. It was the adventure itself, the problem-solving, and the friendship he\'d formed with Zoe and Max. They\'d promised to meet at the same beach every summer. Looking out at the ocean one last time, Marcus smiled. He\'d come to the beach expecting a simple vacation. Instead, he\'d found a mystery, solved it with friends, and created memories that would last forever. Some treasures, he now knew, couldn\'t be held in your hands - they had to be held in your heart. The End.', emoji: '❤️' }
                    ]
                };
                const story = (advancedStories[type] || advancedStories.city);
                return story.map(page => `
                    <div style="page-break-after: always; padding: 35px; background: white; border: 3px solid #9c27b0; border-radius: 15px; margin-bottom: 20px;">
                        <div style="background: #9c27b0; color: white; padding: 14px 28px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                            <strong style="font-size: 1.3em;">Chapter ${page.ch}</strong>
                        </div>
                        <h3 style="color: #9c27b0; margin: 15px 0; font-size: 1.6em;">${page.title}</h3>
                        <div style="font-size: 60px; text-align: center; margin: 20px 0;">${page.emoji}</div>
                        <p style="font-size: 1.2em; line-height: 1.9; color: #333; text-align: justify; text-indent: 40px;">${page.text}</p>
                    </div>
                `).join('') + '<div style="margin-top: 30px; padding: 25px; background: #f3e5f5; border-radius: 10px; text-align: center;"><h3 style="color: #9c27b0; margin: 0 0 10px 0;">🎉 Congratulations! 🎉</h3><p style="font-size: 1.2em; margin: 0;">You completed an advanced chapter book! You\'re an amazing reader!</p></div>';
            }
            </script>
        `;
    },
    
    generateSearchFind(destination, tripType) {
        const items = {
            city: ['🏢 Building', '🚕 Taxi', '🚦 Traffic Light', '🌳 Tree', '👮 Police Officer'],
            beach: ['🐚 Seashell', '⭐ Starfish', '🦀 Crab', '🏖️ Beach Ball', '☀️ Sun'],
            mountains: ['🌲 Pine Tree', '🦌 Deer', '🏔️ Mountain Peak', '🦅 Eagle', '⛺ Tent'],
            'theme-park': ['🎢 Roller Coaster', '🎠 Carousel', '🎈 Balloon', '🍦 Ice Cream', '🎪 Tent'],
            'road-trip': ['🚗 Car', '⛽ Gas Station', '🌉 Bridge', '🐄 Cow', '🛣️ Road Sign'],
            international: ['✈️ Airplane', '🗼 Tower', '🏛️ Monument', '🍜 Food', '🎭 Culture']
        };
        
        const searchItems = items[tripType] || items.city;
        
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
    
    generateColoringPage(destination, tripType) {
        return `
            <div class="coloring-page">
                <h3>Color Your ${destination} Adventure!</h3>
                <div class="coloring-outline">
                    <div style="font-size: 120px; text-align: center; filter: grayscale(100%) opacity(30%);">
                        ${tripType === 'beach' ? '🏖️' : tripType === 'mountains' ? '🏔️' : tripType === 'theme-park' ? '🎢' : '🏙️'}
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
    
    generateCountingGame(destination, tripType) {
        const objects = {
            city: '🏢',
            beach: '🐚',
            mountains: '🌲',
            'theme-park': '🎈',
            'road-trip': '🚗',
            international: '✈️'
        };
        
        const obj = objects[tripType] || '⭐';
        
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
    generateBingo(destination, tripType) {
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
        
        const items = itemSets[tripType] || itemSets.city;
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
    
    generateGuessIn10(destination, tripType) {
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
        
        const riddles = riddleSets[tripType] || riddleSets.city;
        
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
    
    generatePictionary(destination, tripType) {
        const wordSets = {
            city: ['Skyscraper', 'Taxi', 'Subway', 'Park', 'Restaurant', 'Museum', 'Traffic Jam', 'Street Performer', 'Coffee Shop', 'Fire Truck', 'Statue', 'Bridge', 'Fountain', 'Sidewalk', 'Billboard'],
            beach: ['Sandcastle', 'Surfboard', 'Seashell', 'Waves', 'Seagull', 'Beach Ball', 'Sunscreen', 'Pier', 'Lifeguard', 'Palm Tree', 'Flip Flops', 'Sand Bucket', 'Volleyball', 'Sailboat', 'Starfish'],
            mountains: ['Mountain Peak', 'Hiking Trail', 'Backpack', 'Tent', 'Campfire', 'Pine Tree', 'Deer', 'Stream', 'Compass', 'Binoculars', 'Waterfall', 'Cabin', 'Sleeping Bag', 'S\'mores', 'Trail Sign'],
            'theme-park': ['Roller Coaster', 'Carousel', 'Cotton Candy', 'Ferris Wheel', 'Mascot', 'Popcorn', 'Ticket', 'Fireworks', 'Parade', 'Balloon', 'Ice Cream', 'Game Booth', 'Face Paint', 'Souvenir', 'Map']
        };
        
        const words = wordSets[tripType] || wordSets.city;
        
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
    generateScavengerHunt(destination, tripType) {
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
        
        const items = challenges[tripType] || challenges.city;
        
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
    
    generateCrossword(destination, tripType) {
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
    
    generateTrivia(destination, tripType) {
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
    generatePhotoChallenge(destination, tripType) {
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
