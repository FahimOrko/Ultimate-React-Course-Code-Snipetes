import React from "react";

const Footer = ({ items }) => {
  if (items.length === 0)
    return (
      <footer className="stats">
        <em>Start adding your items</em>
      </footer>
    );

  const toatalItems = items.length;
  const totalPackedItems = items.reduce(
    (acc, curr) => acc + (curr.packed ? 1 : 0),
    0
  );
  const percentage =
    totalPackedItems > 0
      ? Math.round((totalPackedItems / toatalItems) * 100)
      : 0;

  return (
    <footer className="stats">
      {percentage === 100 && toatalItems > 0 ? (
        <em>You have packed eveything</em>
      ) : (
        <em>
          Number of items in the cart is {toatalItems}, And the number of total
          item packed is {totalPackedItems} ({percentage}%)
        </em>
      )}
    </footer>
  );
};

export default Footer;
