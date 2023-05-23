import React, { useEffect, useState } from "react";
import { gameProps } from "../props/props";

export default function GameCard(props: gameProps) {
  const [hovered, setHovered] = useState<boolean>();
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    let catArray = props.categories;
    let selCat = props.currentSelection;
    // we will show top for games that are both in top and new
    selCat !== "top" && catArray.includes("top") && setCategory("top");
    selCat !== "top" && catArray.includes("new") && setCategory("new");
    selCat !== "new" && catArray.includes("top") && setCategory("top");
    selCat !== "new" && catArray.includes("new") && setCategory("new");
    selCat === "new" && catArray.includes("new") && setCategory("");
    selCat === "new" && catArray.includes("top") && setCategory("top");
    selCat === "top" && catArray.includes("top") && setCategory("");
    selCat === "top" && catArray.includes("new") && setCategory("new");
  }, [props.categories, props.currentSelection]);
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className="GameCard"
    >
      {category && (
        <div className="gameCardRibbon">
          <p>{category}</p>
        </div>
      )}
      {props.jackpot!==undefined && (
        <div className="gameCardJackpot">
          <h5>&pound;{props.jackpot}</h5>
        </div>
      )}
      {hovered && (
        <div className="gameCardPlayContainer">
          <h5 className="gameCardName">{props.name}</h5>
          <p className="gameCardPlayButton">PLAY</p>
        </div>
      )}
      <img
        src={props.image}
        alt={props.name}
        className={`gameCardImage ${hovered && "gameCardHovered"}`}
      />
    </div>
  );
}
