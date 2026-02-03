import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
    namespace: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('Visitor', visitorSchema);
