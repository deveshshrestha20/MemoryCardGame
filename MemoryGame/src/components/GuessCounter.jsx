import React from "react";

const GuessCounter = ({ title, count }) => {
  return (
    <div className="flex flex-row items-center justify-center bg-timeColor rounded-2xl text-center h-10 w-36    ">
      <h1 className=" text-md p-2 text-sky-400 ">
        {title}: {count} / 10
      </h1>
    </div>
  );
};

export default GuessCounter;
