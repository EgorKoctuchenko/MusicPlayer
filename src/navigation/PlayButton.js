//Компонент для кнопки "Проигрывание/Пауза"
import "../App.css";

function PlayButton(props) {
  //
  //playPauseIcon получает значение определенного svg в зависимости, трек на паузе или нет
  //
  const playPauseIcon = props.isPlay ? (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ) : (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );

  return (
    <div
      className={`${props.isMainMenu ? "play_button" : "play_buttonMUS"}`}
      onClick={props.handleIsPlay}
    >
      {playPauseIcon}
    </div>
  );
}

export default PlayButton;
