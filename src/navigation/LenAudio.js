import React, { useEffect, useState } from "react";

function LenAudio(props) {
  const [percentTime, setPercentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    //console.log("Текущая длина:", props.curLen);
    if (props.isTimer) {
      setTotalTime(0);
      props.setCurLen(0);
      props.setIsTimer(false);
      setPercentTime(0);
      console.log(props.isTimer);
    }
  }, [props.curLen, props.isTimer]);

  useEffect(() => {
    if (props.isPlaying) {
      const intervalId = setInterval(() => {
        if (props.curLen <= totalTime) {
          props.setCurLen((prevTime) => prevTime + 0.05);
        }
      }, 50);
      setPercentTime((props.curLen / totalTime) * 100);
      return () => clearInterval(intervalId);
    }
  }, [props.isPlaying, totalTime, props.curLen, props.setCurLen]);

  useEffect(() => {
    if (props.currentIndex !== -1) {
      setTotalTime(props.thisLeng);
    }
  }, [props.currentIndex, props.thisLeng]);

  const name_mus =
    props.currentIndex !== -1
      ? props.MUSIC_ARR[props.currentIndex].name
      : "Nothing!";

  const formattedCurLen = formatTime(props.curLen);
  const formattedTotalTime = formatTime(totalTime);

  const currentLengStyles = {
    width: `${percentTime}%`,
    transition: `0.05s linear`,
  };

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
        <div className="name_audio">{name_mus}</div>
        <div className="end_time">{formattedTotalTime}</div>
      </div>
      <div className="length_audio">
        <div className="current_leng" style={currentLengStyles}></div>
      </div>
    </div>
  );
}

export default LenAudio;
