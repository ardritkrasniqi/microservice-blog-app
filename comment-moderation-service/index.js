const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bannedWordsList = require('./banned-words-list.enum');

const bannedWords = bannedWordsList.bannedWordsList;
const port = 4006;
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/events', (req, res) => {

    // get the event emited from the event buss
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        const status = bannedWords.includes(data.text) ? 'rejected' : 'approved';
        if(status === 'rejected'){
            
        }
    }

    res.send({});
});

app.listen(port, () => {
    console.log(`moderation-service listening on port : ${port}`);
})