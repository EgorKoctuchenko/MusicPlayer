import "./App.css";
import LeftButton from "./navigation/LeftButton";
import PlayButton from "./navigation/PlayButton";
import RightButton from "./navigation/RightButton";
import Prev from "./navigation/Prev";
import Leng from "./navigation/LenAudio";

function App() {
  return (
    <div className="wrap">
      <div className="navigation"></div>
      <div className="player">
        <Prev></Prev>
        <Leng></Leng>
        <div className="buttons">
          <LeftButton></LeftButton>
          <PlayButton></PlayButton>
          <RightButton></RightButton>
        </div>
      </div>
    </div>
  );
}

export default App;
