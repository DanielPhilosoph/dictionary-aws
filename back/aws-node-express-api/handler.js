require("dotenv").config();
const serverless = require("serverless-http");
const AWS = require("aws-sdk");
const express = require("express");
const { getRandomInt, getRandomLetter } = require("./helper/functions");

const app = express();

//! ---- Const values -----

const TABLE_NAME = "dictionary";

//! -----------------------

const config = {
  region: "eu-west-3",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
let docClient = new AWS.DynamoDB.DocumentClient(config);
AWS.config.update(config);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/part-of-speech/:part", async function getRandomWord(req, res, next) {
  try {
    //* Should set "randomWord" with random word, that has a specified part of speech
    //* if there is :part?letter then the word should start with this letter
    let randomWord = {};
    const getRandomWord = async (count) => {
      const hasLetterQueryParam = Boolean(req.query.letter);

      const letter = hasLetterQueryParam
        ? req.query.letter.split("")[0].toUpperCase()
        : getRandomLetter();

      const params = {
        TableName: TABLE_NAME,
        IndexName: "pos-word-index",
        KeyConditionExpression: "pos = :p and begins_with(word, :t )",
        ExpressionAttributeValues: {
          ":p": partOfSpeechMap[req.params.part],
          ":t": letter,
        },
        Limit: 100,
      };
      const response = await docClient.query(params).promise();

      //? If tried 5 times and still got nothing then return error
      if (count === 5) {
        console.log("GOT AN ERROR");
        return res.status(405).json({
          error: `Timeout, tried 5 times`,
        });
      }

      //? If haven't returned a thing
      if (response.Items.length === 0) {
        //? So try again
        await getRandomWord(count++);
      } else {
        //? if got something then return
        const index = getRandomInt(response.Items.length);
        //* Set "randomWord"
        randomWord = response.Items[index];
      }
    };
    await getRandomWord(0);
    return res.status(200).json({
      word: randomWord,
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
      words: response.Items,
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
