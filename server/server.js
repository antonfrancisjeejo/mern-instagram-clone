import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from "./dbModel.js";

const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1085995",
  key: "e722c7516032de1ddfaf",
  secret: "b402306168274027fe64",
  cluster: "ap2",
  usetls: true,
});

app.use(express.json());
app.use(cors());

const connectionUrl =
  "mongodb+srv://admin:admin@cluster0.xqxiy.mongodb.net/instagram?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB is connected");
  const changeStream = mongoose.connection.collection("posts").watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const postDetails = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log("Error");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/upload", (req, res) => {
  const body = req.body;
  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log("Server is up and running");
});
