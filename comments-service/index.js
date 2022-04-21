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
    const  text  = req.body.text;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, text: text, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    const event = {
        type: 'CommentCreated',
        data: {
            id,
            text,
            status: 'pending',
            post_id: req.params.id
        }  
      };

      // emit an event to notify the event buss that a new comment is created
      await axios.post('http://localhost:4005/events', event)
      
    res.status(200).send(comments);
});


// event handler for comment service

app.post('/events', (req, res) => {

    const event = req.body.type;

    console.log(`Comments recieved the event ${event}`);
    
    res.send({message: 'success', status: 'true'})
});



app.listen(4001, () => {
    console.log("Listening on port: 4002")
});



