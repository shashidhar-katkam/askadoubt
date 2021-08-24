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

exports.requestToCloseConversation = async (payload, teacher) => {
    try {
        let areYouHappy = _.cloneDeep(CONSTANTS.areYouHappy);
        areYouHappy.for = payload.doubtId;
        areYouHappy.to = payload.to;

        await ConversationController.saveConversation(areYouHappy);

        let areYouSatisfied = _.cloneDeep(CONSTANTS.areYouSatisfied);
        areYouSatisfied.for = payload.doubtId;
        areYouSatisfied.to = payload.to;

        await ConversationController.saveConversation(areYouSatisfied);



        // for teacher....
        let closeRequestSend = _.cloneDeep(CONSTANTS.closeRequestSend);
        closeRequestSend.to = payload.teacher;

        return {
            student: { message: [areYouHappy, areYouSatisfied], type: 'doubt', doubtId: payload.doubtId, handleSocketNext: true },
            teacher: { message: [closeRequestSend], type: 'doubt', doubtId: payload.doubtId },
        }

    } catch (ex) {
        console.error(ex)
    }

}