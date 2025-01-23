import React from "react";

const Stat = ({ reset, children }) => {
  return (
    <div>
      {children}
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Stat;
