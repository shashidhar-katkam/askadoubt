
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
        doubt: 'What is my name rakesh ?',
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
            },
            {
                type: 'video',
                content: 'e600fd60-c02c-11ea-806b-2f1f257f758f-bie-eng-11-chem-hydrocarbons-5.1_introduction.mp4',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'pdf',
                content: 'a58536f0-d7a8-11ea-8efd-61ca1f9c97b3-cbse-11-maths-sets.pdf',
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
            },
            {
                type: 'text',
                content: 'This is the response from teacher',
                from: this.CONSTANTS.TEACHER_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },


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
        ],
    },
    CONVERSATION: {
        for: '611f44f589b3c3840843a4ba',
        type: 'text',
        content: 'This is the response from teacher latest',
        from: this.CONSTANTS.TEACHER_ID,
        to: this.CONSTANTS.USER_ID,
        direction: 2,  //from teacher user 
        seen: false
    },
    RESPONDE_DOUBT: {
        doubtId: '611f44f589b3c3840843a4ba',
        teacherId: this.CONSTANTS.TEACHER_ID
    },
    DELETE_CONVERSATION: {
        conversationId: '611f44f589b3c3840843a4c0',
        userId: this.CONSTANTS.USER_ID,
        teacherId: this.CONSTANTS.TEACHER_ID
    },
    SAVE_CONNECTION: {
        user: this.CONSTANTS.USER_ID,
        connectionId: 'connectionId',
        isOnline: true
    },
    UPDATE_CONNECTION: {
        user: this.CONSTANTS.USER_ID,
        connectionId: null,
        isOnline: false
    }
}



