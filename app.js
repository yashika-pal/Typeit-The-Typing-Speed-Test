const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
const API_KEY = process.env.API_KEY;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.get('/generate', async(req, res) => {
    const prompt = "Generate a random sentences having approx 15 words and each word having 5 characters.";
    async function generateContent() {
        try {
            const result = await model.generateContent(prompt);
            const generatedText = await result.response.text(); 
            res.send(generatedText);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    }
    generateContent();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

