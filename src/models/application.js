const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'On Hold'],
        default: 'Applied',
    },
    notes: {
        type: String,
        default: '',
    },
    appliedDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
