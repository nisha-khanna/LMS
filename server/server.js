import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import User from './models/User.js'   // ✅ import User model

//Initialize express
const app = express()

//Connect to database
await connectDB()

//Middlewares
app.use(cors())
// Instead of express.json()
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);


//Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

// ✅ Test route for inserting dummy user
app.get('/test', async (req, res) => {
  try {
    await User.create({
      _id: "abc123",
      email: "demo@example.com",
      name: "Demo User",
      imageUrl: "https://example.com/test.png"
    })
    res.send("Inserted demo user!")
  } catch (err) {
    res.status(500).send("Error inserting test user: " + err.message)
  }
})

//Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
