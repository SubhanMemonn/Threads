import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { PORT } from "./constants.js";
import connectDB from "./db/index.js";
import messageRoutes from "./routes/message.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./utils/socket.js";
dotenv.config({ path: "./env" });


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}));

const __dirname = path.resolve()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
morgan("dev")

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "../Frontend/dist")))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
// })
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server ready at port ${PORT}`)
    })
}).catch((error) => {
    console.log("Err while connent with server", error);
})