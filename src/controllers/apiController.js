const AWS = require('aws-sdk');
var connectionController = require('./connectionController');
var apigwManagementApi;

exports.sendMessage = async (endpoint, connectionId, postData, user) => {
    if (!apigwManagementApi) {
        apigwManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: endpoint
        });
    }

    try {
        await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: Buffer.from(JSON.stringify(postData)) }).promise();
    } catch (e) {
        if (e.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);

            await connectionController.updateConnection({
                user,
                connectinId: null,
                isOnline: false
            });
        } else {
            throw e;
        }
    }


}
