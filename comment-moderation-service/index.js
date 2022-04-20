const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 4006;
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/events', (req, res) => {

    // get the event emited from the event buss
    const event = req.body;

    
});

app.listen(port, () => {
    console.log(`moderation-service listening on port : ${port}`);
})