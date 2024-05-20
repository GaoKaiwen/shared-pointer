const express = require('express')
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

io.on('connection', socket => {
    console.log(`User ${socket.handshake.address} connected`)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', (req, res) => {
    console.log(`Mouse X position: ${req.body.mousePositionX}`)
    console.log(`Mouse Y position: ${req.body.mousePositionY}`)
    res.status(200).send('Mouse positions received successfully')
    
    console.log(req.headers)
    io.emit('position', JSON.stringify({
        id: req.header('user-unique-id'),
        mousePositionX: req.body.mousePositionX,
        mousePositionY: req.body.mousePositionY
    }))
})

let port = process.env.PORT || 3000
httpServer.listen(port, () => console.log(`Opening server on ${port} port`))