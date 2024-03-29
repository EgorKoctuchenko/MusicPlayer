//Кнопка "Следующий трек"

import "../App.css";

function RightButton(props) {
  //
  //Функция для переключения на следующий трек
  //
  const playNextMusic = () => {
    props.setIsTimer(true);
    const nextIndex = getNextIndex();
    props.handleIsPlaying(false); //Остановить воспроизведение перед переключением
    props.getIndex(nextIndex); //Установить новый индекс
  };
  //
  //Получение индекса для следующего трека
  //
  const getNextIndex = () => {
    const currentIndex = props.currentIndex;
    const nextIndex = currentIndex + 1;
    //Если достигнут конец массива, вернуть первый элемент
    if (nextIndex >= props.MUSIC_ARR.length) {
      return 0;
    }

    return nextIndex;
  };

  return (
    <div
      className={`${props.isMainMenu ? "right_button" : "right_buttonMUS"}`}
      onClick={() => {
        playNextMusic();
      }}
    >
      <svg
        className="right_button_icon"
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
