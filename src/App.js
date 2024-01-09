//Этот компонент есть родителем для всех остальных компонентов.

import "./App.css";
import "./MainMenu";
import MainMenu from "./MainMenu";
import NavMenu from "./navigation/NavMenu";
import React, { useState, useEffect, useRef } from "react";
import Music from "./Music";
import Settings from "./Settings";
import { Howl } from "howler";

function App() {
  //
  //В случае, если же была получена ошибка
  //
  const [infoError, setInfoError] = useState("Ошибок нет");
  const [gettingError, setGettingError] = useState(false);
  const handleGettingError = () => {
    setGettingError((prevError) => !prevError);
  };
  //
  //localStorage.clear();
  //
  //Состояние для управление музыкой
  //
  const [isPlaying, setIsPlaying] = useState(false);
  //
  //Массив музык а также состояние
  //
  const [MUSIC_ARR, setMUSIC_ARR] = useState([]);
  const updateMUSIC_ARR = (newMusicArr) => {
    setMUSIC_ARR(newMusicArr);
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
    setSet(false);
  }
  //
  //Для музыки (листа музыки)
  //
  const [isMusic, setMusic] = useState(true);
  function handleIsMusic() {
    setMainMenu(false);
    setMusic(true);
    setSet(false);
  }
  //
  //Для настроек
  //
  const [isSet, setSet] = useState(false);
  function handleIsSet() {
    setMainMenu(false);
    setMusic(false);
    setSet(true);
  }
  //Для отображения количество прямоугольников (по дефолту - 100)
  const [isRectangle, setRectangle] = useState(() => {
    const savedValue = localStorage.getItem("isRectangle");
    return savedValue ? JSON.parse(savedValue) : 100;
  });
  //Для отображения визуализации музыки (по дефолту - true)
  const [isImagine, setImagine] = useState(() => {
    const savedValue = localStorage.getItem("isImagine");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //Для отображения (на всю или не на всю страницу) (по дефолту - true)
  const [isFullPage, setFullPage] = useState(() => {
    const savedValue = localStorage.getItem("isFullPage");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //Для отображения gif (по дефолту - true)
  const [isGifAnim, setGifAnim] = useState(() => {
    const savedValue = localStorage.getItem("isGifAnim");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //Для отображения языка (по дефолту - украинский)
  const [isLangIndex, setLangIndex] = useState(() => {
    const savedValue = localStorage.getItem("isLangIndex");
    return savedValue ? JSON.parse(savedValue) : 0;
  });
  //
  //Получение индекса
  //
  const [isCurrentIndex, setCurrentIndex] = useState(-1);
  const handleIndexClick = (index) => {
    setCurrentIndex(index);
  };
  /////
  //curLen - нужен для определения ТЕКУЩЕЙ длины трека (с момента начала).
  /////
  const [curLen, setCurLen] = useState(0);
  /////
  //isTimer необходим для обнулений параметров в компоненте LenAudio
  /////
  const [isTimer, setIsTimer] = useState(false);
  /////
  //Воспроизведение следующей музыки, в случае, если же музыка была завершена естественным путем
  //(Ну то есть, дослушанна до конца)
  /////
  const playNextMusic = () => {
    const nextIndex = getNextIndex();
    handleIsPlaying(false); //Остановить воспроизведение перед переключением
    handleIndexClick(nextIndex); //Установить новый индекс
  };
  const playAgainMusic = () => {
    sound.current.seek(0);
    sound.current.play();
  };
  /////
  //Получение следующего индекса для воспроизведения следующей музыки
  /////
  const getNextIndex = () => {
    const currentIndex = isCurrentIndex;
    const nextIndex = currentIndex + 1;

    //Если достигнут конец массива, вернуть первый элемент/индекс (loop)
    if (nextIndex >= MUSIC_ARR.length) {
      return 0;
    }

    return nextIndex;
  };
  //
  //Статус загрузки музыка
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  //Хук для загрузки музыки (инициализации)
  //
  useEffect(() => {
    initializeSound();
    setIsLoading(true);

    return () => {
      setIsLoading(false);
    };
  }, [isCurrentIndex]);
  //
  //Функция проигрывания звука
  //
  const handleIsPlay = () => {
    //Если же музыка НЕ загружается, то устанавливаем некоторые правила для воспроизведения музыки
    //(handleIsPlaying, или же проигрывание или стоп музыки).
    //
    if (!isLoading) {
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
    }
  };
  const [isRepeat, setRepeat] = useState(() => {
    const savedValue = localStorage.getItem("isRepeat");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  const handleRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat);
  };
  //
  //Функция, для правильного установления значения setIsPlaying
  //(Да, можно было проще как вверху сделать, но пусть уже так. О верхней записи
  //Узнал я позже :D)
  //
  const handleIsPlaying = (PlayStatus2) => {
    if (PlayStatus2) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  //
  //Рандомное число (для гифки)
  //
  const [isRand, setIsRand] = useState(false);
  const handleIsRand = () => {
    isRand ? setIsRand(false) : setIsRand(true);
  };
  //
  //Рандомное число (для гифки)
  //
  const [isPlay, setIsPlay] = useState(true);
  //
  //Определение длины музыки (изначально - 0)
  //
  const [lengMusic, setLengMusic] = useState(0);
  const handleLengAudio = (thisLeng) => {
    setLengMusic(thisLeng);
  };
  //
  //Иницилизируем sound, при помощи хука useRef (изначально null)
  //
  const sound = useRef(null);
  //
  //Громкость музыки
  //
  const [volume, setVolume] = useState(1);
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (sound.current) {
      sound.current.volume(newVolume);
    }
  };
  //
  //Переменная, имеющая значение нынешнего трека
  //
  const isRepeatRef = useRef(isRepeat);
  const currentMusic = MUSIC_ARR[isCurrentIndex];
  //
  //
  //
  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);
  //
  //Функция инициализации музыки. Была перемещена из компонента PlayButton дабы
  //устронить баг
  //
  const initializeSound = () => {
    if (sound.current && sound.current.playing()) {
      sound.current.stop(); //Останавливаем предыдущий звук
      sound.current.unload(); //Освобождаем ресурсы
    }
    if (currentMusic && currentMusic.file) {
      sound.current = new Howl({
        //Объект Howl
        src: [currentMusic.file], //Где именно
        format: ["mp3"], //Формат
        volume: volume,
        onload: () => {
          //При загрузке
          handleLengAudio(sound.current.duration());
          setIsPlay(true);
          setIsLoading(false);
          if (!sound.current.playing()) {
            sound.current.play();
          }
          handleIsPlaying(true);
          handleIsRand();
        },
        onend: () => {
          //При окончании
          if (isRepeatRef.current) {
            playAgainMusic();
            setIsTimer(true);
          } else {
            playNextMusic();
          }
        },
        onloaderror: (id, error) => {
          //При получении ошибки
          setInfoError(
            "Error loading sound. File: " +
              currentMusic.file +
              ";  Error: " +
              error
          );
          setGettingError(true);
        },
      });
    } else {
      if (isCurrentIndex !== -1) {
        setInfoError("Current music or file is undefined: " + currentMusic);
        setGettingError(true);
      }
    }
  };
  //
  //Большой массив для языка. К сожаленью, не вышло через компоненты :(
  //
  const languageOptions = [
    {
      SoundSetting: "Налаштування звукової смуги",
      ImagineLineSetting: "Відображення смуги",
      FullPageSetting: "На всю сторінку",
      CurrentSettings: "Поточна кількість: ",
      GifAnimSetting: "Налаштування gif-анімацій",
      IsGifAnimSetting: "gif-анімація",
      RebootSetting: "Скидання налаштувань",
      VersionSetting: "Версія: ",
      LangSetting: "Мова",
      LangCurrentSetting: "Українська",
      MainMenuNAV: "Головна",
      MusicNAV: "Музика",
      PlayListNAV: "Плейлисти",
      SettingNAV: "Налаштування",
      LoadingMUS: "Завантаження",
      NothingMUS: "Музика не вибрана",
    },
    {
      SoundSetting: "Найстройки звуковой полосы",
      ImagineLineSetting: "Отображение полосы",
      FullPageSetting: "На всю страницу",
      CurrentSettings: "Текущее количество: ",
      GifAnimSetting: "Настройки gif-анимаций",
      IsGifAnimSetting: "gif-анимация",
      RebootSetting: "Сбросить все настройки",
      VersionSetting: "Версия: ",
      LangSetting: "Язык",
      LangCurrentSetting: "Русский",
      MainMenuNAV: "Главная",
      MusicNAV: "Музыка",
      PlayListNAV: "Плейлисты",
      SettingNAV: "Настройки",
      LoadingMUS: "Загрузка",
      NothingMUS: "Музыка не выбрана",
    },
    {
      SoundSetting: "Sound bar settings",
      ImagineLineSetting: "Strip display",
      FullPageSetting: "Full page",
      CurrentSettings: "Current quantity: ",
      GifAnimSetting: "Animation gif settings",
      IsGifAnimSetting: "gif-animation",
      RebootSetting: "Reset all settings",
      VersionSetting: "Version: ",
      LangSetting: "Language",
      LangCurrentSetting: "English",
      MainMenuNAV: "Main Menu",
      MusicNAV: "Music",
      PlayListNAV: "Playlists",
      SettingNAV: "Settings",
      LoadingMUS: "Loading",
      NothingMUS: "Music not selected",
    },
  ];
  //
  //
  //
  //Возвращение той части страницы, которая по итогу будет выбрана пользователем
  //
  return (
    <div className="wrap">
      <div className="BurgenMenu" onClick={handleIsOpen}>
        ≡
      </div>
      <NavMenu
        languageOptions={languageOptions[isLangIndex]}
        isOpen={isOpen}
        isMainMenu={handleIsMainMenu}
        isMusic={handleIsMusic}
        isSet={handleIsSet}
      ></NavMenu>
      {isMainMenu && (
        <MainMenu
          isMainMenu={isMainMenu}
          handleVolumeChange={handleVolumeChange}
          volume={volume}
          isRepeat={isRepeat}
          handleRepeat={handleRepeat}
          languageOptions={languageOptions[isLangIndex]}
          isGif={isGifAnim}
          isImagine={isImagine}
          isFullPage={isFullPage}
          isRectangle={isRectangle}
          isLoading={isLoading}
          infoError={infoError}
          setInfoError={setInfoError}
          handleGettingError={handleGettingError}
          gettingError={gettingError}
          setGettingError={setGettingError}
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
          handleVolumeChange={handleVolumeChange}
          volume={volume}
          isRepeat={isRepeat}
          handleRepeat={handleRepeat}
          languageOptions={languageOptions[isLangIndex]}
          infoError={infoError}
          setInfoError={setInfoError}
          handleGettingError={handleGettingError}
          gettingError={gettingError}
          setGettingError={setGettingError}
          isLoading={isLoading}
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
      {isSet && (
        <Settings
          setLangIndex={setLangIndex}
          isLangIndex={isLangIndex}
          languageOptions={languageOptions[isLangIndex]}
          isGifAnim={isGifAnim}
          setGifAnim={setGifAnim}
          isImagine={isImagine}
          setImagine={setImagine}
          isFullPage={isFullPage}
          setFullPage={setFullPage}
          isOpen={isOpen}
          setRectangle={setRectangle}
          isRectangle={isRectangle}
        ></Settings>
      )}
    </div>
  );
}

export default App;
