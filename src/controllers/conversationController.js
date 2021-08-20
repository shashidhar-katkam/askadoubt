const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');

const _ = require('lodash');

exports.saveConversation = async (payload) => {
    let c = await Conversation.create(payload);
    return c;
}


exports.deleteConversation = async (payload) => {
    await Conversation.findByIdAndDelete(payload.conversationId);
    return true;


}


