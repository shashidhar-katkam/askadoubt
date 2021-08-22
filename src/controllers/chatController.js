const Doubt = require('./../models/doubtModel');
const ConversationController = require('./conversationController');
const { CONSTANTS, PAYLOAD } = require('../util/constants');

const _ = require('lodash');


exports.chatWithBOT = async (payload) => {

    //  const user = JSON.parse(JSON.stringify(req.user, null, '\t'));
    try {
        //  let conversations = [];

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

exports.requestToCloseConversation = async (payload) => {
    try {
        await ConversationController.saveConversation(CONSTANTS.areYouHappy);
        await ConversationController.saveConversation(CONSTANTS.rating);

        let closeRequestSend = _.cloneDeep(CONSTANTS.closeRequestSend);
        closeRequestSend.from = payload.from;

        return {
            student: { messsage: [CONSTANTS.areYouHappy, CONSTANTS.rating], type: 'doubt', doubtId: payload._id },
            teacher: { messsage: [closeRequestSend], type: 'doubt', doubtId: payload._id },
        }

    } catch (ex) {
        console.error(ex)
    }

}