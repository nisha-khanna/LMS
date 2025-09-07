import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from 'body-parser'

const app = express()

// DB connect
await connectDB()

// Middlewares
app.use(cors())

// 👇 Only for webhooks: we need raw body, not parsed JSON
app.post('/clerk', 
  bodyParser.raw({ type: 'application/json' }), 
  clerkWebhooks
)

// Normal routes → can use JSON
app.use(express.json())

app.get('/', (req, res) => res.send("API Working"))

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
