const express = require('express')
const app = express()
const port = 3001

app.use(express.json());
app.use(express.static('client'))

require("dotenv").config();
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
    expressSession({
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/",
            dbName: "scavenger_hunt"
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY
    })
)

const bucketController = require("./controllers/bucketController.js")
app.use("/api/bucket", bucketController);
const itinController = require("./controllers/itinController.js")
app.use("/api/bucket", itinController);
const usersController = require("./controllers/usersController.js")
app.use("/api/users", usersController);
const sessionsController = require("./controllers/sessionsController.js")
app.use("/api/session", sessionsController);
const aiController = require("./controllers/aiController.js")
app.use("/api/gpt", aiController);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})