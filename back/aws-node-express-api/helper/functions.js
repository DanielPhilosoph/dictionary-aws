function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const splittedLetters = letters.split("");
  return splittedLetters[getRandomInt(splittedLetters.length - 1)];
}

module.exports = { getRandomInt, getRandomLetter };
