import React, { useContext, useEffect} from "react";
import TimeContext from "../store/time-context";

const Clock = ({ onFinishHandler, isBegin }) => {

  const timeCtx = useContext(TimeContext)
  useEffect(() => {
    isBegin &&
      setTimeout(() => timeCtx.countdown(), 1000);
  }, [isBegin, timeCtx]);

  useEffect(() => {
    if(timeCtx.remaining === 0){
      onFinishHandler()
    }
  }, [timeCtx.remaining, onFinishHandler]);
  return (
    <div style={{ fontWeight: "bold", fontSize: "20px" }}>
      <h2>Time left: {timeCtx.time}</h2>
    </div>
  );
};
export default Clock;
