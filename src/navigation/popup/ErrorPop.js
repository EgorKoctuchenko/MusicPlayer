//Компонент, для popup ошибки
import "../../App.css";
import React, { useState, useEffect } from "react";

function ErrorPop(props) {
  return (
    <div className="wrap_error">
      <div className="error_body">
        <div className="title_er">Ошибка!</div>
        <div className="opic_er">
          <span className="opic_er_type">Причина ошибки:</span>{" "}
          {props.errorType}
        </div>
        <div
          className="button_er"
          onClick={() => {
            props.handleGettingError();
          }}
        >
          Подтвердить
        </div>
      </div>
    </div>
  );
}

export default ErrorPop;
