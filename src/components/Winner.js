import React, { useContext } from "react";
import TimeContext from "../store/time-context";

const Winner = ({ winner, onResetHandler }) => {
    const timeCtx = useContext(TimeContext);
  return (
    <>
      <form className="form-winner" onSubmit={onResetHandler}>
        {winner ? (
          <>
            <h2>Time left: {timeCtx.time}</h2>
            <h2>
              We have a winner:{" "}
              <span style={{ fontWeight: "bold" }}>{winner}</span>
            </h2>
          </>
        ) : (
          <h2>Time's up. The result is draw.</h2>
        )}
        <button>Play again!</button>
      </form>
      <div className="backdrop"></div>
    </>
  );
};

export default Winner;
