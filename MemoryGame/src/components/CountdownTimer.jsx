import React from "react";

const CountdownTimer = ({ time, startTimer }) => {
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-row items-center justify-center bg-timeColor rounded-2xl text-center h-10 w-36 p-2 hover:bg-opacity-50 mt-4">
      <h1 className="text-sky-400 text-md">
        {!startTimer ? (
          <div>Time: {time} seconds</div>
        ) : (
          <div>Time left: {formatTime(time)}</div>
        )}
      </h1>
    </div>
  );
};

export default CountdownTimer;
