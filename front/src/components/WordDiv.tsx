import React from "react";
import WordDescription from "./WordDescription";

export default function WordDiv(props: WordType) {
  return (
    <div className="wordDiv">
      <h4>{props.word}</h4>
      <WordDescription definitions={props.definitions} pos={props.pos} />
    </div>
  );
}
