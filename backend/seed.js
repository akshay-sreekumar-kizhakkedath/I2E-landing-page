import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import Visitor from './models/Visitor.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/i2e_landing_page';

const seedEvents = [
    {
        title: "Idea Pitch 2024",
        date: "March 15, 2024",
        desc: "Present your startup ideas to industry experts."
    },
    {
        title: "Startup Workshop",
        date: "April 10, 2024",
        desc: "Hands-on session on business model canvas."
    },
    {
        title: "Alumni Talk",
        date: "May 5, 2024",
        desc: "Insights from successful entrepreneurs."
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing events
        await Event.deleteMany({});
        console.log('Cleared existing events');

        // Insert new events
        await Event.insertMany(seedEvents);
        console.log('Seeded events');

        // Initialize visitor count if not exists
        const visitor = await Visitor.findOne({ namespace: 'i2e-landing-page' });
        if (!visitor) {
            await Visitor.create({ namespace: 'i2e-landing-page', count: 1024 });
            console.log('Initialized visitor count');
        }

        console.log('Seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
