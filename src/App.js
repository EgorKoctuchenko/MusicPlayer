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

  const [infoError, setInfoError] = useState("Ошибок нет");
  const [gettingError, setGettingError] = useState(false);
  const handleGettingError = () => {
    setGettingError((prevError) => !prevError);
  };
  //
  //localStorage.clear(); <- використовувалося для перевірки з localStorage параметрами
  //
  const [isPlaying, setIsPlaying] = useState(false);
  //
  const [MUSIC_ARR, setMUSIC_ARR] = useState([]);
  const updateMUSIC_ARR = (newMusicArr) => {
    setMUSIC_ARR(newMusicArr);
  };
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
  const [isMainMenu, setMainMenu] = useState(() => {
    const savedValue = localStorage.getItem("isMainMenu");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  function handleIsMainMenu() {
    setMainMenu(true);
    setMusic(false);
    setSet(false);
  }
  //
  const [isMusic, setMusic] = useState(() => {
    const savedValue = localStorage.getItem("isMusic");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  function handleIsMusic() {
    setMainMenu(false);
    setMusic(true);
    setSet(false);
  }
  //
  const [isSet, setSet] = useState(() => {
    const savedValue = localStorage.getItem("isSetting");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  function handleIsSet() {
    setMainMenu(false);
    setMusic(false);
    setSet(true);
  }
  //
  useEffect(() => {
    localStorage.setItem("isMainMenu", isMainMenu);
    localStorage.setItem("isMusic", isMusic);
    localStorage.setItem("isSetting", isSet);
  }, [isMainMenu, isMusic, isSet]);
  //
  const [isRectangle, setRectangle] = useState(() => {
    const savedValue = localStorage.getItem("isRectangle");
    return savedValue ? JSON.parse(savedValue) : 100;
  });
  //
  const [isImagine, setImagine] = useState(() => {
    const savedValue = localStorage.getItem("isImagine");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //
  const [isFullPage, setFullPage] = useState(() => {
    const savedValue = localStorage.getItem("isFullPage");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //
  const [isGifAnim, setGifAnim] = useState(() => {
    const savedValue = localStorage.getItem("isGifAnim");
    return savedValue ? JSON.parse(savedValue) : true;
  });
  //
  const [isLangIndex, setLangIndex] = useState(() => {
    const savedValue = localStorage.getItem("isLangIndex");
    return savedValue ? JSON.parse(savedValue) : 0;
  });
  //
  const [isCurrentIndex, setCurrentIndex] = useState(-1);
  const handleIndexClick = (index) => {
    setCurrentIndex(index);
  };
  const isCurrentIndexRef = useRef(isCurrentIndex);
  useEffect(() => {
    isCurrentIndexRef.current = isCurrentIndex;
  }, [isCurrentIndex]);
  //
  const [curLen, setCurLen] = useState(0);
  //
  const [isTimer, setIsTimer] = useState(false);
  //
  const playNextMusic = () => {
    const nextIndex = getNextIndex();
    setIsPlay(false);
    setIsTimer(true);
    if (sound.current) {
      sound.current.stop();
    }
    handleIndexClick(nextIndex);
  };
  const playAgainMusic = () => {
    sound.current.seek(0);
    sound.current.play();
  };
  //
  const getNextIndex = () => {
    const currentIndex = isCurrentIndex;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= MUSIC_ARR.length) {
      return 0;
    }

    return nextIndex;
  };
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  useEffect(() => {
    initializeSound();
    setIsLoading(true);

    return () => {
      setIsLoading(false);
    };
  }, [isCurrentIndex]);
  //
  const handleIsPlay = () => {
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
  //
  const [isRepeat, setRepeat] = useState(() => {
    const savedValue = localStorage.getItem("isRepeat");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  const handleRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat);
  };
  const isRepeatRef = useRef(isRepeat);
  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);
  //
  const handleIsPlaying = (PlayStatus2) => {
    if (PlayStatus2) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };
  //
  const [isRand, setIsRand] = useState(false);
  const handleIsRand = () => {
    isRand ? setIsRand(false) : setIsRand(true);
  };
  //
  //Число для визначення стилів (динамічно). Ще не реалізовано
  //
  const [isStyleChange, setStyleChange] = useState(false);
  const handleIsStyleChange = (value) => {
    setStyleChange(value);
  };
  //
  const [isPlay, setIsPlay] = useState(true);
  //
  const [lengMusic, setLengMusic] = useState(0);
  const handleLengAudio = (thisLeng) => {
    setLengMusic(thisLeng);
  };
  //
  const sound = useRef(null);
  //
  const [volume, setVolume] = useState(() => {
    const savedValue = localStorage.getItem("isVolume");
    return savedValue ? JSON.parse(savedValue) : 1;
  });

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem("isVolume", volume);
    if (sound.current) {
      sound.current.volume(newVolume);
    }
  };
  //
  const currentMusic = MUSIC_ARR[isCurrentIndex];
  //
  const initializeSound = () => {
    if (sound.current && sound.current.playing()) {
      sound.current.stop();
      sound.current.unload();
    }
    if (currentMusic && currentMusic.file) {
      sound.current = new Howl({
        src: [currentMusic.file],
        format: ["mp3"],
        volume: volume,
        onload: () => {
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
          if (isRepeatRef.current) {
            playAgainMusic();
            setIsTimer(true);
          } else {
            handleIsPlaying(false);
            playNextMusic();
          }
        },
        onloaderror: (id, error) => {
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
  const handleDeleteMusic = () => {
    sound.current.stop();
    sound.current.unload();
    handleIsPlaying(false);
    setIsTimer(true);
    if (isCurrentIndex !== 0) {
      handleIndexClick(isCurrentIndex - 1);
      playNextMusic();
    } else {
      handleIndexClick(isCurrentIndex + 1);
      playNextMusic();
      setTimeout(() => {
        handleIndexClick(0);
      }, 2000);
    }
  };
  //
  //Масив для перемикання між мовами. Це можна було зробити через окремий компонент,
  //але тодішній я вирішив зробити так, як це зроблено тут
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
      SucLoadingMUS: "Файл успішно завантажено",
      SucDeleteMUS: "Файл успішно видалено",
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
      SucLoadingMUS: "Файл успешно загружен",
      SucDeleteMUS: "Файл успешно удален",
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
      SucLoadingMUS: "The file has been successfully uploaded",
      SucDeleteMUS: "The file has been successfully deleted",
    },
  ];
  //
  return (
    <div className="wrap">
      <div className="BurgenMenu" onClick={handleIsOpen}>
        ≡
      </div>
      <div
        className={`burgen_small_pr ${isOpen ? "burgen_small_pr_yes" : ""}`}
      ></div>
      <NavMenu
        languageOptions={languageOptions[isLangIndex]}
        isOpen={isOpen}
        isMainMenu={handleIsMainMenu}
        isMusic={handleIsMusic}
        isSet={handleIsSet}
      ></NavMenu>
      {isMainMenu && (
        <MainMenu
          isStyleChange={isStyleChange}
          handleIsStyleChange={handleIsStyleChange}
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
          currentIndex={isCurrentIndexRef.current}
          isPlaying={isPlaying}
          handleLengAudio={handleLengAudio}
          handleIsPlaying={handleIsPlaying}
          handleIsPlay={handleIsPlay}
          isPlay={isPlay}
        ></MainMenu>
      )}
      {isMusic && (
        <Music
          handleDeleteMusic={handleDeleteMusic}
          playNextMusic={playNextMusic}
          isMainMenu={isMainMenu}
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
          currentIndex={isCurrentIndexRef.current}
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
