import React, { useEffect } from "react";

export const Timer = ({ dispatch, secRemaining }) => {
  const mins = Math.floor(secRemaining / 60);
  const seconds = secRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
