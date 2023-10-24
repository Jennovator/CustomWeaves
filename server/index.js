import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import aiRoutes from './routes/ai.routes.js';

dotenv.config(); //set-up environment variables

const app = express(); // set-up express ap
// set-up middlewares
app.use(cors());
app.use(express.json({ limit: "50mb"})) // specify the weight of the payload that it can send
// consume the ai routes from routes
app.use("/api/v1/ai", aiRoutes);

app.get('/', (req,res) => {
    res.status(200).json({ message: "Hello from AI"})
});

// listen on port 8080
app.listen(8080, () => console.log('Server has started on port 8080'));