import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Prev from "./navigation/Prev";
import Leng from "./navigation/LenAudio";
import React, { useState } from "react";

function MainMenu(props) {
  const [lengMusic, setLengMusic] = useState(0);
  const handleLengAudio = (thisLeng) => {
    setLengMusic(thisLeng);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const handleIsPlaying = (PlayStatus2) => {
    if (PlayStatus2) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`player ${props.isOpen ? "isOpenBurger" : "isCloseBurger"}`}
    >
      <Prev></Prev>
      <Leng
        MUSIC_ARR={props.MUSIC_ARR}
        currentIndex={props.currentIndex}
        thisLeng={lengMusic}
        isPlaying={isPlaying}
      ></Leng>
      <div className="pre_buttons">
        <svg
          className="isLeft"
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="18 2.8 5 12 19 22 19 2" fill="#6f46dd"></polygon>
        </svg>
        <div className="buttons">
          <LeftButton></LeftButton>
          <PlayButton
            MUSIC_ARR={props.MUSIC_ARR}
            currentIndex={props.currentIndex}
            handleLengAudio={handleLengAudio}
            handleIsPlaying={handleIsPlaying}
          ></PlayButton>
          <RightButton></RightButton>
        </div>
        <svg
          className="isRight"
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="6 1.8 19 12 6 22 6 3" fill="#6f46dd"></polygon>
        </svg>
      </div>
    </div>
  );
}

export default MainMenu;
