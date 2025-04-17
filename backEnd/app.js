import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/matches/:division', async (req, res) => {
    const division = req.params.division;


    console.log("Requesting URL:");

    const key = Buffer.from(process.env.API_KEY).toString('base64');
    try {
        const response = await axios.get(
            `https://ftc-api.firstinspires.org/v2.0/2024/schedule/${division}/qual/hybrid`,
            {
                headers: {
                    'Authorization': `Basic ${key}`
                }
            }
        );
        console.log("Received response from FTC API");
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
