import React, { useState } from "react";

const From = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { quantity, description, id: Date.now(), packed: false };
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h3 className="font-bold text-gray-200">
        Don't forget to bring your stuff now, So what do you think you need for
        this trip?
      </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Name of the item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default From;
