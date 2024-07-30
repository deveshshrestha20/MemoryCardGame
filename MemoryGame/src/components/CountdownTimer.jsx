import React from "react";

const CountdownTimer = ({ time }) => {
  return (
    <div className="flex flex-row items-center justify-center bg-timeColor rounded-2xl text-center h-10 w-36 p-2 hover:bg-opacity-50 mt-4 ">
      <h1 className="  text-sky-400 text-md">
        Time Left: {time}
      </h1>
    </div>
  );
};

export default CountdownTimer;
