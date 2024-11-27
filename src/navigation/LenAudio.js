import React, { useEffect, useState } from "react";

function LenAudio(props) {
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

  useEffect(() => {
    if (props.isLoading && props.currentIndex !== -1) {
      const intervalDot = setInterval(() => {
        setNameMus(props.languageOptions.LoadingMUS + ".".repeat(dotCo));
        setDotCo((prevDot) => (prevDot === 3 ? 0 : ++prevDot));
      }, 350);
      return () => clearInterval(intervalDot);
    }
  }, [dotCo, props.isLoading, props.currentIndex]);
  //
  //Хук що використовувася для роботи з циклом, який кожні 1000мс даватиме +1 секунду з
  //моменту початку музики. Тут, встановлено на 100мс, оскільки користувач може
  //натиснути на паузу, і тоді таймер буде не дуже коректним. Тому, для зменшення
  //похибки - використовується значення 100.
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

  useEffect(() => {
    setPercentTime((props.curLen / totalTime) * 111);
  }, [props.curLen, totalTime]);
  //
  useEffect(() => {
    if (props.currentIndex !== -1) {
      setTotalTime(props.thisLeng);
    }
  }, [props.currentIndex, props.thisLeng]);
  //

  const formattedCurLen = formatTime(props.curLen);
  const formattedTotalTime = formatTime(totalTime);
  //

  const currentLengStyles = {
    width: `${percentTime}%`,
    transition: `0.1s linear`,
  };
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
