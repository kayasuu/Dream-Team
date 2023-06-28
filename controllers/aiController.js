const express = require("express");
const router = express.Router();
require("dotenv").config();  
const { gptClassifySentiment } = require('../utilities/gptUtil');

router.post('/', async (request, response) => {
    const {prompt, systemPrompt} = request.body;
    console.log(request.body)

    try {
        const result = await gptClassifySentiment(prompt, systemPrompt);
        console.log('GPT Result:', result);
        response.json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('Server error');
    }
});

module.exports = router;