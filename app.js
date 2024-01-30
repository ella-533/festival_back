const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World !')
})

const festivalRouter = require('./routes/festivalRoutes')
app.use('/api/festival', festivalRouter)


app.use('/uploadedFiles', express.static(__dirname + '/uploadedFiles'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})