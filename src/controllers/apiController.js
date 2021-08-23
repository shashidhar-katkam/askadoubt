const AWS = require('aws-sdk');
var connectionController = require('./connectionController');


exports.sendMessage = async (endpoint, connectionId, postData, user) => {
    // if (!apigwManagementApi) {
    var apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: endpoint
    });
    // }

    try {
        let abc = await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: Buffer.from(JSON.stringify(postData)) }).promise();
        console.log("99999999abc")
        console.log(abc)
        console.log('====abc')
    } catch (e) {
        console.log(e);
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
