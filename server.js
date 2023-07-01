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
            mongoUrl: process.env.MONGO_DB_CONNECTION_STRING,
            dbName: "bucket-list"
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY
    })
)

const bucketController = require("./controllers/bucketController.js")
app.use("/api/bucket", bucketController);
// const itinController = require("./controllers/itinController.js")
// app.use("/api/itin", itinController);
const usersController = require("./controllers/usersController.js")
app.use("/api/users", usersController);
const sessionsController = require("./controllers/sessionsController.js")
app.use("/api/session", sessionsController);
const aiController = require("./controllers/aiController.js")
app.use("/api/gpt", aiController);
const unsplashController = require("./controllers/unsplashController.js")
app.use("/api/unsplash", unsplashController);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})