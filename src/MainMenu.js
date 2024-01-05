import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Prev from "./navigation/Prev";
import Leng from "./navigation/LenAudio";
import React, { useState } from "react";

function MainMenu(props) {
  //
  //Состояние, для корректного отображения таймера и длительности музыки
  //

  return (
    <div
      className={`player ${props.isOpen ? "isOpenBurger" : "isCloseBurger"}`}
    >
      <Prev isRandom={props.isRand} isHandleRand={props.handleIsRand}></Prev>
      <Leng
        setCurLen={props.setCurLen}
        curLen={props.curLen}
        setIsTimer={props.setIsTimer}
        MUSIC_ARR={props.MUSIC_ARR}
        currentIndex={props.currentIndex}
        thisLeng={props.lengMusic}
        isPlaying={props.isPlaying}
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
          <LeftButton
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
          ></LeftButton>
          <PlayButton
            handleIsPlay={props.handleIsPlay}
            setIsTimer={props.setIsTimer}
            isRandom={props.handleIsRand}
            MUSIC_ARR={props.MUSIC_ARR}
            currentIndex={props.currentIndex}
            handleLengAudio={props.handleLengAudio}
            handleIsPlaying={props.handleIsPlaying}
            isPlay={props.isPlay}
          ></PlayButton>
          <RightButton
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
          ></RightButton>
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
