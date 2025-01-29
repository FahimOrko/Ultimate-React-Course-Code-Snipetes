import React from "react";

export const ErrorMsg = ({ msg }) => {
  return (
    <p className="error">
      <span>⛔⛔</span>
      {msg}
    </p>
  );
};
