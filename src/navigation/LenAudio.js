import "../App.css";
import React, { useEffect, useState } from "react";

function LenAudio(props) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setCurrentTime(0); // Сброс текущего времени
  }, [props.thisLeng]);

  useEffect(() => {
    // Запуск интервала при монтировании компонента
    if (props.isPlaying) {
      const intervalId = setInterval(() => {
        // Увеличиваем текущее время каждую секунду
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(intervalId);
    }
  }, [props.isPlaying]); // Зависимость теперь от статуса проигрывания музыки

  function formatTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);

    var formin = min < 10 ? "0" + min : min;
    var forsec = sec < 10 ? "0" + sec : sec;

    return formin + ":" + forsec;
  }

  var name_mus;
  if (props.currentIndex !== -1) {
    var result = formatTime(props.thisLeng);

    name_mus = props.MUSIC_ARR[props.currentIndex].name;
  } else {
    name_mus = "Nothing!";
  }

  return (
    <div>
      <div className="time_leng">
        <div className="current_time">{formatTime(currentTime)}</div>
        <div className="name_audio">{name_mus}</div>
        <div className="end_time">{result}</div>
      </div>
      <div className="length_audio">
        <div className="current_leng"></div>
      </div>
    </div>
  );
}

export default LenAudio;
