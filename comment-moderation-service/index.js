const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bannedWordsList = require('./banned-words-list.enum');
const axios = require('axios');

const bannedWords = bannedWordsList.bannedWordsList;
const port = 4006;
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/events',  async(req, res) => {

    // get the event emited from the event buss
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        const status = bannedWords.some(v => data.text.includes(v)) ? 'rejected' : 'approved';


        // destructure the comment data
        const { id, text, post_id } = data
        // create an event object with necessary data
        const event = {
            type: 'CommentModerated',
            data: {
                id,
                text,
                status,
                post_id
            }  
          };
    
          // emit an event to notify the event buss that a new comment is moderated
          await axios.post('http://localhost:4005/events', event)
    }

    res.send({});
});

app.listen(port, () => {
    console.log(`moderation-service listening on port : ${port}`);
})