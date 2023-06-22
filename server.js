const express = require('express')
const app = express()
const port = 3001

app.use(express.json());
app.use(express.static('client'))

const bucketController = require("./controllers/bucketController.js")
app.use("/api/bucket", bucketController);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})