const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');
const { CONSTANTS, PAYLOAD } = require('../util/constants');
const _ = require('lodash');

exports.createDoubt = async (payload, user) => {
    try {
        let doubtInfo = _.cloneDeep(payload);
        let conversations = doubtInfo.conversations;

        let nextMessage = _.cloneDeep(CONSTANTS.waitForTeacher);
        nextMessage.to = user;
        conversations.push(nextMessage);
        delete doubtInfo.conversations;

        let doubt = await Doubt.create(doubtInfo);
        for (let i = 0; i < conversations.length; i++) {
            conversations[i].for = doubt._id
            Conversation.create(conversations[i]);
        }

        nextMessage.for = doubt._id;

        return { message: [nextMessage], type: 'doubt', doubtId: doubt._id, handleSocketNext: true };
    } catch (e) {
        console.log(e);
    }
}

exports.respondDoubt = async (payload, teacher) => {
    try {
        //let record = 
        await Doubt.findByIdAndUpdate(
            payload.doubtId,
            { isAssigned: true, assignedTo: payload.teacherId, $push: { teacherIds: teacher } },
            //   { new: true }
        );

        let nextMessage = _.cloneDeep(CONSTANTS.connectedToATeacher);
        nextMessage.to = payload.user;

        return { message: [nextMessage], type: 'doubt', doubtId: payload.doubtId, handleSocketNext: true, teacherId: teacher };
    } catch (e) {
        console.log(e);
    }
}




// exports.respondDoubt = async (payload) => {
//     try {
//         let record = await Doubt.findByIdAndUpdate(
//             payload.doubtId,
//             { isReported: true, reportReason: 'abuse', reportedAt: new Date().getTime() },
//             { new: true }
//         );
//         return record;
//     } catch (e) {
//         console.log(e);
//     }
// }



// 1. message sent socket teacher and user
// 2. do you want a different teacher ( it will come when teacher sends a close doubt request).
// 3. teacher responded(ready to answer) to a doubt.
// 4. delete message
// 5. request to close this doubt.
// 6. report this doubt