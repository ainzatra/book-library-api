import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

mongoose.connect(mongoURI).then(() => {
    app.listen(PORT, () => {
        process.stdout.write("\x1Bc");

        console.log("===============================================");
        console.log(`  Server is running on http://localhost:${PORT}`);
        console.log("===============================================");
    });
}).catch((err) => {
    console.log(err);
});