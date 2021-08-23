const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');

const _ = require('lodash');

exports.saveConversation = async (payload) => {
    let c = await Conversation.create(payload);


    //    if (payload.)


    return { message: [c], type: 'doubt', doubtId: payload.for };
}


exports.deleteConversation = async (payload) => {
    await Conversation.findByIdAndDelete(payload.conversationId);
    return { conversationId: payload.conversationId, type: 'deleteconversation', doubtId: doubt._id };
}

exports.chatWithBOT = async (payload) => {
    let requestBody = req.body;
    let handleSocketNext = false;
    const user = JSON.parse(JSON.stringify(req.user, null, '\t'));
    try {
        let conversations = [];

        if (requestBody && requestBody.length) {
            for (let i = requestBody.length - 2; i > 0; i--) {
                if (requestBody[i].type == 'text') {
                    if (requestBody[i].content == CONSTANTS.txtSelectSubject) {
                        conversations.push({
                            type: 'text',
                            content: CONSTANTS.txtTypeChapter,
                            currentRequest: CHAT_EVENTS.typeAChapter,
                            from: CONSTANTS.BOT_ID,
                            to: user._id,
                            direction: 2,
                            seen: true
                        });
                    } else if (requestBody[i].content == CONSTANTS.txtTypeChapter) {
                        conversations.push({
                            type: 'text',
                            content: CONSTANTS.txtTypeChapter,
                            currentRequest: CHAT_EVENTS.typeAChapter,
                            from: CONSTANTS.BOT_ID,
                            to: user._id,
                            direction: 2,
                            seen: true
                        });

                        handleSocketNext = true;
                    }
                    break;
                }
            }
        }


    } catch (ex) {
        console.error(ex)
    }

}