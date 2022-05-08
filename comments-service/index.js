const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');
const { stat } = require('fs');

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
      await axios.post('http://event-bus-srv:4005/events', event)
      
    res.status(200).send(comments);
});


// event handler for comment service

app.post('/events', async(req, res) => {


    const { type, data } = req.body;
    const { post_id, id ,status, text } = data;
    // comment moderated event
    if(type == 'CommentModerated'){

        const comments = commentsByPostId[post_id];

        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;

        // tell the other service that this update has occured
        const event = {
            type: 'CommentUpdated',
            data: {
                 id,
                 text,
                 post_id,
                 status
            }
        }
        await axios.post('http://event-bus-srv:4005/events', event);
    }
    
    res.send({message: 'success', status: 'true'})
});



app.listen(4001, () => {
    console.log("Listening on port: 4001")
});



