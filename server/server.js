const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.get('/keyboard', (req, res) => {
    message = {
        "type" : "buttons",
        "buttons" : ["선택 1", "선택 2", "선택 3"]
    }

    res.send(message);
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});