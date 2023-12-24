import "./App.css";
import "./MainMenu";
import MainMenu from "./MainMenu";
import NavMenu from "./navigation/NavMenu";
import React, { useState } from "react";
import Settings from "./Settings";

function App() {
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
  const [isMainMenu, setMainMenu] = useState(true);
  function handleIsMainMenu() {
    setMainMenu(true);
    setMusic(false);
  }
  //
  //Для музыки
  //
  const [isMusic, setMusic] = useState(false);
  function handleIsMusic() {
    setMainMenu(false);
    setMusic(true);
  }
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
      {isMainMenu && <MainMenu isOpen={isOpen}></MainMenu>}
      {isMusic && <Settings isOpen={isOpen}></Settings>}
    </div>
  );
}

export default App;
