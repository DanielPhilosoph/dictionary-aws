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

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function shortPosToFullPos(pos: string) {
  const partOfSpeechMap = [
    { "adv.": "adverb" },
    { "n.": "noun" },
    { "v.": "verb" },
    { "prep.": "preposition" },
    { "conj.": "conjunction" },
    { "interj.": "interjection" },
    { "pron.": "pronoun" },
  ];
  let returnedPartOfSpeech = "";
  partOfSpeechMap.forEach((partOfSpeech, i) => {
    if (Object.keys(partOfSpeech)[0] === pos) {
      returnedPartOfSpeech = Object.values(partOfSpeech)[0];
    }
  });
  return returnedPartOfSpeech;
}
