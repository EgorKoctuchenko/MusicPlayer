import "../App.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Howl } from "howler";

function PlayButton(props) {
  const [isPlay, setIsPlay] = useState(false);
  const sound = useRef(null);
  const currentMusic = props.MUSIC_ARR[props.currentIndex];
  //console.log("Current Music File:", currentMusic.file);

  const initializeSound = () => {
    if (sound.current) {
      sound.current.stop(); // Останавливаем предыдущий звук
      sound.current.unload(); // Освобождаем ресурсы
    }
    if (currentMusic && currentMusic.file) {
      sound.current = new Howl({
        src: [currentMusic.file],
        format: ["mp3"],
        onload: () => {
          props.handleLengAudio(sound.current.duration());
          setIsPlay(true);
          sound.current.play();
          props.handleIsPlaying(true);
        },
        onend: () => {
          setIsPlay(false);
        },
        onloaderror: (id, error) => {
          console.error(
            "Error loading sound. File:",
            currentMusic.file,
            "Error:",
            error
          );
        },
      });
    } else {
      console.error("Current music or file is undefined:", currentMusic);
    }
  };

  useEffect(() => {
    initializeSound();
  }, [props.currentIndex]);

  const handleIsPlay = () => {
    setIsPlay((prevIsPlay) => !prevIsPlay);

    if (sound.current) {
      if (isPlay) {
        sound.current.pause();
        props.handleIsPlaying(false);
      } else {
        sound.current.play();
        props.handleIsPlaying(true);
      }
    }
  };

  const playPauseIcon = isPlay ? (
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
    <div className="play_button" onClick={handleIsPlay}>
      {playPauseIcon}
    </div>
  );
}

export default PlayButton;
