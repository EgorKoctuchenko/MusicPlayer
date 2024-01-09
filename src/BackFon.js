//Компонент для визуализации заднего фона (прыгающих прямоугольников)
import "./App.css";
import React, { useState, useEffect } from "react";

function BackFon(props) {
  useEffect(() => {
    if (props.isImagine) {
      const listItems = document.querySelectorAll(".this_column_back");
      const updateHeight = () => {
        listItems.forEach((item) => {
          const newHeight = randomHeight();
          item.style.transition = "0s";
          item.style.height = `${newHeight}%`;

          setTimeout(() => {
            const transitionDuration = (parseFloat(newHeight) / 1000) * 8;
            item.style.transition = `${transitionDuration}s`;
            item.style.height = "1.5%";
          }, 10);
        });

        //Запускаем функцию обновления высоты через 250мс
        setTimeout(updateHeight, 250);
      };

      //Запускаем функцию обновления высоты
      updateHeight();

      // чистка таймера при размонтировании компонента
      return () => clearTimeout();
    }
  }, []); //Пустой массив зависимостей, чтобы useEffect выполнился только один раз при монтировании компонента

  //Рандомное число от 15 до 100 (% высоты)
  const randomHeight = () => {
    if (props.isFullPage) {
      return Math.floor(Math.random() * 86) + 15;
    } else {
      return Math.floor(Math.random() * 21) + 10;
    }
  };

  return (
    <div className="wrap_fone">
      <ul className="column_back">
        {Array.from({ length: props.isRectangle }, (_, index) => (
          <li key={index} className="this_column_back"></li>
        ))}
      </ul>
    </div>
  );
}

export default BackFon;
