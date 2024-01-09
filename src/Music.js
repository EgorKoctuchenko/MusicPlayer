//Компонент, служащий для музыки, работы с ней, а также выбора музыки
import { Dropbox } from "dropbox";
import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Leng from "./navigation/LenAudio";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorPop from "./navigation/popup/ErrorPop";
import RepeatSong from "./navigation/RepeatSong";
import Volume from "./navigation/Volume";

//
//В качестве базы данных - используется DropBox
//
const dbx = new Dropbox({
  accessToken:
    "sl.BtXLiC4IzFEl-zIMB3p9QjWs64rxjyIfDejJBCow42_LAGS0-DxmKkuAvX3g2cprOOoX3PskWkv4DIbnlWVGi2o5vUCCqdDcCsU6rQg409Dg0Z7gqtIZ3RGT0n30Dk1nRzwrEljd79FT", // Замените на ваш ключ доступа
});

function Music(props) {
  //
  //Отслеживание состояния загрузки музыки ИЗ DropBox
  //
  const [loadingDropboxMusic, setLoadingDropboxMusic] = useState(false);
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
            name: file.name.replace(/\.mp3$/, ""), //Регулярные выражения, для того,
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

          console.log("File uploaded to Dropbox:", response);
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
      // Возвращаем Promise
      return new Promise((resolve) => {
        // Добавляем resolve после вызова click
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
              props.setIsTimer(true);
              console.log(props.currentIndex);
            }}
          >
            <span>{music.name}</span>
            <a
              href={music.file}
              download={music.name} // Устанавливаем имя файла для скачивания
              style={{ marginLeft: "10px" }}
            >
              Скачать
            </a>
          </div>
        ))}
      </div>
      <div className="addmusic" onClick={handleAddMusicFromDropbox}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
        Файл успешно загружен
      </div>
      <div className="upload" onClick={handleUploadMusicToDropbox}>
        <svg
          fill="#000000"
          width="75"
          height="75"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>ionicons-v5-f</title>
          <path d="M473.66,210c-16.56-12.3-37.7-20.75-59.52-24-6.62-39.18-24.21-72.67-51.3-97.45C334.15,62.25,296.21,47.79,256,47.79c-35.35,0-68,11.08-94.37,32.05a149.61,149.61,0,0,0-45.32,60.49c-29.94,4.6-57.12,16.68-77.39,34.55C13.46,197.33,0,227.24,0,261.39c0,34.52,14.49,66,40.79,88.76,25.12,21.69,58.94,33.64,95.21,33.64H240V230.42l-48,48-22.63-22.63L256,169.17l86.63,86.62L320,278.42l-48-48V383.79H396c31.34,0,59.91-8.8,80.45-24.77,23.26-18.1,35.55-44,35.55-74.83C512,254.25,498.74,228.58,473.66,210Z" />
          <rect x="240" y="383.79" width="32" height="80.41" />
        </svg>
      </div>
    </div>
  );
}

export default Music;
