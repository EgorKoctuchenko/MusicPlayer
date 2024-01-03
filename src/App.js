import "./App.css";
import "./MainMenu";
import MainMenu from "./MainMenu";
import NavMenu from "./navigation/NavMenu";
import React, { useState, useEffect } from "react";
import Music from "./Music";

function App() {
  localStorage.clear();
  //
  //Массив музык
  //
  //const storedMusicArrString = localStorage.getItem("MUSIC_ARR");
  //const storedMusicArr = storedMusicArrString
  //? JSON.parse(storedMusicArrString)
  //: [];
  const [MUSIC_ARR, setMUSIC_ARR] = useState([]);

  const updateMUSIC_ARR = (newMusicArr) => {
    setMUSIC_ARR(newMusicArr);
    localStorage.setItem("MUSIC_ARR", JSON.stringify(newMusicArr));
  };
  //
  //Для бургер меню
  //
  const [isOpen, setIsOpen] = useState(true);
  function handleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  //
  //Для главной страницы
  //
  const [isMainMenu, setMainMenu] = useState(false);
  function handleIsMainMenu() {
    setMainMenu(true);
    setMusic(false);
  }
  //
  //Для музыки
  //
  const [isMusic, setMusic] = useState(true);
  function handleIsMusic() {
    setMainMenu(false);
    setMusic(true);
  }
  //
  //Получение индекса
  //
  const storedIndex = JSON.parse(localStorage.getItem("isCurrentIndex")) || -1;
  const [isCurrentIndex, setCurrentIndex] = useState(storedIndex);
  const handleIndexClick = (index) => {
    setCurrentIndex(index);
    localStorage.setItem("isCurrentIndex", JSON.stringify(index));
  };
  //Возвращение той части страницы, которая по итогу будет выбрана пользователем
  return (
    <div className="wrap">
      <div className="BurgenMenu" onClick={handleIsOpen}>
        ≡
      </div>
      <NavMenu
        isOpen={isOpen}
        isMainMenu={handleIsMainMenu}
        isMusic={handleIsMusic}
      ></NavMenu>
      {isMainMenu && (
        <MainMenu
          isOpen={isOpen}
          MUSIC_ARR={MUSIC_ARR}
          currentIndex={isCurrentIndex}
        ></MainMenu>
      )}
      {isMusic && (
        <Music
          isOpen={isOpen}
          MUSIC_ARR={MUSIC_ARR}
          getIndex={handleIndexClick}
          currentIndex={isCurrentIndex}
          setMUSIC_ARR={updateMUSIC_ARR}
        ></Music>
      )}
    </div>
  );
}

export default App;
