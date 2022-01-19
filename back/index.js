const AWS = require("aws-sdk");
const fs = require("fs");
//const { nanoid } = require("nanoid");

const config = {
  region: "eu-west-3",
  accessKeyId: "AKIA3XPJ7UXXXRBXI535",
  secretAccessKey: "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",
};

let docClient = new AWS.DynamoDB.DocumentClient(config);
AWS.config.update(config);

let results = [];

const data = fs.readFileSync("./assets/dictionary.json");

results = [...JSON.parse(data.toString())];

const insert = async () => {
  for (let wordObj of results) {
    const params = {
      TableName: "dictionary",
      Item: wordObj,
    };

    await docClient.put(params).promise();
  }
};
insert();
