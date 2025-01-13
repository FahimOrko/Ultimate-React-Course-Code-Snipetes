import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const App = () => {
  return (
    <div className="container header ">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Header = () => {
  // const style = { color: "red", fontSize: "32px", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Welcome to React Pizaa Page</h1>
    </header>
  );
};

const Menu = () => {
  const pizzas = pizzaData;
  const pizzaLenght = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaLenght > 0 ? (
        <>
          <p>Authentic Italian Store. Six pizzas to choose from.</p>
          <ul className="pizzas">
            {pizzas.map((elem) => (
              <Pizza
                key={elem.id}
                name={elem.name}
                ingredients={elem.ingredients}
                price={elem.price + 2}
                photoName={elem.photoName}
                soldOut={elem.soldOut}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>Were still working on our menu</p>
      )}
    </main>
  );
};

const Pizza = (props) => {
  const pizzaName = props.name;
  const pizzaIngredients = props.ingredients;
  const pizzaPrice = props.price;
  const pizzaPhotoName = props.photoName;
  //   const pizzaPhotoSrc = `.././public/pizzas/${pizzaPhotoName}`;
  const pizzaAvalavility = props.soldOut;
  const pizzaAvalavilityClass = `pizza ${pizzaAvalavility ? "sold-out" : ""} `;

  return (
    <div className={pizzaAvalavilityClass}>
      <img src={pizzaPhotoName} alt="pizza spanich"></img>
      <div>
        <h3>{pizzaName}</h3>
        <p>{pizzaIngredients}</p>
        <span>{pizzaPrice}</span>
        <p>{pizzaAvalavility ? "Sold Out" : "Avaiable"}</p>
      </div>
    </div>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      <p>
        {isOpen ? (
          <div className="order">
            We are open until {closeHour}:00. Come visit us or Order Online
            <button className="btn">Order Now</button>
          </div>
        ) : (
          <p>We are closed</p>
        )}
      </p>
    </footer>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// export default App;
