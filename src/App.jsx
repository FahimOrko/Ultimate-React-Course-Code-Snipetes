import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setConvertedAmount(data.rates[to]);
      } catch (e) {
        console.log(e.message);
      }
    };

    if (from === to) {
      setConvertedAmount(amount);
      return;
    }
    if (amount !== "" && from !== "" && to !== "") {
      getData();
    }
    return () => {
      controller.abort();
    };
  }, [amount, from, to]);

  // console.log(amount, from, to);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Write the anount you want to convert"
        />
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{convertedAmount}</p>
      </div>
    </>
  );
}

export default App;
