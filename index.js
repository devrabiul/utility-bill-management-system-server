const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const app = express()
const port = 3000
require('dotenv').config()

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let db;

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    db = mongoose.connection.db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
