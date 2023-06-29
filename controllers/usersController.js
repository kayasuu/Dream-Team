const express = require("express");
const router = express.Router();
require("dotenv").config();

// Mongo DB setup 
const { ObjectId, MongoClient } = require("mongodb"); // to grab objectIDs for post and such
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING); // Create a client for MongoDB using the Mongo DB URI

// Create global variables to reference later from the .connect
let usersCollection;

mongoClient.connect() // Connect to Mongo DB using Mongo Client we created in Step 2
.then((response) => { // then(doSomethingOnSuccess)
  const db = mongoClient.db("bucket-list") // Create a new DB once mongo client has established connection
  db.dropCollection("users") // Create collection(s) using the DB
  usersCollection = db.collection("users") // Create collection(s) using the DB

  usersCollection.find().toArray()
  .then(documents => {
    if (documents.length < 1) {
      usersCollection.insertMany([ // insert new document data / records to collection
        { name: "user1" , email: "user1@email.com", password: "$2b$10$H2Hayn53.tPT6UKSl1AVPOa/cKI/Q8NYu0BnsDNymvtJ38rFb/cTe" }, // password is test
        { name: "user2" , email: "user2@email.com", password: "$2b$10$H2Hayn53.tPT6UKSl1AVPOa/cKI/Q8NYu0BnsDNymvtJ38rFb/cTe" }, // password is test
        { name: "user3" , email: "user3@email.com", password: "$2b$10$H2Hayn53.tPT6UKSl1AVPOa/cKI/Q8NYu0BnsDNymvtJ38rFb/cTe" } // password is test
      ])
    }
  }).catch(error => { // .catch(tellUsWhatTheErrorIs)
    console.log("Error has occured")
    console.log(error)
  }).finally(() => { // .finally(executeCodeRegardles)
    console.log("Operation finished - usersController.js has loaded")
  })
})

router.get('/', (_, res) => {
  usersCollection.find().toArray().then((user) => {
    res.json(user)
  })
});

router.post('/', (request, response) => {
  const bcrypt = require('bcrypt');
  const hashedPassword = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync())

  if (!request.body.name || !request.body.email || !request.body.password) {
    response.status(400).json({ message: "missing mandatory fields"});
    return;
  }

  if (request.body.password.length < 8) {
      response.status(400).json({ message: "password must be 8 characters or more"});
      return;
  }

  usersCollection.findOne({ email: request.body.email }).then((user) => {
    if (user) {
        response.status(400).json({ message: `user with the email ${request.body.email} already exists`});
        return;
    } 
  usersCollection.insertOne({ 
      name: `${request.body.name}`, 
      email: `${request.body.email}`, 
      password: hashedPassword
    }).then((_) => { // _ is used as we're not doing anything with the parameter
      response.json();
    })
  })
})
module.exports = router;