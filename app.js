import express from 'express'
import { initializeDB } from './db/database.js';
import cors from 'cors'
import novenyRoutes from "./routes/novenyek.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/plants", novenyRoutes)

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => {console.log("Server running on localhost/3000")})
}

startServer();
