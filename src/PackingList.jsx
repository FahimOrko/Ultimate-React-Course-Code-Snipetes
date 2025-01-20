import React from "react";
import { Item } from "./Item";

const PackingList = (props) => {
  return (
    <div className="list h-screen">
      <ul>
        {props.items.map((e) => (
          <Item item={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};

export default PackingList;
