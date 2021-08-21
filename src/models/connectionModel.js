const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A post must be posted by someone'],
        },
        isOnline: {
            type: Boolean,
            required: [true, 'Please provide a subject Id for your post'],
            default: false
        },
        connectionId: {
            type: String,
            required: [false, 'Please provide a board Id for your post'],
        }
    },
    { timestamps: true }
);

const Connection = mongoose.models.Connection || mongoose.model('Connection', connectionSchema);

module.exports = Connection;
