export const Item = ({ item, onDelete, handleChecked }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => handleChecked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          // console.log(item.id);
          return onDelete(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
};
