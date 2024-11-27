import "../App.css";

function LeftButton(props) {
  //
  const playPrevMusic = () => {
    props.setIsTimer(true);
    const nextIndex = getNextIndex();
    props.handleIsPlaying(false);
    props.getIndex(nextIndex);
  };
  //

  const getNextIndex = () => {
    const currentIndex = props.currentIndex;
    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      return props.MUSIC_ARR.length - 1;
    }

    return nextIndex;
  };

  return (
    <div
      className={`${props.isMainMenu ? "left_button" : "left_buttonMUS"}`}
      onClick={() => {
        playPrevMusic();
      }}
    >
      <svg
        className="left_button_icon"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
      </svg>
    </div>
  );
}

export default LeftButton;
