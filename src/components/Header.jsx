import React from "react";

const Header = ({ totalPrice, setTotalPrice, children }) => {
  return (
    <>
      <div>
        <h2>{children}</h2>
        <input
          type="text"
          value={totalPrice}
          placeholder="Enther the price here"
          onChange={(e) => setTotalPrice(Number(e.target.value))}
        />
      </div>
    </>
  );
};

export default Header;
