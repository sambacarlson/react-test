import React, { useEffect, useState } from "react";
import { navProps } from "../props/props";

export default function NavBar(props: navProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  // the useEffect bellow makes sure the navbar elements will always show on larger screen sizes
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="NavComponent">
      <div
        className="menuButton"
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
            />
          </svg>
        </div>
        <p>{props.selected}</p>
      </div>
      {(showMenu || screenWidth >= 1000) && (
        <div className="navbarContents">
          {props.titles.map((title) => (
            <div
              key={props.titles.indexOf(title) + title}
              onClick={() => {
                props.selectFn(title);
                setShowMenu(false);
              }}
              className={props.selected === title ? "selectedMenuItem" : ""}
            >
              <p>{title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
