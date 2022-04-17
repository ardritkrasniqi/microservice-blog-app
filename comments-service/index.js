const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {

    res.status(200).send(commentsByPostId[req.params.id] || []);
});


app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const text = req.body.text;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, text: text });

    commentsByPostId[req.params.id] = comments;

    const event = {
        type: 'CommentCreated',
        data: {
            id,
            text,
            post_id: req.params.id
        }  
      };

      // emit an event to notify the event buss that a new comment is created
      await axios.post('http://localhost:4005/events', event)
      
    res.status(200).send(comments);
});


app.listen(4001, () => {
    console.log("Listening on port: 4002")
});



