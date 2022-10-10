var express = require('express');
const { route } = require('.');
var router = express.Router();

// this is where we code the endpoints

// router.method('/route/:withParams', function(req, res, next) {
//  res.send("data here");
// });

// we are build a user api and we need the following
/*
1. CRUD (create, read, update, delete) mapped to endpoints
2. Data to operate on (we will mock this up)
3. always respond with a status code and message
*/

var data = [
    { id: 1, name: "Jesse Harlan", occupation: "Instructor" },
    { id: 2, name: "Sarah Harlan", occupation: "Student" },
    { id: 3, name: "Ashton Harlan", occupation: "1st grade student" }
]

var chatData = [
    [
        { message: "blah" },
        { message: "blah 2" },
    ],
    [
        { message: "another blah" },
        { message: "another blah 2" },
    ]
]

// chatData[channelId][messageId]
// chatData[0][0] - returns { message: "blah" }
// chatData[1][0] - return { message: "another blah" }

var chatDictionary = {
    "tech": [
        { message: "blah" },
        { message: "blah 2" },
    ],
    "news": [
        { message: "another blah" },
        { message: "another blah 2" },
    ]
}

// chatDictionary[channelName][messageId]
// chatDictionary[tech][0] - returns { message: "blah" }
// chatDictionary[news][0] - return { message: "another blah" }


// mixed version
var mockDb = [
    {
        channelName: "tech",
        messages: [
            { message: "blah" },
            { message: "blah 2" },
        ]
    },
    {
        channelName: "news",
        messages: [
            { message: "another blah" },
            { message: "another blah 2" },
        ]
    }
]

router.get('/chat/', function(req, res, next) {
    res.send(mockDb);
});

router.get('/chat/:channel/', function(req, res, next) {
    var channelName = req.params.channel;

    var messages = mockDb.filter(function(channel) {
        return channel.channelName == channelName;
    })[0].messages;

    res.send(messages);
});

router.post('/chat/:channel/', function(req, res, next) {
    var message = req.body;
    var channelIndex = mockDb.findIndex(function(channel) {
        return channel.channelName == req.params.channel;
    });

    mockDb[channelIndex].messages.push(message);

    res.send(mockDb[channelIndex]);
});

// Exact Route GET /api/users
// get all users READ
router.get('/users', function(req, res, next) {
    res.status(200);
    res.send(data);
});

// GET /api/users/:id
// READ one
router.get('/users/:id', function(req, res, next) {
    res.status(200);
    res.send(data.filter(elem => {
        return elem.id == req.params.id;
    }));
});

// fix the post
router.post('/users', function(req, res, next) {
    var message = "";
    if (req.body.token != "SuperSecretToken") {
        res.status(401);
        message = "Unauthorized";
    } else {
        // the gauntlet
        res.status(200);

        if (req.body.name == "" || req.body.name == undefined) {
            res.status(400);
            //res.send({ message: "invalid or missing name" });
            message = "invalid or missing name";
        }

        if (req.body.occupation == "" || req.body.occupation == undefined) {
            res.status(400);
            //res.send({ message: "invalid or missing occupation" });
            message = "invalid or missing occupation";
        }

        var obj = {
            id: data.length + 1,
            name: req.body.name,
            occupation: req.body.occupation
        };

        if (message == "") {
            data.push(obj);
            message = data;
        }       
    }

    res.send(message);
});

module.exports = router;