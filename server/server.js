import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

await connectDB();

// Middleware
app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res) => res.send("API is Working Now !!"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/email', emailRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Backend is Working Now 3000 PORT !!');
});


export default app;