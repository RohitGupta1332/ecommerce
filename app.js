import express from "express";
import db from "./config/databaseConnection.js";
import registerRoute from "./routes/registerRouter.js";
import loginRoute from "./routes/loginRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logoutRouter from "./routes/logoutRouter.js";
import viewProductRouter from "./routes/viewProductRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", registerRoute);
app.use("/user", loginRoute);
app.use("/user", logoutRouter);
app.use("/user", viewProductRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});