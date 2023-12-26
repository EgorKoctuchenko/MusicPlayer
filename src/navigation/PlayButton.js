import "../App.css";
import React, { useState, useRef, useEffect } from "react";

function PlayButton(props) {
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(new Audio());
  const currentMusic = props.MUSIC_ARR[props.currentIndex];

  console.log("Current Index:", props.currentIndex);
  console.log("Current Music:", currentMusic);
  const handleIsPlay = () => {
    setIsPlay((prevIsPlay) => !prevIsPlay);

    if (currentMusic) {
      // Проверяем, является ли currentMusic.file действительным Blob или File
      if (currentMusic.file instanceof Blob) {
        console.log("Current Music File Type:", currentMusic.file.type);

        // Проверяем, является ли файл аудиофайлом
        if (currentMusic.file.type.startsWith("audio/")) {
          const objectURL = URL.createObjectURL(currentMusic.file);
          audioRef.current.src = objectURL;
          audioRef.current.load();
          if (!isPlay) {
            // Если статус isPlay стал true, начинаем воспроизведение
            audioRef.current.play().catch((error) => {
              console.error("Ошибка воспроизведения:", error);
            });
          } else {
            // Если статус isPlay стал false, останавливаем воспроизведение
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        } else {
          console.error("Недопустимый тип аудиофайла:", currentMusic.file.type);
        }
      } else {
        console.error("Файл не является Blob или File:", currentMusic.file);
        console.log("Тип объекта:", typeof currentMusic.file);
      }
    } else {
      console.error("currentMusic не определен.");
    }
  };

  //Пауза
  const playPauseIcon = isPlay ? (
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
  ) : (
    //Проигрыш
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
  return (
    <div className="play_button" onClick={handleIsPlay}>
      {playPauseIcon}
    </div>
  );
}

export default PlayButton;
