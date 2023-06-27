const express = require("express");
const router = express.Router();
require("dotenv").config();  

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let bucketCollection;

//initialise DB - updated
mongoClient.connect().then(_ => {
    const db = mongoClient.db("bucket-list");
    // db.dropCollection("bucket-list-data");
    bucketCollection = db.collection("bucket-list-data");

    bucketCollection.find().toArray()
    .then(docs => {
        if (docs.length < 1) {
            bucketCollection.insertMany([
                { name: "Machu Picchu"      , description: "5th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge" , image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg", activity: "Hike" },
                { name: "Vinicunca"         , description: "The Rainbow Mountain or Vinicunca is a mountain near Cusco in Peru"                                                     , image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Rainbow_Mountain_Peru.jpg", activity: "Hike" },
                { name: "Salar de Uyuni"    , description: "Salar de Uyuni is the world's largest salt flat, or playa, at over 10,000 square kilometres (3,900 sq mi) in area."     , image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Salar_de_Uyuni%2C_Bolivia%2C_2016-02-04%2C_DD_16-18_HDR.JPG/2560px-Salar_de_Uyuni%2C_Bolivia%2C_2016-02-04%2C_DD_16-18_HDR.JPG", activity: "Hike" }
            ])
        }
    })
}).catch(error => {
    console.log(error);
}).finally(() => { // .finally(executeCodeRegardles)
    console.log("Operation finished - bucketController.js has loaded")
})

router.all("/:id", (request, response, next) => {
    bucketCollection.findOne({ _id: new ObjectId(request.params.id)}).then((item) => {
        if (!item) {
            response.status(404).json({ "message": `Item ${request.params.id} does not exist` })
        }
    });

    next();
})

//Get all items on bucket list
router.get("/", (_, response) => {
    bucketCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

//Post challenge
router.post("/", (request, response) => {
    bucketCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

//Delete challenge
router.delete("/:id", (request, response) => {
    bucketCollection.deleteOne({ _id: new ObjectId(request.params.id)}).then((_) => {
        response.json();
    });
});

//Put challenge
router.put("/:id", (request, response) => {
    const filter = { _id: new ObjectId(request.params.id) };
    const update = { $set: request.body, };
    bucketCollection.updateOne(filter, update).then((_) => {
        response.json();
    });
});

//Patch challenge
router.patch("/:id", (request, response) => {
    const filter = { _id: new ObjectId(request.params.id) };
    const update = { $set: request.body, };
    bucketCollection.updateOne(filter, update).then((_) => {
        response.json();
    });
});

module.exports = router;