const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();  

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let bucketCollection;

//initialise DB
mongoClient.connect().then(_ => {
    const db = mongoClient.db("bucket-list");
    bucketCollection = db.collection("bucket-list-data");

    bucketCollection.find().toArray()
    .then(docs => {
        if (docs.length < 1) {
            bucketCollection.insertMany([
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
app.use(express.static('client'))

//Get all items on bucket list
app.get("/api/bucket", (_, response) => {
    bucketCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

//Post challenge
app.post("/api/bucket", (request, response) => {
    bucketCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

//Delete challenge
app.delete("/api/bucket/:id", (request, response) => {
    bucketCollection.deleteOne({ _id: new ObjectId(request.params.id)}).then((_) => {
        response.json();
    });
});

//Put challenge
app.put("/api/bucket/:id", (request, response) => {
    const filter = { _id: new ObjectId(request.params.id) };
    const update = { $set: request.body, };
    bucketCollection.updateOne(filter, update).then((_) => {
        response.json();
    });
});

//Patch challenge
app.patch("/api/bucket/:id", (request, response) => {
    const filter = { _id: new ObjectId(request.params.id) };
    const update = { $set: request.body, };
    bucketCollection.updateOne(filter, update).then((_) => {
        response.json();
    });
});

mongoClient.connect() // Connect to Mongo DB using Mongo Client we created in Step 2
.then((response) => { // then(doSomethingOnSuccess)
  const db = mongoClient.db("bucket-list") // Create a new DB once mongo client has established connection
  usersCollection = db.collection("users") // Create collection(s) using the DB

  usersCollection.find().toArray()
  .then(documents => {
    if (documents.length < 1) {
      // usersCollection.insertMany([ // insert new document data / records to collection
      //   { name: "admin" , email: "admin@admin.com", password: "$2b$10$HnCjvUzYdVsyTcXc.UYKae.pp5N6Nc9aTickGVaet4XcPFQbmbNWa" },
      //   { name: "User1" , email: "user1@user1.com", password: "$2b$10$Rgcl35rXOV03R5yDbY6AfuE0MBbywFuuiCUpaI7M5MTNyng899SLy" },
      // ])
    }
  })
  .catch(error => { // .catch(tellUsWhatTheErrorIs)
    console.log("Error has occured")
    console.log(error)
  })
  .finally(() => { // .finally(executeCodeRegardles)
    console.log("Operation finished - users.js has loaded")
  })
})

app.get('/api/user', (_, res) => {
    usersCollection.find().toArray().then((user) => {
      res.json(user)
    })
  });

// POST a Users
app.post('/api/user', (request, response) => {
    // BCRYPT - pw encryption - admin, user1
    const bcrypt = require('bcrypt');
    // console.log(request.body)

    const hashedPassword = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync())
    console.log(hashedPassword)
    usersCollection.insertOne({ 
        name: `${req.body.name}`, 
        email: `${req.body.email}`, 
        password: hashedPassword
    }).then((_) => { // _ is used as we're not doing anything with the parameter
        response.json();
    })
})
  

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})