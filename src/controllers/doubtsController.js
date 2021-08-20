const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');

const _ = require('lodash');

exports.createDoubt = async (payload) => {
    try {
        let doubtInfo = _.cloneDeep(payload);
        let conversations = doubtInfo.conversations;
        delete doubtInfo.conversations;

        let doubt = await Doubt.create(doubtInfo);
        for (let i = 0; i < conversations.length; i++) {
            conversations[i].for = doubt._id
            Conversation.create(conversations[i]);
        }
        return doubt;
    } catch (e) {
        console.log(e);
    }
}

exports.respondDoubt = async (payload) => {

    try {
        let record = await Doubt.findByIdAndUpdate(
            payload.doubtId,
            { isAssigned: true, assignedTo: payload.teacherId },
            { new: true }
        );

        return record;

    } catch (e) {
        console.log(e);
    }
}

exports.respondDoubt = async (payload) => {
    try {
        let record = await Doubt.findByIdAndUpdate(
            payload.doubtId,
            { isReported: true, reportReason: 'abuse', reportedAt: new Date().getTime() },
            { new: true }
        );

        return record;
    } catch (e) {
        console.log(e);
    }
}



// 1. message sent socket teacher and user
// 2. do you want a different teacher ( it will come when teacher sends a close doubt request).
// 3. teacher responded(ready to answer) to a doubt.
// 4. delete message
// 5. request to close this doubt.
// 6. report this doubt