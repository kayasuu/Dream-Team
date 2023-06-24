const express = require("express");
const router = express.Router();
require("dotenv").config();  
const { gptClassifySentiment } = require('../utilities/gptUtil');

router.post('/', async (request, response) => {
    const prompt = request.body.prompt;
    console.log('Received Prompt:', prompt);  
    try {
        const result = await gptClassifySentiment(prompt);
        console.log('GPT Result:', result);
        response.json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('Server error');
    }
});

module.exports = router;