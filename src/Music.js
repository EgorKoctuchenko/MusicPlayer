import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Leng from "./navigation/LenAudio";
import React, { useState } from "react";

function Music(props) {
  const [fileInput, setFileInput] = useState(null);

  const handleDivClick = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div
      className={`player ${props.isOpen ? "isOpenBurger" : "isCloseBurger"}`}
    >
      <div className="upcase">
        <Leng
          className="leng_music"
          MUSIC_ARR={props.MUSIC_ARR}
          currentIndex={props.currentIndex}
        ></Leng>
        <div className="control_buttons">
          <LeftButton></LeftButton>
          <PlayButton
            MUSIC_ARR={props.MUSIC_ARR}
            currentIndex={props.currentIndex}
          ></PlayButton>
          <RightButton></RightButton>
        </div>
      </div>
      <div className="botcase">
        {props.MUSIC_ARR.map((music, index) => (
          <div
            className={`loadedMusic ${
              index % 2 === 0 ? "isEqTwo" : "isNotEqTwo"
            }`}
            key={index}
            onClick={() => props.getIndex(index)}
          >
            {music.name}
          </div>
        ))}
      </div>
      <div className="addmusic" onClick={handleDivClick}>
        <svg
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
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={props.onFileChange}
          ref={(input) => setFileInput(input)}
        />
      </div>
    </div>
  );
}

export default Music;
