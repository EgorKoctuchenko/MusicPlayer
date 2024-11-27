import "./App.css";
import React, { useEffect, useState } from "react";

function Settings(props) {
  const [sliderValue, setSliderValue] = useState(props.isRectangle);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    props.setRectangle(newValue);
    localStorage.setItem("isRectangle", JSON.stringify(newValue));
  };
  //
  const handleIsImagineClick = () => {
    props.setImagine((prevImagine) => !prevImagine);
    localStorage.setItem("isImagine", JSON.stringify(!props.isImagine));
  };

  const handleIsFullPageClick = () => {
    props.setFullPage((prevFullPage) => !prevFullPage);
    localStorage.setItem("isFullPage", JSON.stringify(!props.isFullPage));
  };
  const handleIsGifAnimClick = () => {
    props.setGifAnim((prevIsGif) => !prevIsGif);
    localStorage.setItem("isGifAnim", JSON.stringify(!props.isGifAnim));
  };
  const handleSetLang = () => {
    const currentLangIndex = props.isLangIndex;
    const newLangIndex = (currentLangIndex + 1) % 3;
    props.setLangIndex(newLangIndex);
  };
  useEffect(() => {
    localStorage.setItem("isLangIndex", JSON.stringify(props.isLangIndex));
  }, [props.isLangIndex]);

  const handleResetSetting = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div
      className={`settings_page ${
        props.isOpen ? "isOpenBurger" : "isCloseBurger"
      }`}
    >
      <div className="wrap_setting">
        <div className="label_setting">
          {props.languageOptions.SoundSetting}
        </div>
        <div className="sound_line">
          <div className="set1">
            <div>{props.languageOptions.ImagineLineSetting}</div>
            <div
              className="square"
              onClick={() => {
                handleIsImagineClick();
              }}
            >
              {props.isImagine && (
                <svg
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="rgb(219, 219, 219)"
                >
                  <path d="M9 19.4L3.3 13.7 4.7 12.3 9 16.6 20.3 5.3 21.7 6.7z"></path>
                </svg>
              )}
            </div>
          </div>
          <div className="set2">
            <div>{props.languageOptions.FullPageSetting}</div>
            <div
              className="square"
              onClick={() => {
                handleIsFullPageClick();
              }}
            >
              {props.isFullPage && (
                <svg
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="rgb(219, 219, 219)"
                >
                  <path d="M9 19.4L3.3 13.7 4.7 12.3 9 16.6 20.3 5.3 21.7 6.7z"></path>
                </svg>
              )}
            </div>
          </div>
          <div className="set3">
            <input
              className="width_line"
              type="range"
              min="1"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
            />
            <div>
              {props.languageOptions.CurrentSettings} {sliderValue}
            </div>
          </div>
        </div>
        <div className="label_setting">
          {props.languageOptions.GifAnimSetting}
        </div>
        <div className="gif_anim">
          <div className="set4">
            <div>{props.languageOptions.IsGifAnimSetting}</div>
            <div
              className="square"
              onClick={() => {
                handleIsGifAnimClick();
              }}
            >
              {props.isGifAnim && (
                <svg
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="rgb(219, 219, 219)"
                >
                  <path d="M9 19.4L3.3 13.7 4.7 12.3 9 16.6 20.3 5.3 21.7 6.7z"></path>
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="label_setting">{props.languageOptions.LangSetting}</div>
        <div className="gif_anim">
          <div
            className="set5"
            onClick={() => {
              handleSetLang();
            }}
          >
            <div>{props.languageOptions.LangCurrentSetting}</div>
            <div className="flag_country">
              {props.isLangIndex === 0 && (
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <rect width="30" height="15" fill="#005BBB" />
                  <rect y="15" width="30" height="15" fill="#FFD100" />
                </svg>
              )}
              {props.isLangIndex === 1 && (
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <rect width="30" height="10" fill="#FFFFFF" />
                  <rect y="10" width="30" height="10" fill="#0033A0" />
                  <rect y="20" width="30" height="10" fill="#FFFFFF" />
                </svg>
              )}
              {props.isLangIndex === 2 && (
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <rect width="30" height="30" y="0" fill="#012169" />
                  <rect
                    width="6"
                    height="50"
                    y="-10"
                    x="12"
                    fill="white"
                    transform="rotate(45 15 15)"
                  />
                  <rect
                    width="6"
                    height="50"
                    y="-10"
                    x="12"
                    fill="white"
                    transform="rotate(-45 15 15)"
                  />
                  <rect
                    width="2"
                    height="50"
                    y="-10"
                    x="14"
                    fill="red"
                    transform="rotate(-45 15 15)"
                  />
                  <rect
                    width="2"
                    height="50"
                    y="-10"
                    x="14"
                    fill="red"
                    transform="rotate(45 15 15)"
                  />
                  <rect width="10" height="30" y="0" x="10" fill="white" />
                  <rect width="30" height="10" y="10" x="0" fill="white" />
                  <rect width="6" height="30" y="0" x="12" fill="red" />
                  <rect width="30" height="6" y="12" x="0" fill="red" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div
          className="reset_button"
          onClick={() => {
            handleResetSetting();
          }}
        >
          {props.languageOptions.RebootSetting}
        </div>
        <div className="version">
          {props.languageOptions.VersionSetting} 1.0
        </div>
      </div>
    </div>
  );
}

export default Settings;
