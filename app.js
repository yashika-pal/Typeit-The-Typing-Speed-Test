const express = require('express');
const app = express();
const port = 3000;
// const genai = require('google-generativeai');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
const API_KEY = process.env.API_KEY;
// Import the GoogleGenerativeAI library
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Create an instance of the Gemini model
const genAI = new GoogleGenerativeAI(API_KEY);

// Create the generative model with the appropriate model identifier
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.get('/generate', async(req, res) => {
    // Define the prompt to be passed to the model
    const prompt = "Generate a random sentences having approx 15 words and each word having 5 characters.";

    // Define an async function to generate the content
    async function generateContent() {
        try {
            // Generate content using the model
            const result = await model.generateContent(prompt);
            const generatedText = await result.response.text(); // Output the generated text
            res.send(generatedText);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    }

    // Call the function to generate content
    generateContent();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// // Define the prompt to be passed to the model
// const prompt = "Generate 10 random sentences having 15 words and each word having 5 characters.";

// // Define an async function to generate the content
// async function generateContent() {
//   try {
//     // Generate content using the model
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text()); // Output the generated text
//   } catch (error) {
//     console.error("Error generating content:", error);
//   }
// }

// // Call the function to generate content
// generateContent();
