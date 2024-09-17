import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config/config.js";
import dbConfig from "./config/dbConfig.js";
import { articleRoutes, userRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
dbConfig();

const corsOptions = {
  origin: ["http://localhost:5173", "https://news-aggregator-frontend-sigma.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/articles", articleRoutes);
app.use("/api/v1/auth", userRoutes);

const PORT = config.port || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
