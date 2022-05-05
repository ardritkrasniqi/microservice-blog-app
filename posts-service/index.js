const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());



const posts = [];

// routes for fetching and saving posts
app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts.push({ id, title })

    // emit an event to the event buss with the post just created

    const event = {
      type: 'PostCreated',
      data: {
          id,
          title
      }  
    };

    await axios.post('http://event-bus-srv:4005/events', event);

    res.status(201).send({ id, title });
});

// event handler for post service

app.post('/events', (req, res) => {

    const event = req.body.type;

    console.log(`Posts recieved the event ${event}`);
    
    res.send({message: 'success', status: 'true'})
});

// listen on certain port
app.listen(4000, () => {
    console.log("Listening on port: 4000")
});