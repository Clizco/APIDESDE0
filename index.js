import dotenv from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import accountRouter from "./routes/account.js";
import userModel from "./schema/user-schema.js";

dotenv.config()

const PORT = process.env.PORT || 1500;
const expressApp = express()

expressApp.use(cookieParser());
expressApp.use(express.text());
expressApp.use(express.json());

expressApp.use("/account", accountRouter);


const bootsrap = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
   
     expressApp.listen(PORT, () => 
       console.log(`Servidor levantado en puerto ${PORT}`)
     );
   
   }
   
   bootsrap();