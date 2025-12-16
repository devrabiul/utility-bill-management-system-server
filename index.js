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

app.get('/', (req, res) => {
  res.json({ 
    message: 'Utility Bill Management System API',
    status: 'Running',
    endpoints: {
      getAllBills: 'GET /api/bills',
      getBillById: 'GET /api/bills/:id',
      getRecentBills: 'GET /api/bills?limit=6',
      getBillsByCategory: 'GET /api/bills?category=Electricity',
      createBill: 'POST /api/bills',
      myBills: 'GET /api/my-bills?userId=USER_ID'
    }
  })
})

app.get('/api/bills', async (req, res) => {
  try {
    const { category, limit } = req.query
    let query = {}

    if (category) {
      query.category = category
    }

    if (!db) {
      return res.status(500).json({ error: 'Database not connected' })
    }

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

app.get('/api/bills/:id', async (req, res) => {
  try {
    const billId = req.params.id
    
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' })
    }
    
    if (!ObjectId.isValid(billId)) {
      return res.status(400).json({ error: 'Invalid bill ID format' })
    }

    const bill = await db.collection('bills')
      .findOne({ _id: new ObjectId(billId) })
    
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' })
    }
    
    res.json(bill)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
