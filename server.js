const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://duane:123@cluster0.l8vrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "Inventory";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('InventoryList').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/inventory', (req, res) => {
  db.collection('InventoryList').insertOne({name: req.body.name, cat: req.body.cat, plus: 0, minus:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/inventory', (req, res) => {
  db.collection('InventoryList')
  .findOneAndUpdate({name: req.body.name, cat: req.body.cat}, {
    $set: {
      plus:req.body.plus + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/minusQty', (req, res) => {
  db.collection('InventoryList')
  .findOneAndUpdate({name: req.body.name, cat: req.body.cat}, {
    $set: {
      plus:req.body.plus - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})



app.delete('/delete', (req, res) => {
  db.collection('InventoryList').findOneAndDelete({name: req.body.name, cat: req.body.cat}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
