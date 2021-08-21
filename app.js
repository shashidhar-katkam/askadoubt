var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3006;
var mongoose = require("mongoose");
var doubtsController = require('./src/controllers/doubtsController');
var conversationController = require('./src/controllers/conversationController');
var connectionController = require('./src/controllers/connectionController');

const { CONSTANTS, PAYLOAD } = require('./src/util/constants')


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/:routeKey', async (req, res) => {
    const { routeKey } = req.params;
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
        case 'createDoubt': {
            results = await doubtsController.createDoubt(PAYLOAD.CREATE_DOUBT);
            break;
        }
        case 'saveConversation': {
            results = await conversationController.saveConversation(PAYLOAD.CONVERSATION);

         //   await apiController.sendMessage(endpoint, connectionId, postData, user);

            let toUser = PAYLOAD.CONVERSATION.to;

            let toUserInfo = await connectionController.getConnectionByUser({ user: toUser });

            console.log(toUserInfo);
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

    return res.status(200).json({
        status: 'success',
        data: results
    });
    // res.send("ping");
});


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



var server = app.listen(port, function () {
    console.log("server started at  " + port);
    console.log("Please Navigate to http://localhost:" + port.toString());
});
