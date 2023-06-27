const gptClassifySentiment = async (prompt) => {
    const { Configuration, OpenAIApi } = require("openai");
    require("dotenv").config(); 

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    //comment out?
    const axios = require('axios');
     
    //Comment this out and declare system prompt in separate js file, depending on the function :)
    const systemPrompt = `
    You are an AI trained to provide top-tier travel expertise of a professional travel agent. 
    Your mission is to reflect on user input and come up with an itinerary for their trip. Split this itinerary up by morning, afternoon, evening.
    Write an itinerary for each day, based on input below and do NOT ask a question.
    `;
    //

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ],
        // max_tokens: 20,
        temperature: 0
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };

    try {
        const response = await openai.createChatCompletion(data);
        console.log('OpenAI API Response:', response);  // Updated line
        let r = response.data.choices[0].message.content;
        if (r == '') {
            r = 'N/A';
        }
        return r;
    } catch (err) {
        console.error('OpenAI API Error:', err);  // Updated line
    }
};

module.exports = {
    gptClassifySentiment
};