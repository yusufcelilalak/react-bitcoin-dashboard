import classes from "./Counter.module.css";
import TimeUnit from "./TimeUnit/TimeUnit";
import Card from "./UI/Card";

import { useEffect, useState } from "react";

const Counter = () => {
  const [hour, setHour] = useState(10);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds < 0) {
      setSeconds(59);
      setMins(mins - 1);
    }

    if (seconds > 59) {
      setSeconds(0);
      setMins(mins + 1);
    }

    if (mins < 0) {
      setMins(59);
      setHour(hour - 1);
    }

    if (mins > 59) {
      setMins(0);
      setHour(hour + 1);
    }
  }, [hour, mins, seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hour === 0 && mins === 0 && seconds === 0) {
        clearInterval(interval);
        return;
      }
      if (seconds === 0) {
        setSeconds(59);
        setMins(mins - 1);
        if (mins - 1 < 0) {
          setMins(59);
          setHour(hour - 1);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hour, mins, seconds]);

  const timeChangeHandler = (unit, change) => {
    if (change === "-") {
      if (unit === "hour" && hour !== 0) {
        setHour(hour - 1);
      }

      if (unit === "minutes" && (hour !== 0 || mins !== 0)) {
        setMins(mins - 1);
      }

      if (unit === "seconds" && (hour !== 0 || mins !== 0 || seconds !== 0)) {
        setSeconds(seconds - 1);
      }
    }

    if (change === "+") {
      if (unit === "hour") {
        setHour(hour + 1);
      }

      if (unit === "minutes") {
        setMins(mins + 1);
      }

      if (unit === "seconds") {
        setSeconds(seconds + 1);
      }
    }
  };

  return (
    <Card className={classes.counter}>
      <TimeUnit time={hour} unit={"hour"} onTimeChange={timeChangeHandler} />
      <TimeUnit time={mins} unit={"minutes"} onTimeChange={timeChangeHandler} />
      <TimeUnit
        time={seconds}
        unit={"seconds"}
        onTimeChange={timeChangeHandler}
      />
    </Card>
  );
};

export default Counter;
