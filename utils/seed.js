const connection = require('../config/connection');

const  User = require('../models/User');
const {
    getRandomName,
    getRandomEmail,
} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});


  // Empty array for randomly generated users 

  const users = [];

  for (let i = 0; i < 10; i++) {
    const name = getRandomName();
    const newUser = {
        username: name,
        email: getRandomEmail(),
    };
    users.push(newUser);
  }

  await User.collection.insertMany(users);
  
  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});

