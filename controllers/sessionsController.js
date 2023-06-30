const express = require("express");
router = express.Router();

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let db;
mongoClient.connect().then(_ => {
    db = mongoClient.db("bucket-list");
    usersCollection = db.collection("users");
}).catch(error => {
    console.log(error);
}).finally(() => { // .finally(executeCodeRegardles)
    console.log("Operation finished - sessionsController.js has loaded")
})

router.get("/", (request, response) => {
    console.log(request.session)
    if (!request.session.email) {
        response.status(401).json({
            "message": "user not logged in"
        })
    } else {
        response.json(request.session);
    }
})

router.post("/", (request, response) => {
    let user;
    usersCollection.findOne({ email: request.body.email }).then((result) => {
        user = result;
        const bcrypt = require("bcrypt");
        if (!user || !bcrypt.compareSync(request.body.password, user.password)) {
            response.status(401).json({ "message": "incorrect login details" });
            return;
        }

        request.session.userid = user._id;
        request.session.name = user.name;
        request.session.email = user.email;
        console.log(request.session)
        response.json({ message: "logged in successfully",
                        sessionEmail: request.session.email,
                        sessionID: request.session.userid });
    });
})

router.delete("/", (request, response) => {
    request.session.destroy();
    response.json({ message: "logged out successfully" });
});

module.exports = router;