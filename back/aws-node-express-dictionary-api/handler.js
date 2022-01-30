require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const partOfSpeechRouter = require("./Routes/partOfSpeech");
const wordRouter = require("./Routes/word");

//* Express app
const app = express();

//! CORS
app.use(cors());

//* For testing
// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello from root!",
//   });
// });

app.use("/part-of-speech", partOfSpeechRouter);
app.use("/", wordRouter);

//* 404 handling
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

//* For local use
app.listen("3001", () => {
  console.log("Listening to port 3001: http://localhost:3001");
});

//* For serverless use
//module.exports.handler = serverless(app);
