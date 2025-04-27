const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// Replace <db_password> with your actual password
const url = 'mongodb+srv://manvitha:chinnu123@cluster0.q0o3rqy.mongodb.net/studentdb?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

mongoose.connect(url)
const con = mongoose.connection
con.on('open', () => {
  console.log('connected to MongoDB Atlas...')
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


const studentsRouter = require('./students')
app.use('/students', studentsRouter)

app.listen(9000, () => {
  console.log('Server started')
})
