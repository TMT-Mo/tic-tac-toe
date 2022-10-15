import React, { useState } from "react";

const TimeContext = React.createContext({
  remaining: null,
  countdown: () => {},
  time: "",
  reset: () => {},
});

export const TimeContextProvider = (props) => {
  const [remaining, setRemaining] = useState(60*20);
  const [time, setTime] = useState(null);
  const countdown = () => {
    setRemaining((prevState) => prevState - 1);
    let minutes = Math.floor(remaining / 60);
    let seconds = remaining - minutes * 60;
    setTime(`${minutes}m${seconds}s`);
  };

  const reset = () => {
    setRemaining(60*20);
    setTime(null);
  };

  const contextValue = {
    remaining,
    countdown,
    time,
    reset,
  };

  return (
    <TimeContext.Provider value={contextValue}>
      {props.children}
    </TimeContext.Provider>
  );
};

export default TimeContext;
