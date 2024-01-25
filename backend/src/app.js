import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import messageRoutes from "./routes/message.routes.js"
import morgan from "morgan"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
morgan("dev")
// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

export default app;