import React, { useState } from "react";
import { Item } from "./Item";

const PackingList = ({ items, handleDeleteItem, handleChecked, onClear }) => {
  // console.log(props, "on packing list props");
  const [sortBy, setSortBy] = useState("input");

  let sorteditems;

  sortBy === "input" && (sorteditems = items);

  sortBy === "desc" &&
    (sorteditems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)));

  sortBy === "packed" &&
    (sorteditems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)));

  return (
    <>
      <div className="list h-">
        <ul>
          {sorteditems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDelete={handleDeleteItem}
              handleChecked={handleChecked}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input</option>
            <option value="desc">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClear}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default PackingList;
