const express = require('express');
const bodyParser = require('body-parser');


const port = 4002;

const app = express();
app.use(bodyParser.json());

let posts = [];

// the route to get all posts with their corresponding comments
app.get('/posts', (req, res) => {

});

// listen for the event buss emits, and save newly created posts or comments
app.post('/events', (req, res) => {
    console.log(`An event has just been emited ${req.body.type}`);
    res.send({});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

