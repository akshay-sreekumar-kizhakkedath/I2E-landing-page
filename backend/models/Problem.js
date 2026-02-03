import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    createdBy: {
        name: String,
        email: String,
        uid: String
    },
    solutions: [{
        link: String,
        submittedBy: {
            name: String,
            email: String
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
