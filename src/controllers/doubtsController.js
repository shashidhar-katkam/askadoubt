const Doubt = require('./../models/doubtModel');
const Conversation = require('./../models/conversationModel');


exports.createDoubt = async (doubtInfo) => {
    let conversations = doubtInfo.conversations;
    delete doubtInfo.conversations;

    let doubt = await Doubt.create(doubtInfo);
    conversations.forEach((c) => {
        c.for = doubt._id;
        Conversation.create(c);
    });

    console.log(doubt);
    return doubt;
}



// 1. Create a discussion API
// 2. BOT chatting API until it handle to teacher.
// 3. GET all discussion APIs with unseen message count. 
// 4. 