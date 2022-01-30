const express = require("express");
const router = express.Router();

const {
  TABLE_NAME,
  docClient,
  partOfSpeechMap,
} = require("../dynamoDB/dynamoDB");

/**
 * * Route - /
 */

router.get("/:word/:partOfSpeech", async (req, res, next) => {
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
    return res.status(200).json({
      words: response.Items,
    });
  } catch (error) {
    return res.status(405).json({
      error: `Could not query. Error: ${error}`,
    });
  }
});

router.get("/:word", async (req, res, next) => {
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

module.exports = router;
