const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');
require('dotenv').config();

const User = require('./models/User');
const Event = require('./models/Event');

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    console.log('Cleared old data');

    // Create users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('secret123', salt);

    const users = [];

    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }

    console.log('Seeded users');

    // Create events
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const event = new Event({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentence(),
        userId: randomUser._id,
      });
      await event.save();
    }

    console.log('Seeded events');
    process.exit(0);
  } catch (err) {
    console.error('Seeder Error:', err);
    process.exit(1);
  }
};

seedDatabase();