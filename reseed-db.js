import fs from 'fs';
import path from 'path';

// Define the path to the db.json file
const dbPath = path.join(path.resolve(), 'db.json');

const data = {
  "users": [
    {
      "password": "passwordEasy",
      "id": "1",
      "firstName": "Jon",
      "lastName": "Higger",
      "email": "jonhigger@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "2",
      "firstName": "Clinton",
      "lastName": "Williams",
      "email": "clintonwilliams@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "3",
      "firstName": "Beth",
      "lastName": "Williams",
      "email": "bethwilliams@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "4",
      "firstName": "Devin",
      "lastName": "Williams",
      "email": "devinwilliams@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "5",
      "firstName": "Kevin",
      "lastName": "Williams",
      "email": "kevinwilliams@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "6",
      "firstName": "Chris",
      "lastName": "Lovelady",
      "email": "chrislovelady@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "7",
      "firstName": "Amy",
      "lastName": "Lovelady",
      "email": "amylovelady@example.com"
    },
    {
      "password": "passwordEasy",
      "id": "8",
      "firstName": "Bonnie",
      "lastName": "Clark",
      "email": "bonnieclark@example.com"
    },
    {
      "firstName": "Rex",
      "lastName": "Luther",
      "email": "rexluther@example.com",
      "password": "passwordEasy",
      "id": "9"
    }
  ],
  "memes": [
    {
      "id": "1",
      "imageUrl": "/src/assets/images/biden-face.webp",
      "userId": "1"
    },
    {
      "id": "2",
      "imageUrl": "/src/assets/images/cat-man.webp",
      "userId": "2"
    },
    {
      "id": "3",
      "imageUrl": "/src/assets/images/dumbNdumber.webp",
      "userId": "3"
    },
    {
      "id": "4",
      "imageUrl": "/src/assets/images/dumbndumberyelling.webp",
      "userId": "4"
    },
    {
      "id": "5",
      "imageUrl": "/src/assets/images/giant-alien.webp",
      "userId": "5"
    },
    {
      "id": "6",
      "imageUrl": "/src/assets/images/luka-gobert.webp",
      "userId": "6"
    },
    {
      "id": "7",
      "imageUrl": "/src/assets/images/monaco.webp",
      "userId": "7"
    },
    {
      "id": "8",
      "imageUrl": "/src/assets/images/soccer.webp",
      "userId": "8"
    },
    {
      "id": "9",
      "imageUrl": "/src/assets/images/southparkgenderbender.webp",
      "userId": "9"
    },
    {
      "id": "10",
      "imageUrl": "/src/assets/images/tornado.webp",
      "userId": "1"
    },
    {
      "id": "11",
      "imageUrl": "/src/assets/images/xeno-ripley.webp",
      "userId": "2"
    }
  ],
  "quotes": [
    {
      "id": "1",
      "memeId": "1",
      "text": "About to say something dumb in 4...3..2..1..",
      "userId": "2"
    },
    {
      "id": "2",
      "memeId": "1",
      "text": "My rap name is Fresh Diaper!",
      "userId": "3"
    },
    {
      "id": "3",
      "memeId": "1",
      "text": "Let's go Brandon!",
      "userId": "5"
    },
    {
      "id": "4",
      "memeId": "2",
      "text": "Just another day of trying to take over the world!",
      "userId": "2"
    },
    {
      "id": "5",
      "memeId": "2",
      "text": "Realizing your take too many naps during the day.",
      "userId": "6"
    },
    {
      "id": "6",
      "memeId": "3",
      "text": "When it takes too long to get the joke.",
      "userId": "1"
    },
    {
      "id": "7",
      "memeId": "3",
      "text": "That one friend who’s always overdramatic.",
      "userId": "5"
    },
    {
      "id": "8",
      "memeId": "4",
      "text": "Yelling at kids to get off my lawn!",
      "userId": "2"
    },
    {
      "id": "9",
      "memeId": "5",
      "text": "When you see your ex at the party.",
      "userId": "3"
    },
    {
      "id": "10",
      "memeId": "6",
      "text": "That awkward moment when you wear the same outfit.",
      "userId": "7"
    },
    {
      "id": "11",
      "memeId": "7",
      "text": "Monaco? More like Mom-I-go!",
      "userId": "2"
    },
    {
      "id": "12",
      "memeId": "8",
      "text": "Missed the ball, but hit the meme jackpot.",
      "userId": "6"
    },
    {
      "id": "13",
      "memeId": "9",
      "text": "Why fit in when you were born to stand out?",
      "userId": "1"
    },
    {
      "id": "14",
      "memeId": "10",
      "text": "When your ex texts you: 'Let's get back together.'",
      "userId": "5"
    },
    {
      "id": "15",
      "memeId": "11",
      "text": "When the cat says its time to wake up.  You wake up.",
      "userId": "4"
    },
    {
      "id": "16",
      "memeId": "2",
      "text": "test quote",
      "userId": "5",
    },
    {
      "id": "17",
      "memeId": "2",
      "text": "the moment I wake up, before I put on my makeup",
      "userId": "3",
    },
    {
      "id": "18",
      "memeId": "3",
      "text": "Wedding Crashers 2",
      "userId": "3",     
    },
    {
      "id": "19",
      "memeId": "4",
      "text": "I told you to stop",
      "userId": "3",     
    },
    {
      "id": "20",
      "memeId": "8",
      "text": "Herbalife Foreverrr",
      "userId": "3",    
    }
  ],
  "likedQuotes": [
    {
      "id": "1",
      "userId": "1",
      "quoteId": "1",
      "memeId": "1"
    },
    {
      "id": "2",
      "userId": "2",
      "quoteId": "2",
      "memeId": "1"
    },
    {
      "id": "3",
      "userId": "3",
      "quoteId": "3",
      "memeId": "1"
    },
    {
      "id": "4",
      "userId": "4",
      "quoteId": "5",
      "memeId": "2"
    },
    {
      "id": "5",
      "userId": "5",
      "quoteId": "6",
      "memeId": "2"
    },
    {
      "id": "6",
      "userId": "6",
      "quoteId": "7",
      "memeId": "2"
    },
    {
      "id": "7",
      "userId": "7",
      "quoteId": "8",
      "memeId": "3"
    },
    {
      "id": "a8",
      "userId": "8",
      "quoteId": "9",
      "memeId": "3"
    },
    {
      "id": "9",
      "userId": "1",
      "quoteId": "10",
      "memeId": "3"
    },
    {
      "id": "10",
      "userId": "2",
      "quoteId": "11",
      "memeId": "4"
    },
    {
      "id": "11",
      "userId": "3",
      "quoteId": "12",
      "memeId": "4"
    },
    {
      "id": "12",
      "userId": "4",
      "quoteId": "13",
      "memeId": "4"
    },
    {
      "id": "13",
      "userId": "5",
      "quoteId": "14",
      "memeId": "5"
    },
    {
      "id": "14",
      "userId": "6",
      "quoteId": "15",
      "memeId": "5"
    },
    {
      "id": "15",
      "userId": "7",
      "quoteId": "4",
      "memeId": "1"
    }
  ]
}

try {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Data seeded successfully!');
} catch (err) {
  console.error('Failed to seed data:', err);
}