var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var port = process.env.PORT || 7899;
var mongoose = require("mongoose");
var DoubtsController = require('./src/controllers/doubtsController');

const { CONSTANTS, PAYLOAD } = require('./src/util/constants')


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/:key', async (req, res) => {
    const { key } = req.params;
    let results;
    switch (key) {
        case '$connect': {
        }
        case '$disconnect': {
        }
        case 'createdoubt': {
            results = await DoubtsController.createDoubt(PAYLOAD.CREATE_DOUBT);
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
