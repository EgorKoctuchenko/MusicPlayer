//Компонент для визуализации заднего фона (прыгающих прямоугольников)
import "./App.css";
import React, { useState, useEffect } from "react";

function BackFon(props) {
  useEffect(() => {
    if (props.isImagine) {
      const listItems = document.querySelectorAll(".this_column_back");
      const updateHeight = () => {
        listItems.forEach((item) => {
          item.style.height = "1.5%";
        });
      };
      //Запускаем функцию обновления высоты
      updateHeight();

      // чистка таймера при размонтировании компонента
      return () => clearTimeout();
    }
  }, []);

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
