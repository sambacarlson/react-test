import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { gameProps, jackpotProps } from "../props/props";
import NavBar from "../components/NavBar";

export default function Games() {
  const [gameFeed, setGameFeed] = useState<gameProps[]>();
  const [jackpotFeed, setJackpotFeed] = useState<jackpotProps[]>();
  const [gameCategories, setGameCategories] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("top");

  //get the gameFeed
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
        console.error(error);
      });
  }, []);

  // get the jackpot Feed every 20 seconds
   useEffect(() => {
    console.log('fetching data---->')
   const interval =  setInterval(()=> {
      fetch("http://stage.whgstage.com/front-end-test/jackpots.php")
      .then((response) => response.json())
      .then((data) => {
          setJackpotFeed(data);
        })
      .catch((error) => {
          console.error(error);
        });
    }, 20000);
    return () => clearInterval(interval);
   }, [jackpotFeed]);

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
        {gameFeed?.map((game) => {
          let jackpot = undefined;
          const thisJackpot = Array.from(
            (jackpotFeed?? []).filter(jack => (jack.game === game.id))
          );
          jackpot = thisJackpot[0]?.amount;
          return (
            game.categories.includes(currentSelection) && (
              <GameCard
                key={game.id + game.name}
                id={game.id}
                name={game.name}
                categories={game.categories}
                image={game.image}
                currentSelection={currentSelection}
                jackpot={jackpot}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
