import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import SearchDiv from "./SearchDiv";
import WordDiv from "./WordDiv";
import { getRandomWord } from "../actions/functions";

export default function DictionaryMain() {
  const dispatch: Dispatch<any> = useDispatch();
  const state: StateType = useSelector((state: StateType) => state);

  useEffect(() => {
    const randomWord = async () => {
      await getRandomWord(dispatch);
    };
    randomWord();
  }, []);

  return (
    <div>
      <SearchDiv />
      <div className="dictionaryContainer">
        <div className="welcomeDiv">
          <div className="welcomeElementsDiv">
            <h2>Welcome!</h2>
            <h5>
              This english dictionary contains more then 110,000 words for{" "}
              <b>you</b> to discover and explore.
              <br />
              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "25px",
                }}
              >
                So jump right in!
              </p>
            </h5>
          </div>
        </div>
        <div>
          {state.currentWords.length === 0 ? "No words to display" : ""}
          {state.currentWords.map((word: WordType) => {
            return (
              <WordDiv
                key={word.pos}
                pos={word.pos}
                word={word.word}
                definitions={word.definitions}
              />
            );
          })}
          {/* //* All words goes here */}
          {/* <WordDiv /> */}
        </div>
      </div>
    </div>
  );
}
