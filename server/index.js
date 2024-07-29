import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import db from '../server/database/db.js'
import userRoutes from '../server/routes/user.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'
import path from 'path'
dotenv.config();

const app = express();

//middleware
app.use(express.json());


const PORT = process.env.PORT || 3000;

//database connection
db();

const __dirname = path.resolve();

app.use(cors({
    origin: '*'
}))

//routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', taskRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
})

app.get('/', (req,res) => res.send("this is homepage for backend server. Hellooooo"))

app.listen(PORT,() => 
{
    console.log("this is backend working seamlessly AT PORT : ", PORT)
})