const AWS = require("aws-sdk");

//! ---- Const values -----

const TABLE_NAME = "dictionary";
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = "eu-west-3";

//! -----------------------

//* Config DB and updating AWS config
const config = {
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
};
const docClient = new AWS.DynamoDB.DocumentClient(config);
AWS.config.update(config);

//* JSON of part of speech strings
//? Used to transform long version of part of speech to short
const partOfSpeechMap = {
  adverb: "adv.",
  noun: "n.",
  verb: "v.",
  preposition: "prep.",
  conjunction: "conj.",
  interjection: "interj.",
  pronoun: "pron.",
};

module.exports = { TABLE_NAME, docClient, partOfSpeechMap };
