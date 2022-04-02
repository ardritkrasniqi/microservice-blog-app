const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {

    res.status(200).send(commentsByPostId[req.params.id] || []);
});


app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const text = req.body.text;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, text: text });

    commentsByPostId[req.params.id] = comments;

    res.status(200).send(comments);
});


app.listen(4001, () => {
    console.log("Listening on port: 4001")
});



