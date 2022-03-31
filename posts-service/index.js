const express = require('express');

const app = express();

const { randomBytes } = require('crypto');

const posts = {};

// routes for fetching and saving posts
app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };
});

// listen on certain port
app.listen(4000, () => {
    console.log("Listening on port: 4000")
});