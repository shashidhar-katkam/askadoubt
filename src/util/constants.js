const BOT_ID = "611f021feee24600094240b9";

exports.CHAT_EVENTS = {
    selectSubject: 1,
    typeAChapter: 2,
    rating: 3,
    askADoubt: 4,
    areYouSatisfied: 5,
    closeChat: 6,
    notSatisfiedReason: 7,
    connectaNewTeacher: 8


}
exports.CHAT_MESSAGE_TYPE = {
    text: 1,
    typeAChapter: 2,
    rating: 3
}


exports.CONSTANTS = {
    MONGODB_CON_URL: 'mongodb+srv://macademyuser:Meluha123$@macademyfreecloudmongod.hzdx8.mongodb.net/discussboarddev',
    BOT_ID: BOT_ID,
    USER_ID: '6113e8414374b5000854f861',
    TEACHER_ID: '611f052a8c46320008c073c4',


    waitForTeacher: {
        type: 'text',
        content: 'Wait a moment, we are connecting you a teacher',
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    connectedToATeacher: {
        type: 'alert',
        content: 'Hi, We have connected you to a teacher. You will get a reply from teacher soon..',
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    areYouHappy: {
        type: 'text',
        content: 'Are you happy with teachers reply ?',

        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    areYouSatisfied: {
        type: 'list',
        content: [
            {
                "value": "Yes",
                "key": "Yes"
            },
            {
                "value": "No",
                "key": "No"
            },
            {
                "value": "Maybe",
                "key": "Maybe"
            },
        ],
        currentRequest: this.CHAT_EVENTS.areYouSatisfied,
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },

    ratingText: {
        type: 'text',
        content: 'On a scale of 1 to 5 how do you rate this session ?',
        for: null,
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    rating: {
        type: 'list',
        content: [
            {
                "value": "1",
                "key": "1"
            },
            {
                "value": "2",
                "key": "2"
            },
            {
                "value": "3",
                "key": "3"
            },
            {
                "value": "4",
                "key": "4"
            },
            {
                "value": "5",
                "key": "5"
            },
        ],
        currentRequest: this.CHAT_EVENTS.rating,
        from: BOT_ID,
        to: null,
        direction: 2,
        seen: true
    },
    thanksForRating: {
        type: 'text',
        content: 'Thanks for rating please get back to us for further doubts',
        currentRequest: this.CHAT_EVENTS.closeChat,

        from: BOT_ID,
        to: null,
        direction: 2,
        seen: false
    },
    closeRequestSend: {
        type: 'alertBlock',
        content: 'You are sent a Request to close this Doubt.',
        from: BOT_ID,
        to: null,
        direction: 1,
        seen: false
    },
    notSatisfiedReasonText: {
        type: 'text',
        content: 'We would like to know reason for this',
        for: null,
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    notSatisfiedReasons: {
        type: 'list',
        content: [
            {
                "value": "Not Satisfactory",
                "key": "Not Satisfactory"
            },
            {
                "value": "Want more Detailed answer",
                "key": "Want more Detailed answer"
            },
            {
                "value": "Lacking Communication",
                "key": "Lacking Communication"
            },
            {
                "value": "Delayed Response",
                "key": "Delayed Response"
            }
        ],
        currentRequest: this.CHAT_EVENTS.notSatisfiedReason,
        from: BOT_ID,
        to: null,
        direction: 2,
        seen: true
    },
    connectaNewTeacherText: {
        type: 'text',
        content: 'Do you want a different teacher to answer this question ?',
        for: null,
        from: BOT_ID,
        to: null, //this.CONSTANTS.USER_ID,
        direction: 2,
        seen: false
    },
    connectaNewTeacher: {
        type: 'list',
        content: [
            {
                "value": "Yes",
                "key": "Yes"
            },
            {
                "value": "No",
                "key": "No"
            },
        ],
        currentRequest: this.CHAT_EVENTS.connectaNewTeacher,
        from: BOT_ID,
        to: null,
        direction: 2,
        seen: true
    },
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
                content: [
                    {
                        "subjectName": "Mathematics",
                        "subjectId": "3ae11665-aa66-4eb9-94de-1dd775f6cf31"
                    },
                    {
                        "subjectName": "Physics",
                        "subjectId": "c2e5a32d-8d1b-4621-b326-71c829ea8441"
                    },
                    {
                        "subjectName": "Chemistry",
                        "subjectId": "c68bbefe-f418-4bfd-a8d2-c4a658950205"
                    }
                ],
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
                content: 'Please Type Chapter.',
                from: this.CONSTANTS.BOT_ID,
                to: this.CONSTANTS.USER_ID,
                direction: 2,
                seen: false
            },
            {
                type: 'text',
                content: 'eclipse',
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
                direction: 1,
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
        teacher: this.CONSTANTS.TEACHER_ID,
        user: this.CONSTANTS.USER_ID
    },
    DELETE_CONVERSATION: {
        conversationId: '611f44f589b3c3840843a4c0',
        to: this.CONSTANTS.USER_ID,
        from: this.CONSTANTS.TEACHER_ID
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
    },
    REQUEST_TO_CLOSE_DOUBT: {
        doubtId: '611f44f589b3c3840843a4ba',
        from: this.CONSTANTS.TEACHER_ID,
        to: this.CONSTANTS.USER_ID

    },
}



