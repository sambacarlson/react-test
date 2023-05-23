import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { gameProps } from "../props/props";
import NavBar from "../components/NavBar";

export default function Games() {
  const [gameFeed, setGameFeed] = useState<gameProps[]>();
  const [gameCategories, setGameCategories] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("top");
  useEffect(() => {
    fetch("http://stage.whgstage.com/front-end-test/games.php")
      .then((response) => response.json())
      .then((data) => {
        setGameFeed(data);
        const categorySet = new Set<string>();
        data.forEach((game: gameProps) => {
          game.categories.forEach((category: string) =>
            categorySet.add(category)
          );
        });
        setGameCategories(Array.from(categorySet));
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <div className="Games">
      <NavBar
        titles={gameCategories || []}
        selectFn={(title: string) => {
          setCurrentSelection(title);
        }}
        selected={currentSelection}
      />
      <div className="gameFeed">
        {gameFeed?.map(
          (game) =>
            game.categories.includes(currentSelection) && (
              <GameCard
                key={game.id + game.name}
                id={game.id}
                name={game.name}
                categories={game.categories}
                image={game.image}
                currentSelection={currentSelection}
              />
            )
        )}
      </div>
    </div>
  );
}
