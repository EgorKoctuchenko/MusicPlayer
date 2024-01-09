//Компонент для регуляторности звука
import React, { useState, useEffect } from "react";

function Volume(props) {
  const [volumeIcon, setVolumeIcon] = useState(
    <svg
      fill="#000000"
      height="40px"
      width="40px"
      viewBox="0 0 512.002 512.002"
    >
      <g>
        <g>
          <path
            d="M221.119,9.05L109.593,120.576H0v270.849h109.593l111.526,111.526h49.729V9.05H221.119z M223.052,437.29l-93.661-93.661
                H47.797V168.373h81.594l93.661-93.66V437.29z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M343.511,137.71l-33.797,33.797c46.589,46.591,46.589,122.398,0,168.987l33.797,33.797
                C408.736,309.067,408.736,202.935,343.511,137.71z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M428.005,53.216l-33.797,33.797c45.138,45.138,69.997,105.152,69.997,168.987s-24.859,123.85-69.997,168.987
                l33.797,33.797c54.167-54.165,83.997-126.182,83.997-202.785S482.172,107.381,428.005,53.216z"
          />
        </g>
      </g>
    </svg>
  );
  //
  //UseEffect для того, чтобы динамично менялось svg в зависимости от громкости
  //
  useEffect(() => {
    if (props.volume >= 0.7)
      setVolumeIcon(
        <svg
          fill="#000000"
          height="40px"
          width="40px"
          viewBox="0 0 512.002 512.002"
        >
          <g>
            <g>
              <path
                d="M221.119,9.05L109.593,120.576H0v270.849h109.593l111.526,111.526h49.729V9.05H221.119z M223.052,437.29l-93.661-93.661
			H47.797V168.373h81.594l93.661-93.66V437.29z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M343.511,137.71l-33.797,33.797c46.589,46.591,46.589,122.398,0,168.987l33.797,33.797
			C408.736,309.067,408.736,202.935,343.511,137.71z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M428.005,53.216l-33.797,33.797c45.138,45.138,69.997,105.152,69.997,168.987s-24.859,123.85-69.997,168.987
			l33.797,33.797c54.167-54.165,83.997-126.182,83.997-202.785S482.172,107.381,428.005,53.216z"
              />
            </g>
          </g>
        </svg>
      );
    else if (props.volume >= 0.3) {
      setVolumeIcon(
        <svg
          fill="#000000"
          height="40px"
          width="40px"
          viewBox="0 0 512.002 512.002"
        >
          <g>
            <g>
              <path
                d="M221.119,9.05L109.593,120.576H0v270.849h109.593l111.526,111.526h49.729V9.05H221.119z M223.052,437.29l-93.661-93.661
			H47.797V168.373h81.594l93.661-93.66V437.29z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M343.511,137.71l-33.797,33.797c46.589,46.591,46.589,122.398,0,168.987l33.797,33.797
			C408.736,309.067,408.736,202.935,343.511,137.71z"
              />
            </g>
          </g>
        </svg>
      );
    } else if (props.volume >= 0.05) {
      setVolumeIcon(
        <svg
          fill="#000000"
          height="40px"
          width="40px"
          viewBox="0 0 512.002 512.002"
        >
          <g>
            <g>
              <path
                d="M221.119,9.05L109.593,120.576H0v270.849h109.593l111.526,111.526h49.729V9.05H221.119z M223.052,437.29l-93.661-93.661
                H47.797V168.373h81.594l93.661-93.66V437.29z"
              />
            </g>
          </g>
        </svg>
      );
    } else {
      setVolumeIcon(
        <svg
          fill="#000000"
          height="40px"
          width="40px"
          viewBox="0 0 512.002 512.002"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g>
              <path
                d="M221.119,9.05L109.593,120.576H0v270.849h109.593l111.526,111.526h49.729V9.05H221.119z M223.052,437.29l-93.661-93.661
          H47.797V168.373h81.594l93.661-93.66V437.29z"
              />
            </g>
          </g>
          <g>
            <line
              x1="0"
              y1="0"
              x2="330"
              y2="500"
              stroke="#000000"
              strokeWidth="50"
            />
          </g>
        </svg>
      );
    }
  }, [props.volume]);
  //
  //При наведении, появляется менюшка с громкостью
  //
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="volume_line"
      onClick={props.handleRepeat}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {volumeIcon}
      {isHovered && (
        <div
          className={`${
            props.isMainMenu ? "volume_line_second_main" : "volume_line_second"
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={props.volume}
            onChange={(e) =>
              props.handleVolumeChange(parseFloat(e.target.value))
            }
          />
          <div>{Math.round(props.volume * 100)}%</div>
        </div>
      )}
    </div>
  );
}

export default Volume;
