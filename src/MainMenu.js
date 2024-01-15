//Этот компонент служит для страницы с гиф а также небольшой визуализацией
import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Prev from "./navigation/Prev";
import Leng from "./navigation/LenAudio";
import BackFon from "./BackFon";
import RepeatSong from "./navigation/RepeatSong";
import Volume from "./navigation/Volume";

function MainMenu(props) {
  return (
    <div
      className={`player_menu ${
        props.isOpen ? "isOpenBurger" : "isCloseBurger"
      }`}
    >
      <BackFon
        isPlay={props.isPlay}
        isLoading={props.isLoading}
        isRectangle={props.isRectangle}
        isImagine={props.isImagine}
        isFullPage={props.isFullPage}
      ></BackFon>

      <Prev
        handleIsStyleChange={props.handleIsStyleChange}
        isRandom={props.isRand}
        isHandleRand={props.handleIsRand}
        isGif={props.isGif}
      ></Prev>

      <Leng
        isMainMenu={props.isMainMenu}
        isPlay={props.isPlay}
        languageOptions={props.languageOptions}
        isLoading={props.isLoading}
        isTimer={props.isTimer}
        setCurLen={props.setCurLen}
        curLen={props.curLen}
        setIsTimer={props.setIsTimer}
        MUSIC_ARR={props.MUSIC_ARR}
        currentIndex={props.currentIndex}
        thisLeng={props.lengMusic}
        isPlaying={props.isPlaying}
      ></Leng>
      <div className={`pre_buttons ${props.isPlay ? "opacityDown1" : ""}`}>
        <svg
          className="isLeft"
          width="75"
          height="75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="18 2.8 5 12 19 22 19 2" fill="#6f46dd"></polygon>
        </svg>
        <div className="buttons">
          <RepeatSong
            isMainMenu={props.isMainMenu}
            handleRepeat={props.handleRepeat}
            isRepeat={props.isRepeat}
          ></RepeatSong>
          <LeftButton
            isMainMenu={props.isMainMenu}
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
            setIsTimer={props.setIsTimer}
          ></LeftButton>
          <PlayButton
            isMainMenu={props.isMainMenu}
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
            isMainMenu={props.isMainMenu}
            getIndex={props.getIndex}
            handleIsPlaying={props.handleIsPlaying}
            currentIndex={props.currentIndex}
            MUSIC_ARR={props.MUSIC_ARR}
            setIsTimer={props.setIsTimer}
          ></RightButton>
          <Volume
            isMainMenu={props.isMainMenu}
            handleVolumeChange={props.handleVolumeChange}
            volume={props.volume}
          ></Volume>
        </div>
        <svg
          className="isRight"
          width="75"
          height="75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="6 1.8 19 12 6 22 6 3" fill="#6f46dd"></polygon>
        </svg>
      </div>
    </div>
  );
}

export default MainMenu;
