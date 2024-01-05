import "../App.css";

function RightButton(props) {
  const playNextMusic = () => {
    const nextIndex = getNextIndex();
    props.handleIsPlaying(false); // Остановить воспроизведение перед переключением
    props.getIndex(nextIndex); // Установить новый индекс
  };

  const getNextIndex = () => {
    const currentIndex = props.currentIndex;
    const nextIndex = currentIndex + 1;

    // Если достигнут конец массива, вернуть первый элемент
    if (nextIndex >= props.MUSIC_ARR.length) {
      return 0;
    }

    return nextIndex;
  };

  return (
    <div
      className="right_button"
      onClick={() => {
        playNextMusic();
      }}
    >
      <svg
        className="right_button_icon"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="5 4 15 12 5 20 5 4"></polygon>
        <line x1="19" y1="5" x2="19" y2="19"></line>
      </svg>
    </div>
  );
}

export default RightButton;
