export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function getRandomPartOfSpeech() {
  const partOfSpeechMap = [
    "adverb",
    "noun",
    "verb",
    "preposition",
    "conjunction",
    "interjection",
    "pronoun",
  ];
  return partOfSpeechMap[getRandomInt(partOfSpeechMap.length - 1)];
}
