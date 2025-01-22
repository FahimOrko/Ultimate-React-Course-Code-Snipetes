import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

const App = () => {
  return (
    <div>
      <Accordion items={faqs} />
    </div>
  );
};

const Accordion = ({ items }) => {
  return (
    <div className="accordion">
      {items.map((el, idx) => (
        <AccordionItems num={idx + 1} title={el.title} text={el.text} />
      ))}
    </div>
  );
};

const AccordionItems = ({ num, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen && "open"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="number">{num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
};

export default App;
