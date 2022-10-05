import Card from "../UI/Card";
import classes from "./TimeUnit.module.css";

const TimeUnit = (props) => {
  return (
    <Card className={classes["time-unit"]}>
      <div className={classes["unit"]}>
        <div>{props.time}</div>
        <h2>{props.unit}</h2>
      </div>
      <div className={classes["time-changer-buttons"]}>
        <button
          onClick={() => {
            props.onTimeChange(props.unit, "+");
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            props.onTimeChange(props.unit, "-");
          }}
        >
          -
        </button>
      </div>
    </Card>
  );
};

export default TimeUnit;
