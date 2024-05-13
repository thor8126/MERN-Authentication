import express from "express";
import dotenv from "dotenv";
import run from "./configs/db.js";
import router from "./routes/auth.js";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

dotenv.config();
run().catch(console.dir);

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
