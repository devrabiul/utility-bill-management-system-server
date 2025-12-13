const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const port = 3000
require('dotenv').config()

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/bills', async (req, res) => {
  try {
    const { category, limit } = req.query
    let query = {}

    if (category) {
      query.category = category
    }

    const db = mongoose.connection.db; 
    let bills = await db.collection('bills')
      .find(query)
      .sort({ date: -1 })
      .toArray()

    if (limit) {
      bills = bills.slice(0, parseInt(limit))
    }

    res.json(bills)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})