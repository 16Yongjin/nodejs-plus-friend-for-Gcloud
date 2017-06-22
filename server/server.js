const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.get('/keyboard', (req, res) => {
    message = {
        "type" : "buttons",
        "buttons" : ["포어과", "ㅎㅇ", "자퇴 신청"]
    }

    res.send(message);
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});