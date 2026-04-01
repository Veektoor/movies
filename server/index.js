import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import responseHandler from "./src/handlers/response.handler.js";

const app = express();

const requiredEnv = ["MONGODB_URL", "TOKEN_SECRET"];
const missingEnv = requiredEnv.filter(name => !process.env[name]);

if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const corsOptions = {};
if (process.env.CLIENT_URL) corsOptions.origin = process.env.CLIENT_URL;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

app.use((req, res) => responseHandler.notfound(res));
app.use((err, req, res, next) => {
  console.error(err);
  responseHandler.error(res);
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

//test