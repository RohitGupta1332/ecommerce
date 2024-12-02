import express from "express";
import cors from "cors";
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
import categoryRouter from "./routes/categoryRouter.js";
import viewCartRouter from "./routes/viewCartRouter.js";
import removeCartItemRouter from "./routes/removeCartItemRouter.js";
import searchProductRouter from "./routes/searcProductRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500", 
    credentials: true 
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", registerRoute);
app.use("/user", loginRoute);
app.use("/user", logoutRouter);
app.use("/user", addToCartRouter);
app.use("/user", viewCartRouter);
app.use("/user", removeCartItemRouter);

app.use("/", searchProductRouter);
app.use("/", viewProductRouter);
app.use("/category", categoryRouter);

app.use("/admin", addProductRouter);
app.use("/admin", deleteProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});