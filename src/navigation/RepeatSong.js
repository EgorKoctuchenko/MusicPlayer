//Компонент для повторения одного и того же трека
import "../App.css";
import React, { useState, useEffect } from "react";

function RepeatSong(props) {
  return (
    <div className="repeat_fixing" onClick={props.handleRepeat}>
      <svg
        className={`"" ${props.isRepeat ? "repeatStyle" : ""}`}
        fill="#000000"
        height="40px"
        width="40px"
        version="1.1"
        viewBox="0 0 390 390"
      >
        <g>
          <g id="Group_Arrows">
            <path
              d="M72.18,192.479c6.641,0,12.03-5.39,12.03-12.03V84.206h199.595l-39.159,39.628c-4.728,4.752-4.728,12.439,0,17.191
			c4.728,4.74,12.391,4.74,17.119,0l59.43-60.139c4.728-4.752,4.728-12.439,0-17.191l0,0l-59.43-60.139
			c-4.728-4.74-12.391-4.74-17.119,0s-4.728,12.439,0,17.179l38.942,39.411H72.18c-6.641,0-12.03,5.39-12.03,12.03v108.273
			C60.15,187.089,65.54,192.479,72.18,192.479z"
            />
            <path
              d="M312.786,192.395c-6.641,0-12.03,5.39-12.03,12.03v96.615H100.728l39.508-40.061c4.728-4.752,4.728-12.463,0-17.215
			c-4.728-4.752-12.391-4.752-17.119,0L64,303.723c-5.041,4.764-5.077,12.969,0,17.733l59.129,59.947
			c4.728,4.752,12.391,4.752,17.119,0s4.728-12.463,0-17.215l-38.533-39.074h211.072c6.641,0,12.03-5.39,12.03-12.03V204.437
			C324.817,197.784,319.427,192.395,312.786,192.395z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default RepeatSong;
