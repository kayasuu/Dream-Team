const express = require("express");
const router = express.Router();
require("dotenv").config();  

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let itinerariesCollection;

mongoClient.connect().then(_ => {
    const db = mongoClient.db("bucket-list");
    db.dropCollection("itineraries");
    itinerariesCollection = db.collection("itineraries");

    itinerariesCollection.find().toArray()
    .then(itinerary => {
        if (itinerary.length < 1) {
            itinerariesCollection.insertMany([
                {   
                    name: "Greece", 
                    length: 3,
                    budget: 1, 
                    description: `
                    Day 1:
                    Morning - Start your day by visiting the iconic Acropolis of Athens. Explore the ancient ruins and learn about the history of Greece.
                    Afternoon - Head to the Plaka neighborhood for a traditional Greek lunch and some shopping. Stroll through the charming streets and browse the local boutiques.
                    Evening - Experience the vibrant nightlife of Athens by visiting a rooftop bar with a view of the Acropolis.

                    Day 2:
                    Morning - Take a day trip to the beautiful island of Hydra. Enjoy a scenic boat ride and explore the charming town on foot or by donkey.
                    Afternoon - Relax on one of the island's stunning beaches and soak up the Mediterranean sun.
                    Evening - Return to Athens and enjoy a delicious seafood dinner at a local taverna.

                    Day 3:
                    Morning - Visit the National Archaeological Museum of Athens to see some of the most important artifacts from ancient Greece.
                    Afternoon - Take a cooking class to learn how to make traditional Greek dishes like moussaka and tzatziki.
                    Evening - End your trip with a sunset dinner at a rooftop restaurant with a view of the city.
                    `,
                    type: [ "foodie", "family friendly", "city experiences" ],
                    keywords: ["City Experiences", "Greece", "Athens", "Plaka", "Acropolis"],
                    createdBy: "649d3118612bcb54a04af5b0" // user3
                },
                {   
                    name: "France", 
                    length: 3, 
                    description: 
                    `
                    Day 1:
                    Morning - Start your day with a visit to the iconic Eiffel Tower. Get there early to avoid the crowds and enjoy the stunning views of the city from the top.
                    Afternoon - Head to the Louvre Museum, one of the world's largest and most famous museums. Spend the afternoon exploring the vast collection of art and artifacts, including the famous Mona Lisa.
                    Evening - Take a stroll along the Seine River and enjoy the beautiful views of the city at night. Stop at a local bistro for some French cuisine and wine.
                    
                    Day 2:
                    Morning - Visit the Palace of Versailles, a stunning example of French Baroque architecture and a UNESCO World Heritage Site. Explore the palace and its beautiful gardens.
                    Afternoon - Take a walking tour of the historic Marais district, known for its charming streets, trendy boutiques, and historic landmarks.
                    Evening - Enjoy a night out at a cabaret show at the famous Moulin Rouge, known for its high-energy performances and dazzling costumes.
                    
                    Day 3:
                    Morning - Visit the Notre-Dame Cathedral, one of the most famous landmarks in Paris. Take a guided tour to learn about the history and architecture of this iconic building.
                    Afternoon - Explore the trendy Le Marais neighborhood, known for its chic boutiques, art galleries, and trendy cafes.
                    Evening - End your trip with a romantic dinner cruise along the Seine River, enjoying the beautiful views of the city at night while savoring delicious French cuisine.
                    `,
                    type: [ "foodie", "family friendly", "city experiences" ],
                    keyword: ["City Experiences", "France", "Palace of Versailles", "Notre-Dame", "Paris"],
                    createdBy: "649d3118612bcb54a04af5ae" // user1
                }
            ])
        }
    })
}).catch(error => {
    console.log(error);
}).finally(() => { // .finally(executeCodeRegardles)
    console.log("Operation finished - itinController.js has loaded")
})

router.all("/:id", (request, response, next) => {
    itinerariesCollection.findOne({ _id: new ObjectId(request.params.id)}).then((item) => {
        if (!item) {
            response.status(404).json({ "message": `Item ${request.params.id} does not exist` })
        }
    });
    next();
})

//Get all items on bucket list
router.get("/:id", (_, response) => {
    itinerariesCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

//Post challenge
router.post("/", (request, response) => {
    itinerariesCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

//Delete challenge
router.delete("/:id", (request, response) => {
    itinerariesCollection.deleteOne({ _id: new ObjectId(request.params.id)}).then((_) => {
        response.json();
    });
});

module.exports = router;