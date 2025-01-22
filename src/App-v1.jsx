import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const buttonColor = { backgroundColor: "#7950f2", color: "#fff" };
  const active = "active";
  // const step = 1;
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const handlePrev = () => {
    return (
      step > 1 &&
      setStep((s) => {
        // console.log(s - 1);
        return s - 1;
      })
    );
  };
  const handleNext = () => {
    return step < 3 && setStep((s) => s + 1);
  };
  return (
    <>
      <button
        className="close"
        onClick={() => {
          // console.log("-------------------------------------");
          // console.log("intaitally", isOpen);
          // console.log("after change", !isOpen);
          // console.log("-------------------------------------");
          return setIsOpen((open) => !open);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? active : ""}>1</div>
            <div className={step >= 2 ? active : ""}>2</div>
            <div className={step >= 3 ? active : ""}>3</div>
          </div>
          <p className="message">
            Step {step} : {messages[step - 1]}
          </p>
          <div className="buttons">
            <button style={buttonColor} onClick={() => handlePrev()}>
              Previous
            </button>
            <button style={buttonColor} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
