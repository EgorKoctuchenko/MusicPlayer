import "../../App.css";

function ErrorPop(props) {
  return (
    <div className="wrap_error">
      <div className="error_body">
        <div className="title_er">Error!</div>
        <div className="opic_er">
          <span className="opic_er_type">Details: </span> {props.errorType}
        </div>
        <div
          className="button_er"
          onClick={() => {
            props.handleGettingError();
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  );
}

export default ErrorPop;
