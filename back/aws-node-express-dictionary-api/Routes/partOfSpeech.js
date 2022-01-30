const express = require("express");
const router = express.Router();

const { getRandomInt, getRandomLetter } = require("../helper/functions");
const {
  TABLE_NAME,
  docClient,
  partOfSpeechMap,
} = require("../dynamoDB/dynamoDB");

/**
 * * Route - /part-of-speech
 */

router.get("/:part", async function getRandomWord(req, res) {
  try {
    //* Should set "randomWord" with random word, that has a specified part of speech
    //* If there is :part?letter then the word should start with this letter
    let randomWord = {};

    //* Function getRandomWord - returns random word from dynamoDB
    const getRandomWord = async (count) => {
      const hasLetterQueryParam = Boolean(req.query.letter);

      //* If has letter then upper case this letter (ignores any irrelevant chars)
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

module.exports = router;
