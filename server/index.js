import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import serverless from "serverless-http";
import "dotenv/config";
import routes from "./src/routes/index.js";
import responseHandler from "./src/handlers/response.handler.js";
import { connectDatabase, getDatabaseStatus } from "./src/config/database.js";

const app = express();

const requiredEnv = ["MONGODB_URL", "TOKEN_SECRET", "TMDB_BASE_URL", "TMDB_KEY"];
const missingEnv = requiredEnv.filter(name => !process.env[name]);

if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://donmov.vercel.app"
];

const allowedOrigins = [
  ...new Set(
    [...defaultAllowedOrigins, ...(process.env.CLIENT_URL || "").split(",")]
      .map(origin => origin.trim())
      .filter(Boolean)
  )
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked origin: ${origin}`);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});

mongoose.connection.on("error", (error) => {
  console.error("Mongodb connection error:", error);
});

app.get("/api/v1/health", (req, res) => {
  responseHandler.ok(res, {
    status: "ok",
    database: getDatabaseStatus()
  });
});

app.use("/api/v1", routes);

app.use((req, res) => responseHandler.notfound(res));
app.use((err, req, res, next) => {
  console.error(err);
  responseHandler.error(res);
});

const port = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  connectDatabase().catch((err) => {
    console.error("Startup database connection failed:", err);
  });
}

export default serverless(app);
