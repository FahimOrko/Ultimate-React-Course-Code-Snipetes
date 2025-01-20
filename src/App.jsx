import React from "react";
import Logo from "./Logo";
import From from "./From";
import PackingList from "./PackingList";
import Footer from "./Footer";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

const App = () => {
  return (
    <>
      <Logo />
      <From />
      <PackingList items={initialItems} />
      <Footer />
    </>
  );
};

export default App;
