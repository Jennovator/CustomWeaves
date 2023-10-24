import express from 'express';
import * as dotenv from 'dotenv';
import {OpenAI} from 'openai';

dotenv.config(); //set-up environment variables

const router = express.Router(); // new additional routes

// configure the use of the API (Key from your account API keys)
const config = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// utilize the config and merge it with the openai api
const openai = new OpenAI(config);

// Route
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from AI ROUTES"})
})

// a route that will pass the prompt from the frontend to the server
router.route('/').post( async(req, res) => {
    try{
        const {prompt} = req.body;

        const response = await openai.createImage({
            prompt, // prompt from the frontend
            n: 1, // number of images to be processed
            size: '1024x1024', // size of the image
            response_format: 'b64_json' // base 64 json 
        });

        // get the image out of the response
        const image = response.data.data[0].b64_json;

        // pass the result image to the frontend
        res.status(200).json({ photo: image });

    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong"})
    }
})
export default router;
