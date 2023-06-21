const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();  

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let testCollection;

mongoClient.connect().then(_ => {
    const db = mongoClient.db("bucket-list");
    testCollection = db.collection("bucket-list-data");

    testCollection.find().toArray()
    .then(docs => {
        if (docs.length < 1) {
            testCollection.insertMany([
                { name: "Machu Picchu"      , description: "5th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge" , image: "https://en.wikipedia.org/wiki/Machu_Picchu#/media/File:Machu_Picchu,_Peru.jpg", activity: "Hike" },
                { name: "Vinicunca"         , description: "The Rainbow Mountain or Vinicunca is a mountain near Cusco in Peru"                                                     , image: "https://en.wikipedia.org/wiki/Vinicunca#/media/File:Rainbow_Mountain_Peru.jpg", activity: "Hike" },
                { name: "Salar de Uyuni"    , description: "Salar de Uyuni is the world's largest salt flat, or playa, at over 10,000 square kilometres (3,900 sq mi) in area."     , image: "https://en.wikipedia.org/wiki/Salar_de_Uyuni#/media/File:Salar_de_Uyuni,_Bolivia,_2016-02-04,_DD_16-18_HDR.JPG", activity: "Hike" }
            ])
        }
    })
}).catch(error => {
    console.log(error);
})

app.use(express.json());

app.get("/api/test", (_, response) => {
    testCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

app.post("/api/test", (request, response) => {
    testCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

console.log("testing my individiaul branch...again")

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
