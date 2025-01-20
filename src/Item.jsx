export const Item = (props) => {
  return (
    <li>
      <span>
        {props.item.quantity} {props.item.description}
      </span>
      <button>❌</button>
    </li>
  );
};
