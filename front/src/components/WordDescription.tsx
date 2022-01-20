import React from "react";

type Props = {
  definitions: string[];
  pos: string;
};

export default function WordDescription(props: Props) {
  return (
    <div className="wordDescriptionDiv">
      <h5 className="posH5">{props.pos}</h5>
      {props.definitions.map((des) => {
        return <p key={des}>{des}</p>;
      })}
    </div>
  );
}
