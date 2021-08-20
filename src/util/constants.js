
exports.CONSTANTS = {
    MONGODB_CON_URL: 'mongodb+srv://macademyuser:Meluha123$@macademyfreecloudmongod.hzdx8.mongodb.net/discussboarddev',
    BOT_ID: "611f021feee24600094240b9",
    USER_ID: '6113e8414374b5000854f861',
    TEACHER_ID: '611f052a8c46320008c073c4'
}


// "_id": "611f021feee24600094240b9",
// "name": "BOT",

exports.PAYLOAD = {
    CREATE_DOUBT: {
        askedBy: this.CONSTANTS.USER_ID,
        boardId: "3bcb8873-7949-454e-911a-90008826c117",
        classId: "804d9416-e248-4ae7-a8dd-4c01859fe449",
        groupId: "45162249-a1f2-4689-9df6-ca633875bab2",
        subjectId: "3ae11665-aa66-4eb9-94de-1dd775f6cf32",
        subjectName: "Mathematics",
        doubt: 'What is my name ?',
        isUserOnline: true,
        userConnectionId: 'abcd',
        teacherConnectionId: null,
        conversations: [
            {
                type: 'text',
                content: 'Hi, Sathish G',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'Please select subject.',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'list',
                content: ['Physics', 'Chemistry', 'Mathmatics'],
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'Physics',
                from: this.CONSTANTS.USER_ID,
                to: this.CONSTANTS.BOT_ID,
                direction: 1,
                seen: false
            },
            {
                type: 'list',
                content: 'Please Type Chapter.',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'Physics',
                from: this.CONSTANTS.USER_ID,
                to: this.CONSTANTS.BOT_ID,
                direction: 1,
                seen: false
            },
            {
                type: 'text',
                content: 'Ask a doubt?',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'Which alkane most readily undergoes question?',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'Wait a moment, we are connecting you a teacher',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            }
            // ,
            // {
            //     type: 'warning',
            //     content: 'Hi we have connected you a teacher, you will get reply from teacher.',
            //     from: this.CONSTANTS.BOT_ID,
            //     to: this.CONSTANTS.USER_ID,
            //     direction: 2,
            //     seen: false
            // },
            // {
            //     type: 'warning',
            //     content: 'Hi we have connected you a teacher, you will get reply from teacher.',
            //     from: this.CONSTANTS.BOT_ID,
            //     to: this.CONSTANTS.USER_ID,
            //     direction: 2,
            //     seen: false
            // }
        ]
    }
}



