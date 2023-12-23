import "../App.css";
import React, { useState } from "react";

function PlayButton() {
  const [isPlay, setIsPlay] = useState(false);
  var this_mode;

  function handleIsPlay() {
    if (isPlay) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
  }
  //Пауза
  if (isPlay) {
    this_mode = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    );
  }
  //Проигрыш
  else {
    this_mode = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    );
  }
  return (
    <div className="play_button" onClick={handleIsPlay}>
      {this_mode}
    </div>
  );
}

export default PlayButton;
