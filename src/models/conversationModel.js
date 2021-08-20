const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema(
    {
        for: {
            type: mongoose.Schema.ObjectId,
            ref: 'Doubt',
            required: [true, 'A post must be posted by someone'],
        },

        type: {
            type: String,
            required: [true, 'Please provide a board Id for your post'],
        },
        content: {
            type: Object,
            required: [true, 'Please provide a class Id for your post'],
        },
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A post must be posted by someone'],
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [false, 'A post must be posted by someone'],
        },
        seen: {
            type: Boolean,
            required: [true, 'Please provide a subject Id for your post'],
        },
        direction: {
            type: Number,   // 1, 2
            //required: [true, 'Please provide a subject Id for your post'],
        }
    },
    { timestamps: true }
);

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
