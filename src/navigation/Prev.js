//Компонент, для отображения определенной gif на mainmenu
import "../App.css";
import gif1 from "../gifies/1.gif";
import gif2 from "../gifies/2.gif";
import gif3 from "../gifies/3.gif";
import gif4 from "../gifies/4.gif";
import gif5 from "../gifies/5.gif";
import gif6 from "../gifies/6.gif";
import gif7 from "../gifies/7.gif";
import gif8 from "../gifies/8.gif";
import gif9 from "../gifies/9.gif";
import gif10 from "../gifies/10.gif";
import gif11 from "../gifies/11.gif";
import gif12 from "../gifies/12.gif";
import React, { useState, useEffect } from "react";

function Prev(props) {
  //
  //Изначально, устанавливаем gif1
  //
  const [currentGif, setCurrentGif] = useState(() => {
    const storedGif = localStorage.getItem("currentGif");
    return storedGif || gif1; // Если нет сохраненной gif, используем gif1
  });
  //
  //Хук, который при выполнении выбирает случайную gif (работает лишь в том случае, если же трек был)
  //поменян на другой (ПАУЗА / ПРОИГРЫВАНИЕ НЕ СЧИТАЮТСЯ)
  //
  useEffect(() => {
    if (props.isRandom) {
      const gifs = [
        gif1,
        gif2,
        gif3,
        gif4,
        gif5,
        gif6,
        gif7,
        gif8,
        gif9,
        gif10,
        gif11,
        gif12,
      ];
      const randomIndex = Math.floor(Math.random() * gifs.length);
      const randomGif = gifs[randomIndex];

      //Сохраняем текущую gif в localStorage
      localStorage.setItem("currentGif", randomGif);

      setCurrentGif(randomGif);
      props.isHandleRand();
    }
  }, [props.isRandom]);
  return (
    <div
      className="prev_s"
      style={{
        backgroundImage: props.isGif ? `url("${currentGif}")` : "none",
      }}
    ></div>
  );
}

export default Prev;
