const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

// the route to get all posts with their corresponding comments
app.get('/posts', (req, res) => {
    res.send(posts);
});

// listen for the event buss emits, and save newly created posts or comments
app.post('/events', async (req, res) => {
    // destructure the event data and get type & data
    const { type, data } = req.body;

    if (type == 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    } else if (type == 'CommentCreated') {
        const { id, text, status, post_id } = data;
        const post = posts[post_id];

        await post.comments.push({ id, text, status, post_id })

    } else if (type == 'CommentModerated') {
        // comment moderated event
        const { id, text, status, post_id } = data;
        const post = posts[post_id];
        //update existing comment status
        objIndex = post.comments.findIndex((obj => obj.id == id));
        post.comments[objIndex].status = status;
    } else {
        return res.send({ message: 'No event with this type exists!' });
    }

    res.send({});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

