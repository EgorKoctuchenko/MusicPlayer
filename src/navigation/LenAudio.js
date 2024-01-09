import React, { useEffect, useState } from "react";

function LenAudio(props) {
  //
  //Сразу же инициализация нужных состояний
  //
  const [percentTime, setPercentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [nameMus, setNameMus] = useState(props.languageOptions.NothingMUS);
  const [dotCo, setDotCo] = useState(0);
  //
  //Хук, для обнуления всех данных при загрузке
  //
  useEffect(() => {
    if (props.isTimer) {
      setTotalTime(0);
      props.setCurLen(0);
      if (props.isLoading) {
        props.setIsTimer(false);
      }
      setPercentTime(0);
      //if (props.isRepeat) {
      //props.setIsTimer(false);
      //}
    }
  }, [props.curLen, props.isTimer, props.isLoading, props.isRepeat]);
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
      return () => clearInterval(intervalDot); // Очищаем интервал при размонтировании или изменении зависимостей
    }
  }, [dotCo, props.isLoading]);
  //
  //Хук, для работы с циклом, который каждые 1000мс будет давать +1 секунду с момента
  //начала музыки. Здесь, установлено на 100мс, поскольку пользователь может нажать на паузу,
  //и тогда таймер будет не очень корректным. Поэтом, для уменьшения погрешности - используется
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
  ]);

  //
  //Хук, для обновления percentTime при изменении curLen или totalTime
  //
  useEffect(() => {
    setPercentTime((props.curLen / totalTime) * 100);
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
    <div>
      <div className="time_leng">
        <div className="current_time">{formattedCurLen}</div>
        <div className="name_audio">{nameMus}</div>
        <div className="end_time">{formattedTotalTime}</div>
      </div>
      <div className="length_audio">
        <div className="current_leng" style={currentLengStyles}></div>
      </div>
    </div>
  );
}

export default LenAudio;
