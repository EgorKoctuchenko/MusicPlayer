//Кнопка "предыдущий трек"

import "../App.css";

function LeftButton(props) {
  //
  //Функция для переключения на предыдущий трек
  //
  const playPrevMusic = () => {
    props.setIsTimer(true);
    const nextIndex = getNextIndex();
    props.handleIsPlaying(false); //Остановить воспроизведение перед переключением
    props.getIndex(nextIndex); //Установить новый индекс
  };
  //
  //Получение индекса для предыдущего трека
  //
  const getNextIndex = () => {
    const currentIndex = props.currentIndex;
    const nextIndex = currentIndex - 1;
    // Если достигнуто начало массива, вернуть последний элемент
    if (nextIndex < 0) {
      return props.MUSIC_ARR.length - 1;
    }

    return nextIndex;
  };

  return (
    <div
      className="left_button"
      onClick={() => {
        playPrevMusic();
      }}
    >
      <svg
        className="left_button_icon"
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
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
      </svg>
    </div>
  );
}

export default LeftButton;
