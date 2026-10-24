require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser') //<- maybe can delete look into it
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = process.env.MONGO_URI //<- originally the demo old url created a .env file to store the url/// one IP address can change to only my IP nad even if they have the url it wont work
const dbName = "savageDemo";

app.listen(3000, () => {/// vv all this code to connect to the MongoDB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error; 
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')// one template we will plug stuff in from the db
app.use(bodyParser.urlencoded({extended: true}))// allows us to look at all the data thats going back and form
app.use(bodyParser.json()) //->allows us to parse
app.use(express.static('public')) 

// before we were dragging from our local computer vvv we are dragging from a server and getting that file.
app.get('/', (req, res) => {//<-- full route if localhost:PORT/
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})// .ejs is not html but its being rendered as a html file with the res.render()
  })
})

app.post('/messages', (req, res) => {// the route is always the interface and the thole command are the API(get,put,delete,post)
  // name: req.body.name <-- name key: changes the property name in the db // body.name <- this is changed in the index.ejs 'name'
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true // default to FALSE
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
 
// needed to change the down routing path becuase messsage is for thumbUp
app.put('/down', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true // default to FALSE
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
