import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import Visitor from './models/Visitor.js';
import Contact from './models/Contact.js';
import Application from './models/Application.js';
import Problem from './models/Problem.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/i2e_landing_page';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Routes

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get visitor count (and optional increment)
app.get('/api/visitors', async (req, res) => {
    try {
        const namespace = 'i2e-landing-page';
        let visitor = await Visitor.findOne({ namespace });

        if (!visitor) {
            visitor = new Visitor({ namespace, count: 0 });
            await visitor.save();
        }

        res.json({ value: visitor.count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Increment visitor count (Hit)
app.get('/api/visitors/hit', async (req, res) => {
    try {
        const namespace = 'i2e-landing-page';
        const visitor = await Visitor.findOneAndUpdate(
            { namespace },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        res.json({ value: visitor.count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Submit Application Form
app.post('/api/applications', async (req, res) => {
    try {
        const { name, email, phone, position, portfolioUrl, resumeUrl } = req.body;

        // Basic validation
        if (!name || !email || !phone || !position || !resumeUrl) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const newApplication = new Application({
            name,
            email,
            phone,
            position,
            portfolioUrl,
            resumeUrl
        });

        await newApplication.save();

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error while submitting application' });
    }
});

// --- Problem Statement Bank Routes ---

// Get all problems
app.get('/api/problems', async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new problem
app.post('/api/problems', async (req, res) => {
    try {
        const { title, description, department, createdBy } = req.body;

        if (!title || !description || !department) {
            return res.status(400).json({ message: 'Title, description, and department are required' });
        }

        const newProblem = new Problem({
            title,
            description,
            department,
            createdBy
        });

        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a solution to a problem
app.post('/api/problems/:id/solutions', async (req, res) => {
    try {
        const { link, submittedBy } = req.body;
        const { id } = req.params;

        if (!link) {
            return res.status(400).json({ message: 'Solution link is required' });
        }

        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        problem.solutions.push({
            link,
            submittedBy
        });

        await problem.save();
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
