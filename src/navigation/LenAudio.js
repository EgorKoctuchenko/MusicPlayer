import "../App.css";

function LenAudio(props) {
  var name_mus;
  if (props.currentIndex !== -1) {
    var min = Math.floor(props.MUSIC_ARR[props.currentIndex].duration / 60);
    var sec = Math.floor(props.MUSIC_ARR[props.currentIndex].duration % 60);

    var formin = min < 10 ? "0" + min : min;
    var forsec = sec < 10 ? "0" + sec : sec;

    var result = formin + ":" + forsec;

    name_mus = props.MUSIC_ARR[props.currentIndex].name;
  } else {
    name_mus = "Nothing!";
  }

  return (
    <div>
      <div className="time_leng">
        <div className="current_time">0:00</div>
        <div className="name_audio">{name_mus}</div>
        <div className="end_time">{result}</div>
      </div>
      <div className="length_audio">
        <div className="current_leng"></div>
      </div>
    </div>
  );
}

export default LenAudio;
