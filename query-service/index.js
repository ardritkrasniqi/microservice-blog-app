const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

// the route to get all posts with their corresponding comments
app.get('/posts', (req, res) => {
    res.send(posts);
});

function handleEvent(type, data){
    if (type == 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    } else if (type == 'CommentCreated') {
        const { id, text, status, post_id } = data;
        const post = posts[post_id];

        post.comments.push({ id, text, status, post_id })

    } else if (type == 'CommentUpdated') {

        // comment moderated event
        const { id, text, status, post_id } = data;
        const post = posts[post_id];
        //update existing comment status
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.text = text;
    } else {
        console.log('this event type does not exist!')
    }
}

// listen for the event buss emits, and save newly created posts or comments
app.post('/events', async (req, res) => {
    // destructure the event data and get type & data
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    console.log('v2.3');

    // make requrest to the event buss to get all events 
    const res = await axios.get('http://event-bus-srv:4005/events')
        .then( function async (res)  {
            for (let event of res.data) {
                console.log('processing event: ', event.type);
                 handleEvent(event.type, event.data);
            }
        })
        .catch(function async(error) {
            console.log(error);
        }); // comments service


})

