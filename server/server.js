const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.get('/keyboard', (req, res) => {
    menu = {
        "type" : "buttons",
        "buttons" : ["포어과", "ㅎㅇ", "자퇴 신청"]
    }

    res.send(menu);
});

app.post('/message', (req, res) => {
    const obj = req.body;

    var message = req.body.content;
    
    var sendData;
    if (message == '포어과') {
        sendData = {
            'message': {
                text: 'ㅎㅇ'
            }
        }
    } else if (message == 'ㅎㅇ') {
        sendData = {
            message: {
                text: 'Bom dia!'
            }
        }
    } else if (message == '자퇴 신청') {
        sendData = {
            message: {
                text: 'ㅂㅂ'
            }
        }
    } else if (message.includes('안녕')) {
        sendData = {
            message: {
                text: '안녕'
            }
        }
    } else {
        sendData = {
            message: {
                text: ' ¯\\_(ツ)_/¯',
                photo: {
                    url: 'http://a3.cdn.whatstrending.com/post_items/images/000/034/584/large/shrug_emoji.jpg',
                    width: 400,
                    height: 200
                }
            }
        }
    }

    res.send(JSON.stringify(sendData));
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});