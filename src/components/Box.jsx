import React from "react";

const Box = ({ tip, setTip, children }) => {
  return (
    <div>
      <h3>{children}</h3>
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value="5">Tip five precent (5%)</option>
        <option value="10">Tip five precent (10%)</option>
        <option value="15">Tip five precent (15%)</option>
        <option value="20">Tip five precent (20%)</option>
      </select>
    </div>
  );
};

export default Box;
