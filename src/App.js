import "./App.css";
import "./MainMenu";
import MainMenu from "./MainMenu";
import NavMenu from "./navigation/NavMenu";
import React, { useState, useEffect } from "react";
import Music from "./Music";

function App() {
  //localStorage.clear();
  //
  //Массив музык
  //
  const storedMusicArr = JSON.parse(localStorage.getItem("MUSIC_ARR")) || [];
  const [MUSIC_ARR, setMUSIC_ARR] = useState(storedMusicArr);
  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    // Обработка выбора файла, например, добавление в массив MUSIC_ARR
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const audio = new Audio(reader.result);
        audio.onloadedmetadata = () => {
          console.log("Selected File Type:", selectedFile.type);
          const newMusic = {
            name: selectedFile.name.replace(/\.[^/.]+$/, ""),
            file: new Blob([selectedFile], { type: selectedFile.type }), // преобразовываем в Blob
            duration: audio.duration,
            index: isCurrentIndex,
          };

          setMUSIC_ARR((prevMUSIC_ARR) => {
            const newMusicArr = [...prevMUSIC_ARR, newMusic];
            localStorage.setItem("MUSIC_ARR", JSON.stringify(newMusicArr));
            return newMusicArr;
          });
        };
      };

      reader.readAsDataURL(selectedFile);
    }
  }
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
          onFileChange={handleFileChange}
          MUSIC_ARR={MUSIC_ARR}
          getIndex={handleIndexClick}
          currentIndex={isCurrentIndex}
        ></Music>
      )}
    </div>
  );
}

export default App;
