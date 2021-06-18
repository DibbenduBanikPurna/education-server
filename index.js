const express = require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');

const app = express()
app.use(bodyparser.json())

require('dotenv').config()

app.use(cors());
 
const uri = "mongodb+srv://online-education:2470purna@cluster0.z2een.mongodb.net/online-education?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("online-education").collection("cource");
    
        app.post('/addCource', (req, res) => {
            
            console.log(req.body);
            collection.insertMany(req.body)
            .then(result=>{
                res.send(result.insertedCount>0)

            })
           
        
        })

        app.get('/cources',(req,res)=>{
            collection.find({})
            .toArray((err,documents)=>{
                res.send(documents)
            })
    })

 
    app.get('/cources/:id',(req,res)=>{
        console.log(req.params.id)
        collection.find({_id:ObjectID(req.params.id)})
         .toArray((err,document)=>{
            res.send(document[0])
           // console.log(err)
        })
    })


         
           
    
  });









app.get('/', function (req, res) {
  res.send('Hello World')
  console.log('hello')
})
 
app.listen(300)