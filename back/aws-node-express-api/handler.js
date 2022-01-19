const serverless = require("serverless-http");
const AWS = require("aws-sdk");
const express = require("express");
const { getRandomInt } = require("./helper/functions");

const app = express();

//! ---- Const values -----

const TABLE_NAME = "dictionary";

//! -----------------------

const config = {
  region: "eu-west-3",
  accessKeyId: "AKIA3XPJ7UXXXRBXI535",
  secretAccessKey: "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",
};
let docClient = new AWS.DynamoDB.DocumentClient(config);
AWS.config.update(config);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/part-of-speech/:part", async (req, res, next) => {
  try {
    //* Should return random word with the specified part of speech
    //* if there is :part?letter then the word should start with this letter
    const params = {
      TableName: TABLE_NAME,
      IndexName: "pos-word-index",
      KeyConditionExpression: "pos = :p AND word between :start and :end",
      ExpressionAttributeValues: {
        ":p": req.params.part,
        ":start": "A",
        ":end": "B",
      },
    };
    const response = await docClient.query(params).promise();
    // const randomWord = response.Items[getRandomInt(100)];
    return res.status(200).json({
      LOL: response.Items,
    });
  } catch (error) {
    return res.status(405).json({
      error: `Could not query. Error: ${error}`,
    });
  }
});

app.get("/:word/:partOfSpeech", async (req, res, next) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: `word = :w and pos = :p`,
      ExpressionAttributeValues: {
        ":w": req.params.word.toUpperCase(),
        ":p": partOfSpeechMap[req.params.partOfSpeech],
      },
    };
    const response = await docClient.query(params).promise();
    // const randomWord = response.Items[getRandomInt(100)];
    return res.status(200).json({
      words: response.Items,
    });
  } catch (error) {
    return res.status(405).json({
      error: `Could not query. Error: ${error}`,
    });
  }
});

app.get("/:word", async (req, res, next) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: `word = :w`,
      ExpressionAttributeValues: {
        ":w": req.params.word.toUpperCase(),
      },
    };
    const response = await docClient.query(params).promise();
    return res.status(200).json({
      word: response.Items,
    });
  } catch (error) {
    return res.status(405).json({
      error: `Could not query. Error: ${error}`,
    });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen("3001", () => {
  console.log("Listening to port 3001: http://localhost:3001");
});

//module.exports.handler = serverless(app);

const partOfSpeechMap = {
  adverb: "adv.",
  noun: "n.",
  verb: "v.",
  preposition: "prep.",
  conjunction: "conj.",
  interjection: "interj.",
  pronoun: "pron.",
};
