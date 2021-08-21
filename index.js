// Copyright 2018-2020Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
var mongoose = require("mongoose");
const { CONSTANTS, PAYLOAD } = require('./src/util/constants');

const apiController = require('./src/controllers/apiController');
var doubtsController = require('./src/controllers/doubtsController');
var conversationController = require('./src/controllers/conversationController');
var connectionController = require('./src/controllers/connectionController');

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
      
      let postData;
      let user;
      if (event.body) {
        postData = JSON.parse(event.body).data;
        user = JSON.parse(event.body).user;
      }

      console.log(routeKey);


      let results;
      switch (routeKey) {
        case '$connect': {
          results = await connectionController.saveConnection(PAYLOAD.SAVE_CONNECTION);
          break;
        }
        case '$disconnect': {
          results = await connectionController.updateConnection(PAYLOAD.UPDATE_CONNECTION);
          break;
        }
        case 'online': {
          PAYLOAD.SAVE_CONNECTION.connectionId = connectionId;
          results = await connectionController.saveConnection(PAYLOAD.SAVE_CONNECTION);
          break;
        }
        case 'offline': {
          results = await connectionController.updateConnection(PAYLOAD.UPDATE_CONNECTION);
          break;
        }
        case 'createDoubt': {
          results = await doubtsController.createDoubt(PAYLOAD.CREATE_DOUBT);
          break;
        }
        case 'saveConversation': {
          results = await conversationController.saveConversation(PAYLOAD.CONVERSATION);

          await apiController.sendMessage(endpoint, connectionId, postData, user);

          let toUser = postData.to;

          let toUserInfo = await connectionController.getConnectionByUser({ user: toUser });

          console.log(toUserInfo);
          await apiController.sendMessage(endpoint, toUserInfo.connectionId, postData, toUserInfo.id);

          break;
        }
        case 'respondDoubt': {
          results = await doubtsController.respondDoubt(PAYLOAD.RESPONDE_DOUBT);
          break;
        }
        case 'deleteConversation': {
          results = await conversationController.deleteConversation(PAYLOAD.DELETE_CONVERSATION);
          break;
        }
      }

    }


  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Connected a da.' };
};
