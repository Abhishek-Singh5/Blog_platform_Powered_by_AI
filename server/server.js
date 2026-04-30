import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import cookieParser from "cookie-parser";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
// import interractionRoutes from "./routes/interaction.route.js"
// import recommendationRoutes from "./routes/recommendation.route.js";


const app = express();

await connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // or your frontend URL
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json())


// Routes
app.get('/', (req, res) => res.send("API is Working Now !!"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/email', emailRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// app.use("/api/interaction",     interactionRoutes);
// app.use("/api/recommendations", recommendationRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Backend is Working Now 3000 PORT !!');
});


export default app;