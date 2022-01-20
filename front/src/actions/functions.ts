import {
  RESET_CURRENT_WORDS,
  UPDATE_CURRENT_WORDS,
} from "../TypeScriptTypes/actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { getRandomPartOfSpeech } from "../helper/functions";

export async function searchWord(
  dispatch: Dispatch<any>,
  word: string,
  partOfSpeech: string
) {
  try {
    if (partOfSpeech === "default") partOfSpeech = "";
    if (word === "") return { error: "Word cant be null" };

    const response = await axios.get(
      `http://localhost:3001/${word}/${partOfSpeech}`
    );

    const action = {
      type: UPDATE_CURRENT_WORDS,
      payload: response.data.words,
    };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}

export async function getRandomWord(dispatch: Dispatch<any>) {
  try {
    const randomPartOfSpeech = getRandomPartOfSpeech();
    const response = await axios.get(
      `http://localhost:3001/part-of-speech/${randomPartOfSpeech}`
    );

    const action = {
      type: UPDATE_CURRENT_WORDS,
      payload: [response.data.word],
    };
    console.log("Response.data");
    if (!response.data.hasOwnProperty("word")) {
      console.log(response.data);
      return;
    }
    console.log(response.data);

    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}

export function resetCurrentWords(dispatch: Dispatch<any>) {
  const action = {
    type: RESET_CURRENT_WORDS,
  };
  dispatch(action);
}
