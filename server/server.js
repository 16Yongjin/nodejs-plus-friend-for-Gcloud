const express = require('express');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.get('/keyboard', (req, res) => {
    menu = {
        "type" : "buttons",
        "buttons" : ["포어과", "ㅎㅇ", "자퇴 신청"]
    }

    res.send(menu);
});

app.post('/message', (req, res) => {
    console.log(req.body);
    var sendData = { };
    if (!req.body['user_key'] || !req.body['type'] || !req.body['content']) {
        sendData['success'] = 0;
        sendData['error'] = 'invalid request';
        res.send(JSON.stringify(sendData));
        return;
    }

    var message = req.body['content'];
    console.log(message);
    

    if (message == '포어과') {
        sendData = {
            'message': {
                'text': 'ㅎㅇ'
            }
        }
    } else if (message == 'ㅎㅇ') {
        sendData = {
            'message': {
                'text': 'Bom dia!'
            }
        }
    } else if (message == '자퇴 신청') {
        sendData = {
            'message': {
                'text': 'ㅂㅂ'
            }
        }
    } else if (message.includes('안녕')) {
        sendData = {
            'message': {
                'text': '안녕'
            }
        }
    } else if (message == '도움') {
        sendData = {
            'keyboard': {
                "type" : "buttons",
                "buttons" : ["포어과", "ㅎㅇ", "자퇴 신청"]
            }
        }
        
    } else {
        sendData = {
            'message': {
                'text': ' ¯\\_(ツ)_/¯',
                'photo': {
                    'url': 'http://a3.cdn.whatstrending.com/post_items/images/000/034/584/large/shrug_emoji.jpg',
                    'width': 400,
                    'height': 200
                }
            }
        }
    }

    res.send(sendData);
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});