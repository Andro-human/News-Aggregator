import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConfig from "./config/dbConfig.js";
import articleRoutes from "./routes/articleRoutes.js";
import dotenv from 'dotenv'

dotenv.config();
dbConfig();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", articleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
