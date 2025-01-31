### Toggling a Boolean with `!`

The `!` operator inverts a boolean value. For example, `!true` becomes `false`, and `!false` becomes `true`. You can use this to toggle a state variable:

```jsx
<button className="close" onClick={() => setIsOpen(!isOpen)}>
  &times;
</button>
```

### Using a Function Inside `onClick`

You can execute logic within an `onClick` handler by using an inline function or referencing an external function:

```jsx
<button style={buttonColor} onClick={() => handlePrev()}>
  Previous
</button>
<button style={buttonColor} onClick={handleNext}>
  Next
</button>
```

### Best Practices for State Updates

Use a callback function to update state values correctly:

```jsx
const handleNext = () => {
  return step < 3 && setStep((s) => s + 1);
};
```

### Accessing Emojis

Press `Win + .` to open the emoji picker.

### Generating Arrays with `Array.from`

`Array.from` can be used to create an array dynamically:

```jsx
{
  Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
    <option value={num} key={num}>
      {num}
    </option>
  ));
}
```

Example usage in a form:

```jsx
<form className="add-form">
  <h3 className="font-bold text-gray-200">What do you need for this trip?</h3>
  <select>
    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
      <option value={num} key={num}>
        {num}
      </option>
    ))}
  </select>
  <input type="text" placeholder="Name of the item..." />
  <button>Add</button>
</form>
```

### Preventing Default Form Submission

Use `e.preventDefault()` to stop a form from refreshing the page:

```jsx
const onSubmit = (e) => {
  e.preventDefault();
};
```

### State vs. Props

- **State**: Internal data managed by a component.
- **Props**: External data passed from a parent component.

### Managing State Across Components

Lift the state up to the nearest parent component if multiple sibling components need access to it.

### Sorting Items

```jsx
if (sortBy === "desc") {
  sortedItems = items
    .slice()
    .sort((a, b) => a.description.localeCompare(b.description));
}

if (sortBy === "packed") {
  sortedItems = items
    .slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed));
}
```

### Confirming Actions with `window.confirm`

The `window.confirm` method prompts the user with an OK/Cancel dialog and returns a boolean:

```jsx
const confirm = window.confirm("Are you sure you want to clear the list?");
```

### Using `children` in Components

Pass children elements to a reusable button component:

```jsx
<Button buttonColor={buttonColor} handle={handlePrev}>
  👈 Previous
</Button>
<Button buttonColor={buttonColor} handle={handleNext}>
  Next 👉
</Button>

const Button = ({ buttonColor, handle, children }) => {
  return <button style={buttonColor} onClick={handle}>{children}</button>;
};
```

### Using `select` and `option`

Example dropdown menu for selecting a tip percentage:

```jsx
<select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
  <option value="5">Tip 5%</option>
  <option value="10">Tip 10%</option>
  <option value="15">Tip 15%</option>
  <option value="20">Tip 20%</option>
</select>
```
