import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Leng from "./navigation/LenAudio";

function MainMenu(props) {
  return (
    <div
      className={`player ${props.isOpen ? "isOpenBurger" : "isCloseBurger"}`}
    >
      <div className="upcase">
        <Leng className="leng_music"></Leng>
        <div className="control_buttons">
          <LeftButton></LeftButton>
          <PlayButton></PlayButton>
          <RightButton></RightButton>
        </div>
      </div>
      <div className="botcase"></div>
    </div>
  );
}

export default MainMenu;
