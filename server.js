const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


const MONGO = process.env.MONGO || 'mongodb://localhost:27017';
const DB = 'passa_a_bola';


async function main(){
const client = new MongoClient(MONGO);
await client.connect();
const db = client.db(DB);
const entities = db.collection('entities');


const app = express();
app.use(bodyParser.json());


app.post('/v2/entities', async (req, res) => {
const entity = req.body;
entity._received = new Date();
await entities.insertOne(entity);
res.status(201).send({status: 'created'});
});


app.put('/v2/entities/:id/attrs', async (req, res) => {
const id = req.params.id;
const attrs = req.body;
await entities.updateOne({id}, {$set: {attrs, updated: new Date()}}, {upsert: true});
res.send({status: 'updated'});
});


app.get('/entities', async (req, res) => {
const docs = await entities.find().limit(100).toArray();
res.json(docs);
});


const port = process.env.PORT || 1026;
app.listen(port, () => console.log('Orion-mock listening on', port));
}


main().catch(console.error);
