import express from "express";
import db from "./config/databaseConnection.js";
import registerRoute from "./routes/registerRouter.js";
import loginRoute from "./routes/loginRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logoutRouter from "./routes/logoutRouter.js";
import viewProductRouter from "./routes/viewProductRouter.js";
import addToCartRouter from "./routes/addToCartRouter.js";
import addProductRouter from "./routes/addProductRouter.js";
import deleteProductRouter from "./routes/deleteProductRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", registerRoute);
app.use("/user", loginRoute);
app.use("/user", logoutRouter);
app.use("/user", addToCartRouter);

app.use("/", viewProductRouter);

app.use("/admin", addProductRouter);
app.use("/admin", deleteProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});