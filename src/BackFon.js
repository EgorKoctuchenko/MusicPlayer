import "./App.css";
import React, { useEffect, useRef } from "react";

function BackFon(props) {
  const isPlayRef = useRef(props.isPlay);
  useEffect(() => {
    isPlayRef.current = props.isPlay;
  }, [props.isPlay]);
  //
  const isLoadingRef = useRef(props.isLoading);
  useEffect(() => {
    isLoadingRef.current = props.isLoading;
  }, [props.isLoading]);
  //
  useEffect(() => {
    if (props.isImagine) {
      const listItems = document.querySelectorAll(".this_column_back");

      const updateHeight = () => {
        listItems.forEach((item) => {
          if (isPlayRef.current && !isLoadingRef.current) {
            const newHeight = randomHeight();
            item.style.transition = "0s";
            item.style.height = `${newHeight}%`;

            setTimeout(() => {
              const transitionDuration = (parseFloat(newHeight) / 1000) * 8;
              item.style.transition = `${transitionDuration + 0.15}s`;
              item.style.height = "1.5%";
            }, 10);
          } else {
            item.style.transition = `0.4s`;
            item.style.height = "1.5%";
          }
        });
        setTimeout(updateHeight, 250);
      };
      updateHeight();
      return () => clearTimeout();
    }
  }, [props.isPlay]);

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
