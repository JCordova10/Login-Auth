import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import loginRoutes from "./routes/logins.js"


const app = express();
const PORT = process.env.Port || 5050;

app.use(cors());
app.use(express.json());

//route handler
app.use("/login", loginRoutes);

//connect to db
app.listen(PORT, () => {
    console.log(`Server is running non port: ${PORT}`)
})

