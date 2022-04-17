const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// define port 
const port = 4005;

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    // check for events
    const event = req.body;
    
    // send the event to different services
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    //axios.post('http://localhost:4002/events', event);


    res.send({message: "success", status: "true"});
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});