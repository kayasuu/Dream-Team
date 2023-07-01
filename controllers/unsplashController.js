const express = require("express");
const router = express.Router();
require("dotenv").config();  
const { getImages } = require('../utilities/unsplash');

router.get('/:source', async (request, response) => {
    const {source} = request.params;
    console.log(request.params)

    try {
        const result = await getImages(source);
        console.log('Image:', result);
        response.json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('Server error');
    }
});

module.exports = router;