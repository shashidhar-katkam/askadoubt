// Copyright 2018-2020Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
var mongoose = require("mongoose");
const { CONSTANTS, PAYLOAD } = require('./src/util/constants');

const apiController = require('./src/controllers/apiController');
var doubtsController = require('./src/controllers/doubtsController');
var conversationController = require('./src/controllers/conversationController');
var connectionController = require('./src/controllers/connectionController');
var chatController = require('./src/controllers/chatController');
const { result } = require('lodash');
//const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });



//const { TABLE_NAME } = process.env;






exports.handler = async event => {

  try {
    mongoose
      .connect(CONSTANTS.MONGODB_CON_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('DB connected Successfully');
      }).catch((e) => {

        console.log(e)
      });


    if (event.requestContext) {
      const connectionId = event.requestContext.connectionId;
      const routeKey = event.requestContext.routeKey;
      const endpoint = event.requestContext.domainName + '/' + event.requestContext.stage;

      let requestObj;
      let user;
      if (event.body) {
        requestObj = JSON.parse(event.body).data;
        user = JSON.parse(event.body).user;
      }

      console.log(routeKey);


      let results;
      switch (routeKey) {
        case '$connect': {
          //  results = await connectionController.saveConnection(PAYLOAD.SAVE_CONNECTION);
          //  await apiController.sendMessage(endpoint, connectionId, { helo: 'message' }, null);
          break;
        }
        case '$disconnect': {
          results = await connectionController.updateConnection(PAYLOAD.UPDATE_CONNECTION);
          break;
        }

        // when socket opened, use will send the userId to update the connectionId in table
        case 'online': {
          requestObj.connectionId = connectionId;
          results = await connectionController.saveConnection(requestObj);

          await apiController.sendMessage(endpoint, connectionId, { helo: 'message' }, requestObj.user);

          break;
        }
        // when socket closed, use will send the userId to update the connectionId in table
        case 'offline': {
          results = await connectionController.updateConnection(PAYLOAD.UPDATE_CONNECTION);
          break;
        }

        // user will send the complete doubtInfo with conversation made by bot to save doubt, convesations
        // to establish a socket connection.
        case 'createDoubt': {
          results = await doubtsController.createDoubt(requestObj, user);

          console.log('hello-test-1')
          console.log(results);
          console.log('hello-test-2')
          console.log(endpoint, connectionId, results, user);
          console.log('hello-test-3')
          await apiController.sendMessage(endpoint, connectionId, results, user);
          break;
        }

        case 'respondDoubt': {
          results = await doubtsController.respondDoubt(requestObj);

          await apiController.sendMessage(endpoint, connectionId, results, user);



          //   let toUser = requestObj.conversation.to;
          let toUserInfo = await connectionController.getConnectionByUser({ user: requestObj.user });
          console.log('toUserInfo');
          console.log(toUserInfo);
          console.log('toUserInfo');
          await apiController.sendMessage(endpoint, toUserInfo.connectionId, results, requestObj.user);
          break;
        }

        case 'sendMessage': {
          let conversation = requestObj.conversation;
          conversation.for = requestObj.doubtId;

          results = await conversationController.saveConversation(conversation);

          await apiController.sendMessage(endpoint, connectionId, results, user);
          let toUser = requestObj.conversation.to;
          let toUserInfo = await connectionController.getConnectionByUser({ user: toUser });
          console.log(toUserInfo);
          await apiController.sendMessage(endpoint, toUserInfo.connectionId, results, toUser);

          break;
        }

        case 'deleteMessage': {
          results = await conversationController.deleteConversation(PAYLOAD.DELETE_CONVERSATION);

          await apiController.sendMessage(endpoint, connectionId, results, user);
          let toUser = requestObj.to;
          let toUserInfo = await connectionController.getConnectionByUser({ user: toUser });
          console.log(toUserInfo);
          await apiController.sendMessage(endpoint, toUserInfo.connectionId, results, toUser);

          break;
        }

        case 'requestToCloseDoubt': {
          results = await chatController.requestToCloseConversation(PAYLOAD.REQUEST_TO_CLOSE_DOUBT);

          // for teacher
          await apiController.sendMessage(endpoint, connectionId, results.teacher, user);

          // for student
          await apiController.sendMessage(endpoint, connectionId, results.student, user);
          break;
        }



      }

    }


  } catch (e) {
    console.log(e.message)
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Connected a da.' };
};
