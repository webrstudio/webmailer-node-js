const cors = require('cors')
const express = require('express')
const { sendEmail } = require('./controllers/mailController.js')

const server = express()
server.use(express.json())
server.use(cors())

server.get('/', (req, res)=>{
    res.json('Servidor corriendo');
})

server.post('/send-email', sendEmail)

server.listen(4001)