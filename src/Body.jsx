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

  const addStep = () => {
    updateStep((s) => s + 1);
  };
  const minusStep = () => {
    step > 1 && updateStep((s) => s - 1);
  };

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
          <button style={buttonStyle} onClick={minusStep}>
            -
          </button>
          <p style={{ margin: "20px" }}>step : {step}</p>
          <button style={buttonStyle} onClick={addStep}>
            +
          </button>
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
          <p style={{ margin: "20px" }}>count : {count}</p>
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
    </>
  );
};

export default Body;
