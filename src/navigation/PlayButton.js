import "../App.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function PlayButton(props) {
  //console.log("Current Music File:", currentMusic.file);

  const playPauseIcon = props.isPlay ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );

  return (
    <div className="play_button" onClick={props.handleIsPlay}>
      {playPauseIcon}
    </div>
  );
}

export default PlayButton;
