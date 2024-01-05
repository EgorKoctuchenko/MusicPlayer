import "./App.css";
import "./MainMenu";
import MainMenu from "./MainMenu";
import NavMenu from "./navigation/NavMenu";
import React, { useState, useEffect, useRef } from "react";
import Music from "./Music";
import { Howl } from "howler";

function App() {
  //
  localStorage.clear();
  //
  //Состояние для управление музыкой
  //
  const [isPlaying, setIsPlaying] = useState(false);
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
  ////////////
  /////
  /////
  const [curLen, setCurLen] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const playNextMusic = () => {
    const nextIndex = getNextIndex();
    handleIsPlaying(false); // Остановить воспроизведение перед переключением
    handleIndexClick(nextIndex); // Установить новый индекс
  };

  const getNextIndex = () => {
    const currentIndex = isCurrentIndex;
    const nextIndex = currentIndex + 1;

    // Если достигнут конец массива, вернуть первый элемент
    if (nextIndex >= MUSIC_ARR.length) {
      return 0;
    }

    return nextIndex;
  };

  useEffect(() => {
    initializeSound();
  }, [isCurrentIndex]);

  const handleIsPlay = () => {
    setIsPlay((prevIsPlay) => !prevIsPlay);

    if (sound.current) {
      if (isPlay) {
        sound.current.pause();
        handleIsPlaying(false);
      } else {
        if (!sound.current.playing()) {
          sound.current.play();
        }
        handleIsPlaying(true);
      }
    }
  };
  const handleIsPlaying = (PlayStatus2) => {
    if (PlayStatus2) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  const [isRand, setIsRand] = useState(false);
  const handleIsRand = () => {
    isRand ? setIsRand(false) : setIsRand(true);
  };
  const [isPlay, setIsPlay] = useState(true);
  const [lengMusic, setLengMusic] = useState(0);
  const handleLengAudio = (thisLeng) => {
    setLengMusic(thisLeng);
  };
  const sound = useRef(null);
  const currentMusic = MUSIC_ARR[isCurrentIndex];
  const initializeSound = () => {
    //
    if (sound.current && sound.current.playing()) {
      sound.current.stop(); // Останавливаем предыдущий звук
      sound.current.unload(); // Освобождаем ресурсы
    }
    if (currentMusic && currentMusic.file) {
      sound.current = new Howl({
        src: [currentMusic.file],
        format: ["mp3"],
        onload: () => {
          handleLengAudio(sound.current.duration());
          setIsPlay(true);
          if (!sound.current.playing()) {
            sound.current.play();
          }
          handleIsPlaying(true);
          handleIsRand();
        },
        onend: () => {
          setIsPlay(false);
          console.log("asd");
          setIsTimer(true);
          playNextMusic();
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
          setCurLen={setCurLen}
          curLen={curLen}
          isRand={isRand}
          handleIsRand={handleIsRand}
          lengMusic={lengMusic}
          setIsTimer={setIsTimer}
          isTimer={isTimer}
          setIsPlaying={setIsPlaying}
          getIndex={handleIndexClick}
          isOpen={isOpen}
          MUSIC_ARR={MUSIC_ARR}
          currentIndex={isCurrentIndex}
          isPlaying={isPlaying}
          handleLengAudio={handleLengAudio}
          handleIsPlaying={handleIsPlaying}
          handleIsPlay={handleIsPlay}
          isPlay={isPlay}
        ></MainMenu>
      )}
      {isMusic && (
        <Music
          setCurLen={setCurLen}
          curLen={curLen}
          handleIsPlay={handleIsPlay}
          handleLengAudio={handleLengAudio}
          handleIsPlaying={handleIsPlaying}
          handleIsRand={handleIsRand}
          setIsPlaying={setIsPlaying}
          isOpen={isOpen}
          MUSIC_ARR={MUSIC_ARR}
          getIndex={handleIndexClick}
          currentIndex={isCurrentIndex}
          setMUSIC_ARR={updateMUSIC_ARR}
          isPlaying={isPlaying}
          isTimer={isTimer}
          setIsTimer={setIsTimer}
          isPlay={isPlay}
          lengMusic={lengMusic}
        ></Music>
      )}
    </div>
  );
}

export default App;
