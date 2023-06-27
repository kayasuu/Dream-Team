const gptClassifySentiment = async (prompt, systemPrompt) => {
    const { Configuration, OpenAIApi } = require("openai");
    require("dotenv").config(); 

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    //comment out?
    const axios = require('axios');
    

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