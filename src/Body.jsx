import React, { useState } from "react";

const Body = () => {
  const [step, updateStep] = useState(1);
  const [count, updateCount] = useState(0);
  const buttonStyle = { height: "54px", width: "54px" };
  const date = new Date();
  date.setDate(date.getDate() + count);
  //   console.log(date);
  //   const day = date.getDay();
  //   const month = date.getMonth();
  //   const year = date.getFullYear();

  const addCount = () => {
    updateCount((c) => c + step);
  };

  const minusCount = () => {
    updateCount((c) => c - step);
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <input
            type="range"
            min={1}
            max={10}
            value={step}
            onChange={(e) => {
              updateStep(Number(e.target.value));
            }}
          />
          <p>Step : {step}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button style={buttonStyle} onClick={minusCount}>
            -
          </button>
          <input
            type="text"
            placeholder="Enter a number"
            value={count}
            onChange={(e) => updateCount(Number(e.target.value))}
          />
          <button style={buttonStyle} onClick={addCount}>
            +
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <h3>
          {count} day form today is {date.toDateString()}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            updateCount(0);
            updateStep(1);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Body;
