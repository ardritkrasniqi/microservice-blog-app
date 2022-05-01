const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// define port 
const port = 4005;

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    // check for events
    const event = req.body;


    // save the events to the data store
    events.push(event);


    // send the event to different services
    const posts = axios.post('http://localhost:4000/events', event); // posts service
    const comments = axios.post('http://localhost:4001/events', event).catch(function (error){
        console.log(error);
    }); // comments service
    const event_buss = axios.post('http://localhost:4002/events', event); // event buss service
    const moderation = axios.post('http://localhost:4006/events', event); // comment moderation service

    Promise.all([posts, comments, event_buss, moderation])
        .catch(function (error) {
            console.log(error);
        });

    res.send({ message: "success", status: "true" });
});

// send all the events that have occured 
app.get('/events', (req, res) => {

    res.send(events);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});