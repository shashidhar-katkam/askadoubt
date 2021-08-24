const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');
const { CHAT_EVENTS, CONSTANTS } = require('./../util/constants')
const _ = require('lodash');

exports.saveConversation = async (payload, reponseFor) => {

    let conversations = [];

    conversations.push(payload);

    if (reponseFor == CHAT_EVENTS.areYouSatisfied) {
        if (payload.content == 'Yes') {
            let ratingText = _.cloneDeep(CONSTANTS.ratingText);
            ratingText.for = payload.for;
            ratingText.to = payload.from;

            conversations.push(ratingText);

            let rating = _.cloneDeep(CONSTANTS.rating);
            rating.for = payload.for;
            rating.to = payload.from;

            conversations.push(rating);
        } else {
            let notSatisfiedReasonText = _.cloneDeep(CONSTANTS.notSatisfiedReasonText);
            notSatisfiedReasonText.for = payload.for;
            notSatisfiedReasonText.to = payload.from;

            conversations.push(notSatisfiedReasonText);

            let notSatisfiedReasons = _.cloneDeep(CONSTANTS.notSatisfiedReasons);
            notSatisfiedReasons.for = payload.for;
            notSatisfiedReasons.to = payload.from;

            conversations.push(notSatisfiedReasons);

        }
    } else if (reponseFor == CHAT_EVENTS.rating) {
        let thanksForRating = _.cloneDeep(CONSTANTS.thanksForRating);
        thanksForRating.for = payload.for;
        thanksForRating.to = payload.from;
        conversations.push(thanksForRating);

    } else if (reponseFor == CHAT_EVENTS.notSatisfiedReason) {
        let connectaNewTeacherText = _.cloneDeep(CONSTANTS.connectaNewTeacherText);
        connectaNewTeacherText.for = payload.for;
        connectaNewTeacherText.to = payload.from;

        conversations.push(connectaNewTeacherText);

        let connectaNewTeacher = _.cloneDeep(CONSTANTS.connectaNewTeacher);
        connectaNewTeacher.for = payload.for;
        connectaNewTeacher.to = payload.from;

        conversations.push(connectaNewTeacher);



    } else if (reponseFor == CHAT_EVENTS.connectaNewTeacher) {
        if (payload.content == 'Yes') {
            let waitForTeacher = _.cloneDeep(CONSTANTS.waitForTeacher);
            waitForTeacher.for = payload.for;
            waitForTeacher.to = payload.from;
            conversations.push(waitForTeacher);

            // need to add logic to move 
            // update doubt to reassign to teacher..
            await Doubt.findByIdAndUpdate(payload.for, {
                assignedTo: false,
                isSecondTeacher: true
            });






            
        } else {
            let waitForATeacher = _.cloneDeep(CONSTANTS.waitForATeacher);
            waitForATeacher.for = payload.for;
            waitForATeacher.to = payload.from;
            conversations.push(waitForATeacher);
        }
    }

    let savedConversations = [];
    for (let cIndex = 0; cIndex < conversations.length; cIndex++) {
        let conversation = await Conversation.create(payload);
        savedConversations.push(conversation);
    }

    return { message: savedConversations, type: 'doubt', doubtId: payload.for, handleSocketNext: true, };
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