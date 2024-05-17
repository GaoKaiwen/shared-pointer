const express = require('express')
const path = require('path')
const app = express()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Opening server on ${port} port`))