//Компонент, служащий для музыки, работы с ней, а также выбора музыки
import { Dropbox } from "dropbox";
import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Leng from "./navigation/LenAudio";
import React, { useState } from "react";
import ErrorPop from "./navigation/popup/ErrorPop";
import RepeatSong from "./navigation/RepeatSong";
import Volume from "./navigation/Volume";

//
//В качестве базы данных - используется DropBox
//Замените на ваш токен, дабы подключиться к вашему dropbox и слушать музыку.
//Токен сделан не статическим, дабы избежать проблем.
//
const dbx = new Dropbox({
  accessToken:
    //Замените на ваш ключ доступа
    "",
});

function Music(props) {
  //
  //Отслеживание состояния загрузки музыки ИЗ DropBox
  //
  const [loadingDropboxMusic, setLoadingDropboxMusic] = useState(false);
  //
  //Сообщение для удаления
  //
  const [deleteDropboxMusic, isDeleteDropboxMusic] = useState(false);
  //
  //Отслеживание состояния загрузки музыки В DropBox
  //
  const [statusUpload, setStatusUpload] = useState(false);
  //
  //Из DropBox
  //
  const handleAddMusicFromDropbox = async () => {
    try {
      setLoadingDropboxMusic(true);
      //
      //Ждем выполнения загрузки всех музыки из папки music. Используется await для ожидания
      //
      const response = await dbx.filesListFolder({ path: "/music" });

      if (!response.result || !response.result.entries) {
        props.setInfoError(
          "Error fetching music from Dropbox. No 'entries' property in the response: " +
            response
        );
        props.setGettingError(true);
        return;
      }
      //
      //Фильтрация полученных данных, поскольку, нам нужны лишь файлы
      //
      const musicFiles = response.result.entries.filter(
        (entry) => entry[".tag"] === "file"
      );
      const newMusicArr = []; //Массив музык (временный)
      //
      //Сохраняем ВСЕ файлы, которые были полученны из dropbox
      //
      for (const file of musicFiles) {
        try {
          //
          //Пытаемся получить временную ссылку, для дальнейших манипуляций
          //
          const temporaryLink = await dbx.filesGetTemporaryLink({
            path: file.path_display,
          });

          //Присваиваем blobUrl значение временной ссылки
          const blobUrl = temporaryLink.result.link;

          //В массив, запихиваем ВСЕ НЕОБХОДИМЫЕ данные
          newMusicArr.push({
            name: file.name, //Регулярные выражения, для того,
            //чтобы убрать ".mp3", которые присущи всем mp3 файлам. Пока что, только mp3.
            file: blobUrl,
            duration: 0,
            index: newMusicArr.length,
            fromDropbox: true,
          });
        } catch (error) {
          props.setInfoError(
            "Error getting temporary link from Dropbox: " + error
          );
          props.setGettingError(true);
        }
      }
      //
      //Обновляем состояние компонента и добавляем музыку из Dropbox в массив
      //
      props.setMUSIC_ARR(() => {
        const updatedMusicArr = [...newMusicArr.filter(Boolean)];
        return updatedMusicArr;
      });
    } catch (error) {
      props.setInfoError("Error fetching music from Dropbox: " + error);
      props.setGettingError(true);

      if (error.response) {
        props.setInfoError("Dropbox API error: " + error.response);
        props.setGettingError(true);
      } else {
        props.setInfoError("Unexpected error format: " + error);
        props.setGettingError(true);
      }
    } finally {
      setLoadingDropboxMusic(false);
    }
  };
  ///
  //Загрузка музыки в DROPBOX
  ///
  const handleUploadMusicToDropbox = async () => {
    try {
      setLoadingDropboxMusic(true);
      //Требование, чтобы был загружен файл, а не что-либо другое
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      //Обработчик события change
      const handleChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
          //Асинхронная загрузка файла, в указанное место и указанный тип (файл)
          const response = await dbx.filesUpload({
            path: `/music/${file.name}`,
            contents: file,
          });

          setStatusUpload(true);
          //Сразу же, добавляем эту музыку в наш список (вызовя функцию)
          await handleAddMusicFromDropbox();
          setStatusUpload(false);
        }
      };
      //Добавляем обработчик change
      fileInput.addEventListener("change", handleChange);
      //Вызываем click после добавления обработчика
      fileInput.click();
      //Возвращаем Promise
      return new Promise((resolve) => {
        //Добавляем resolve после вызова click
        resolve();
      });
    } catch (error) {
      props.setInfoError("Error uploading music to Dropbox: " + error);
      props.setGettingError(true);

      if (error.response) {
        props.setInfoError("Dropbox API error: " + error);
        props.setGettingError(true);
      } else {
        props.setInfoError("Unexpected error format: " + error);
        props.setGettingError(true);
      }
    } finally {
      setLoadingDropboxMusic(false);
    }
  };
  //Удаление музыки
  const handleDeleteMusicFromDropbox = async (name_au) => {
    const path = `/music/${name_au}`;
    try {
      isDeleteDropboxMusic(true);
      setLoadingDropboxMusic(true);

      //Вызываем метод filesDeleteV2 для удаления файла
      const response = await dbx.filesDeleteV2({ path });
      props.handleDeleteMusic();

      //Обновляем состояние компонента, например, удаляем музыку из массива
      await handleAddMusicFromDropbox();
    } catch (error) {
      console.error("Error deleting music from Dropbox:", error);

      if (error.response) {
        console.error("Dropbox API error:", error.response);
        props.setInfoError("Dropbox API error: " + error.response);
        props.setGettingError(true);
      } else {
        console.error("Unexpected error format:", error);
        props.setInfoError("Unexpected error format: " + error);
        props.setGettingError(true);
      }
    } finally {
      setLoadingDropboxMusic(false);
      isDeleteDropboxMusic(false);
    }
  };

  return (
    <div
      className={`player ${props.isOpen ? "isOpenBurger" : "isCloseBurger"}`}
    >
      {props.gettingError && (
        <ErrorPop
          errorType={props.infoError}
          handleGettingError={props.handleGettingError}
        ></ErrorPop>
      )}
      <div className="upcase">
        <Leng
          isMainMenu={props.isMainMenu}
          isRepeat={props.isRepeat}
          languageOptions={props.languageOptions}
          isLoading={props.isLoading}
          setCurLen={props.setCurLen}
          curLen={props.curLen}
          isTimer={props.isTimer}
          setIsTimer={props.setIsTimer}
          className="leng_music"
          MUSIC_ARR={props.MUSIC_ARR}
          currentIndex={props.currentIndex}
          thisLeng={props.lengMusic}
          isPlaying={props.isPlaying}
        ></Leng>
        <div className="control_buttons">
          <RepeatSong
            handleRepeat={props.handleRepeat}
            isRepeat={props.isRepeat}
          ></RepeatSong>
          <LeftButton
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
            setIsTimer={props.setIsTimer}
          ></LeftButton>
          <PlayButton
            handleIsPlay={props.handleIsPlay}
            setIsTimer={props.setIsTimer}
            isRandom={props.handleIsRand}
            MUSIC_ARR={props.MUSIC_ARR}
            currentIndex={props.currentIndex}
            handleLengAudio={props.handleLengAudio}
            handleIsPlaying={props.handleIsPlaying}
            isPlay={props.isPlay}
          ></PlayButton>
          <RightButton
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
            setIsTimer={props.setIsTimer}
          ></RightButton>
          <Volume
            handleVolumeChange={props.handleVolumeChange}
            volume={props.volume}
          ></Volume>
        </div>
      </div>
      <div className="botcase">
        {props.MUSIC_ARR.map((music, index) => (
          <div
            className={`loadedMusic ${
              index % 2 === 0 ? "isEqTwo" : "isNotEqTwo"
            } ${index === props.currentIndex ? "selectedMusic" : ""}`}
            key={index}
            onClick={() => {
              props.getIndex(index);
              {
                index !== props.currentIndex
                  ? props.setIsTimer(true)
                  : props.setIsTimer(false);
              }
            }}
          >
            <span>{music.name}</span>
            <div>
              <a
                className="IndexUping"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteMusicFromDropbox(music.name);
                }}
              >
                <svg
                  className="delete_icon"
                  viewBox="0 0 24 19"
                  width="26"
                  height="26"
                  fill="red"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </a>
              <a
                className="IndexUping"
                href={music.file}
                download={music.name}
                style={{ marginLeft: "10px" }}
              >
                <svg width="26px" height="26px" viewBox="0 0 24 20" fill="none">
                  <path
                    d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="addmusic" onClick={handleAddMusicFromDropbox}>
        <svg
          width="75"
          height="75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div
        className={`text_yes ${
          statusUpload === true ? "text_app" : "text_rem"
        }`}
      >
        {props.languageOptions.SucLoadingMUS}
      </div>
      <div
        className={`text_yes ${
          deleteDropboxMusic === true ? "text_app" : "text_rem"
        }`}
      >
        {props.languageOptions.SucDeleteMUS}
      </div>
      <div className="upload" onClick={handleUploadMusicToDropbox}>
        <svg fill="#000000" width="75" height="75" viewBox="0 0 512 512">
          <path d="M473.66,210c-16.56-12.3-37.7-20.75-59.52-24-6.62-39.18-24.21-72.67-51.3-97.45C334.15,62.25,296.21,47.79,256,47.79c-35.35,0-68,11.08-94.37,32.05a149.61,149.61,0,0,0-45.32,60.49c-29.94,4.6-57.12,16.68-77.39,34.55C13.46,197.33,0,227.24,0,261.39c0,34.52,14.49,66,40.79,88.76,25.12,21.69,58.94,33.64,95.21,33.64H240V230.42l-48,48-22.63-22.63L256,169.17l86.63,86.62L320,278.42l-48-48V383.79H396c31.34,0,59.91-8.8,80.45-24.77,23.26-18.1,35.55-44,35.55-74.83C512,254.25,498.74,228.58,473.66,210Z" />
          <rect x="240" y="383.79" width="32" height="80.41" />
        </svg>
      </div>
    </div>
  );
}

export default Music;
