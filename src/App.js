import { useContext, useState } from "react";
import "./App.css";
import Clock from "./components/Clock";
import Introduction from "./components/Introduction";
import Players from "./components/Players";
import Winner from "./components/Winner";
import TimeContext from "./store/time-context";

function App() {
  const [firstPlayer, setFirstPlayer] = useState(null);
  const [secondPlayer, setSecondPlayer] = useState(null);
  const [isFPTurn, setIsFPTurn] = useState(true);
  const [isBegin, setIsBegin] = useState(false);
  const [board, setBoard] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const timeCtx = useContext(TimeContext);

  const onSavePlayers = () => {
    setIsBegin(true);
    let dimension = [];
    for (let i = 0; i < 30; i++) {
      dimension.push(Array(30).fill(""));
    }
    setBoard(dimension);
  };

  // *------------------------------------------------- Check Horizontally -------------------------------------------------
  const checkHorizontally = ({ rowIndex, columnIndex, dimension }) => {
    let check = [];
    for (let i = 0; i < dimension[rowIndex].length; i++) {
      let currentValue = dimension[rowIndex][i];

      // * if check meets different value from the existing one => reset check
      if (!check.includes(currentValue) && currentValue !== "") {
        check = [];
      }

      // * push currValue to check
      if (currentValue !== "" && currentValue) {
        check.push(currentValue);
      }
      // * the front or back value either existed when check reaches 5 same value to win the game
      if (check.length === 5) {
        if (
          dimension[rowIndex][i + 1] !== currentValue &&
          dimension[rowIndex][i + 1] !== ""
        ) {
          check = [];
        } else {
          isFPTurn ? setWinner(firstPlayer) : setWinner(secondPlayer);
          console.log("first");
          onFinishHandler();
          break;
        }
      }
    }
  };

  // *------------------------------------------------- Check Vertically -------------------------------------------------
  const checkVertically = ({ rowIndex, columnIndex, dimension }) => {
    let check = [];
    for (let i = 0; i < dimension.length; i++) {
      let currentValue = dimension[i][columnIndex];

      // * if check meets different value from the existing one => reset check
      if (!check.includes(currentValue) && currentValue !== "") {
        check = [];
      }

      // * if check meets different value from the existing one => reset check
      if (currentValue !== "" && currentValue) {
        check.push(currentValue);
      }

      // * the front or back value either existed when check reaches 5 same value to win the game
      if (check.length === 5) {
        if (
          dimension[i + 1][columnIndex] !== currentValue &&
          dimension[i + 1][columnIndex] !== ""
        ) {
          check = [];
        } else {
          isFPTurn ? setWinner(firstPlayer) : setWinner(secondPlayer);
          console.log("second");
          onFinishHandler();
          break;
        }
      }
    }
  };

  // *------------------------------------------------- Check Cross Line -------------------------------------------------
  const checkCrossLine = ({ rowIndex, columnIndex, dimension }) => {
    let saveLeftList = [];
    let saveRightList = [];
    let currentValue;
    let columnRightPoint;
    let rowRightPoint;
    let columnLeftPoint;
    let rowLeftPoint;

    // * Find the highest position by go crossing to top-right from current position
    for (let i = 1; i <= dimension.length; i++) {
      rowRightPoint = rowIndex - i;
      columnRightPoint = columnIndex + i;
      if (columnRightPoint === dimension.length - 1 || rowRightPoint === 0) {
        break;
      }
    }
    // * Find the highest position by go crossing to top-left from current position
    for (let i = 1; i <= dimension.length; i++) {
      rowLeftPoint = rowIndex - i;
      columnLeftPoint = columnIndex - i;
      if (rowLeftPoint === 0 || columnLeftPoint === 0) {
        break;
      }
    }

    // * From top-left go down and check every cell
    // console.log(saveLeftList)
    for (let i = 0; i < dimension.length - 1; i++) {
      // * row will go up - column will go up
      currentValue = dimension[rowLeftPoint + i][columnLeftPoint + i];
      // console.log(currentValue)

      if (!saveLeftList.includes(currentValue) && currentValue !== "") {
        saveLeftList = [];
      }
      if (currentValue !== "") {
        saveLeftList.push(currentValue);
      }
      // console.log(saveLeftList)
      if (saveLeftList.length === 5) {
        let frontValue =
          dimension[rowLeftPoint + i + 1][columnLeftPoint + i + 1];
        let backValue =
          dimension[rowLeftPoint + i - 5][columnLeftPoint + i - 5];
        // * o x x x x x o || x o o o o o x => reset save list
        // console.log('frontValue: ',frontValue)
        // console.log('backValue: ',backValue)
        // console.log('currentValue: ', currentValue)
        if (
          frontValue === backValue &&
          frontValue !== currentValue &&
          frontValue !== ""
        ) {
          saveLeftList = [];
        } else {
          // * '' x x x x x '' || '' o o o o o '' => win the game
          isFPTurn ? setWinner(firstPlayer) : setWinner(secondPlayer);
          console.log("third");
          onFinishHandler();
          break;
        }
      }
      // * Exit loop when reach limitation of dimension
      // console.log('rowLeftPoint + i: ',rowLeftPoint + i)
      // console.log('dimension.length - rowLeftPoint: ', dimension.length - rowLeftPoint)
      // console.log('columnLeftPoint + i: ', columnLeftPoint + i)
      // console.log('dimension.length - columnLeftPoint: ', dimension.length)
      if (
        rowLeftPoint + i === dimension.length - 1 ||
        columnLeftPoint + i === dimension.length - 1
      ) {
        break;
      }
    }

    // * From top-right go down and check every cell
    for (let i = 0; i < dimension.length - 1; i++) {
      // *row will increase instantly - column will go down instantly

      currentValue = dimension[rowRightPoint + i][columnRightPoint - i];

      if (!saveRightList.includes(currentValue) && currentValue !== "") {
        saveRightList = [];
      }
      if (currentValue !== "" && currentValue) {
        saveRightList.push(currentValue);
      }
      if (saveRightList.length === 5) {
        let frontValue =
          dimension[rowRightPoint + i + 1][columnRightPoint - i - 1];
        let backValue =
          dimension[rowRightPoint + i - 5][columnRightPoint - i + 5];
        // * o x x x x x o || x o o o o o x => reset save list
        if (
          frontValue === backValue &&
          frontValue !== currentValue &&
          frontValue !== ""
        ) {
          saveRightList = [];
        } else {
          // * '' x x x x x '' || '' o o o o o '' => win the game
          isFPTurn ? setWinner(firstPlayer) : setWinner(secondPlayer);
          onFinishHandler();
          break;
        }
      }
      // * Exit loop when reach limitation of dimension
      console.log("rowRightPoint + i: ", rowRightPoint + i);
      console.log("columnRightPoint - i: ", columnRightPoint - i);
      console.log(dimension.length);
      if (
        rowRightPoint + i === dimension.length - 1 ||
        columnRightPoint - i === 0
      ) {
        break;
      }
    }
  };

  // *------------------------------------------------- Save movement -------------------------------------------------
  const onMoveHandler = ({ columnIndex, rowIndex }) => {
    const dimension = board.map((row) => [...row]);
    if (dimension[rowIndex][columnIndex].length !== 0) return;
    if (isFPTurn) {
      dimension[rowIndex][columnIndex] = "x";
    } else {
      dimension[rowIndex][columnIndex] = "o";
    }
    if (rowIndex === dimension.length - 1) {
      dimension.push(Array(30).fill(""));
    } else if (rowIndex === 0) {
      dimension.unshift(Array(30).fill(""));
    } else if (columnIndex === dimension[0].length - 1) {
      for (let i = 0; i < dimension.length; i++) {
        dimension[i].push("");
      }
    } else if (columnIndex === 0) {
      for (let i = 0; i < dimension.length; i++) {
        dimension[i].unshift("");
      }
      columnIndex += 1;
    }
    setBoard(dimension);
    checkHorizontally({ rowIndex, columnIndex, dimension });
    checkVertically({ rowIndex, columnIndex, dimension });
    checkCrossLine({ rowIndex, columnIndex, dimension });
    setIsFPTurn((prevState) => !prevState);
  };

  const onFinishHandler = (value) => {
    setIsFinish(true);
    setIsBegin(false);
  };

  // * Reset the game
  const onResetHandler = () => {
    setWinner(null);
    setBoard(null);
    setFirstPlayer(null);
    setSecondPlayer(null);
    setIsFPTurn(null);
    onResetTimer();
    setIsFinish(false);
    timeCtx.reset();
  };

  const onResetTimer = () => {
    Math.random();
  };

  return (
    <div className="App">
      <div className="board-player">
        {isBegin && (
          <div className="board-intro">
            <div className="board-timing">
              <Clock onFinishHandler={onFinishHandler} isBegin={isBegin} />
              <Players
                firstPlayer={firstPlayer}
                isFPTurn={isFPTurn}
                secondPlayer={secondPlayer}
              />
            </div>
            <Introduction />
          </div>
        )}
        {!isBegin && !isFinish && (
          <form className="form-name" onSubmit={onSavePlayers}>
            <h2>Welcome to tic-tac-toe</h2>
            <div className="field">
              <span>First player:</span>
              <input required onInput={(e) => setFirstPlayer(e.target.value)} />
            </div>
            <div className="field">
              <span>Second player:</span>
              <input
                required
                onChange={(e) => setSecondPlayer(e.target.value)}
              />
            </div>
            <button>Let's go!</button>
          </form>
        )}
      </div>
      {isFinish && <Winner onResetHandler={onResetHandler} winner={winner}/>}
      {(isBegin || isFinish) && (
        <div className="board">
          {board.map((row, rowIndex) => (
            <div className="column" key={Math.random()}>
              {row.map((cell, columnIndex) => (
                <span
                  key={Math.random()}
                  className="cell"
                  onClick={onMoveHandler.bind(null, { columnIndex, rowIndex })}
                  style={{ color: `${cell === "x" ? "red" : "blue"}` }}
                >
                  {/* {rowIndex} {columnIndex} */}
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
