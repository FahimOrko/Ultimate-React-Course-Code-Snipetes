import React, { useState } from "react";
import Logo from "./Logo";
import From from "./From";
import PackingList from "./PackingList";
import Footer from "./Footer";

const App = () => {
  const [items, setItem] = useState([]);

  const onClear = () => {
    const confirm = window.confirm("Are you sure you want to clear the list ?");
    confirm && setItem([]);
  };

  const onClick = (item) => {
    setItem((i) => [...i, item]);
  };

  const handleDeleteItem = (id) => {
    setItem((items) => {
      return items.filter((item) => item.id !== id);
    });
  };

  const handleChecked = (id) => {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  // console.log(items, "items here");

  return (
    <>
      <Logo />
      <From onClick={onClick} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleChecked={handleChecked}
        onClear={onClear}
      />
      <Footer items={items} />
    </>
  );
};

export default App;
