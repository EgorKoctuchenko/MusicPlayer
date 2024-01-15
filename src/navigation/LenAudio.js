//Компонент, для: Продолжительности трека, нынешней длины, общей длины и прочее
import React, { useEffect, useState } from "react";

function LenAudio(props) {
  //
  //Сразу же инициализация нужных состояний
  //
  const [percentTime, setPercentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [nameMus, setNameMus] = useState(props.languageOptions.NothingMUS);
  const [dotCo, setDotCo] = useState(0);

  useEffect(() => {
    if (nameMus && props.currentIndex !== -1) {
      setNameMus(props.MUSIC_ARR[props.currentIndex].name);
    } else {
      setNameMus(props.languageOptions.NothingMUS);
    }
  }, [props.isMainMenu]);
  //
  //Хук, для обнуления всех данных при загрузке
  //
  useEffect(() => {
    if (props.isTimer) {
      if (props.isRepeat) {
        props.setIsTimer(false);
      } else {
      }
      props.setCurLen(0);
      setPercentTime(0);
      if (props.isLoading) {
        props.setIsTimer(false);
      }
    }
  }, [props.curLen, props.isTimer, props.isLoading]);
  //
  //Хук, для отображение Loading с указанным кол-во точек при загрузке музыки
  //Добавил, потому что показалось интересным :)
  //
  useEffect(() => {
    if (props.isLoading && props.currentIndex !== -1) {
      const intervalDot = setInterval(() => {
        setNameMus(props.languageOptions.LoadingMUS + ".".repeat(dotCo));
        setDotCo((prevDot) => (prevDot === 3 ? 0 : ++prevDot));
      }, 350);
      return () => clearInterval(intervalDot); //Очищаем интервал при размонтировании или изменении зависимостей
    }
  }, [dotCo, props.isLoading, props.currentIndex]);
  //
  //Хук, для работы с циклом, который каждые 1000мс будет давать +1 секунду с момента
  //начала музыки. Здесь, установлено на 100мс, поскольку пользователь может нажать на паузу,
  //и тогда таймер будет не очень корректным. Поэтому, для уменьшения погрешности - используется
  //значение 100. Также, получаем значение названия трека
  //
  useEffect(() => {
    if (props.isPlaying && !props.isLoading) {
      setNameMus(props.MUSIC_ARR[props.currentIndex].name);
      const intervalId = setInterval(() => {
        if (props.curLen < totalTime) {
          props.setCurLen((prevTime) =>
            parseFloat((prevTime + 0.1).toFixed(1))
          );
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [
    props.isPlaying,
    totalTime,
    props.curLen,
    props.setCurLen,
    props.isLoading,
    props.isTimer,
  ]);

  //
  //Хук, для обновления percentTime при изменении curLen или totalTime
  //
  useEffect(() => {
    setPercentTime((props.curLen / totalTime) * 111);
  }, [props.curLen, totalTime]);
  //
  //Хук, который работает, если же значение индекс !== -1. Также, здесь
  //устанавливается длина трека
  //
  useEffect(() => {
    if (props.currentIndex !== -1) {
      setTotalTime(props.thisLeng);
    }
  }, [props.currentIndex, props.thisLeng]);
  //
  //Правильные значения для таймеров
  //
  const formattedCurLen = formatTime(props.curLen);
  const formattedTotalTime = formatTime(totalTime);
  //
  //Стили для current_leng
  //
  const currentLengStyles = {
    width: `${percentTime}%`,
    transition: `0.1s linear`,
  };
  //
  //Функция форматирования времени (в привычном 00:00 формате)
  //
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    const formin = min < 10 ? "0" + min : min;
    const forsec = sec < 10 ? "0" + sec : sec;

    return `${formin}:${forsec}`;
  }

  return (
    <div className={`${props.isMainMenu ? "fixed_leng" : "fixed_lengMUS"}`}>
      <div className={`${props.isMainMenu ? "time_leng" : "time_lengMUS"}`}>
        <div
          className={`${props.isMainMenu ? "current_time" : "current_timeMUS"}`}
        >
          {formattedCurLen}
        </div>
        <div className={`${props.isMainMenu ? "name_audio" : "name_audioMUS"}`}>
          {nameMus}
        </div>
        <div className={`${props.isMainMenu ? "end_time" : "end_timeMUS"}`}>
          {formattedTotalTime}
        </div>
      </div>
      <div
        className={`${
          props.isMainMenu ? "length_audio" : "length_audio_music"
        }`}
      >
        <div className="current_leng" style={currentLengStyles}></div>
      </div>
    </div>
  );
}

export default LenAudio;
