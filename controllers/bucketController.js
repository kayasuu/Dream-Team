const express = require("express");
const router = express.Router();
require("dotenv").config();  

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

let bucketCollection;

//initialise DB - updated
mongoClient.connect().then(_ => {
    const db = mongoClient.db("bucket-list");
    db.dropCollection("bucket-list-data");
    bucketCollection = db.collection("bucket-list-data");

    bucketCollection.find().toArray()
    .then(docs => {
        if (docs.length < 1) {
            bucketCollection.insertMany([
                {   // user1 bucket list items
                    name: "Machu Picchu", 
                    description: "5th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg", 
                    activity: "Hike",
                    createdBy: "649d302a0f786ea868ba0286"
                },
                {
                    name: "Vinicunca", 
                    description: "The Rainbow Mountain or Vinicunca is a mountain near Cusco in Peru", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Rainbow_Mountain_Peru.jpg", 
                    activity: "Hike",
                    createdBy: "649d302a0f786ea868ba0286"
                },
                { 
                    name: "Salar de Uyuni", 
                    description: "Salar de Uyuni is the world's largest salt flat, or playa, at over 10,000 square kilometres (3,900 sq mi) in area.", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Salar_de_Uyuni%2C_Bolivia%2C_2016-02-04%2C_DD_16-18_HDR.JPG/2560px-Salar_de_Uyuni%2C_Bolivia%2C_2016-02-04%2C_DD_16-18_HDR.JPG", 
                    activity: "Hike",
                    createdBy: "649d302a0f786ea868ba0286"
                },
                {   // user2 bucket list items
                    name: "Eiffel Tower", 
                    description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.", 
                    image: "https://i.natgeofe.com/k/6d4021bf-832e-49f6-b898-27b7fcd7cbf7/eiffel-tower-ground-up.jpg?w=636&h=424", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5af"
                },
                {
                    name: "The Lourve", 
                    description: "The Louvre or the Louvre Museum is a national art museum in Paris, France", 
                    image: "https://th-thumbnailer.cdn-si-edu.com/RqxjpcWzxMdN17OWtqJJsGjxDBE=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/12/d0/12d08a47-a37c-4df8-a448-95fba1dd6c15/louvre.jpg", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5af"
                },
                { 
                    name: "Arc de Triomphe", 
                    description: "The Arc de Triomphe honours those who fought and died for France in the French Revolutionary and Napoleonic Wars, with the names of all French victories and generals inscribed on its inner and outer surfaces.", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/1920px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5af"
                },
                {   // user3 bucket list items
                    name: "Colosseum", 
                    description: "The Colosseum is an elliptical amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum.", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1920px-Colosseo_2020.jpg", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5b0"
                },
                {
                    name: "Trevi Fountain", 
                    description: "The Trevi Fountain is an 18th-century fountain in the Trevi district in Rome, Italy, designed by Italian architect Nicola Salvi and completed by Giuseppe Pannini in 1762 and several others", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/1920px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5b0"
                },
                { 
                    name: "St. Peter's Basilica", 
                    description: "The Saint Peter's Basilica is a church built in the Renaissance style located in Vatican City, the papal enclave that is within the city of Rome, Italy.", 
                    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg", 
                    activity: "City Experience",
                    createdBy: "649d3118612bcb54a04af5b0"
                }
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