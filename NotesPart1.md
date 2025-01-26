### Using !

A boolean value can be toggled using `!`. For example, `!true` equals `false` and vice versa (`!false` equals `true`). You can apply this by placing `!` before a variable containing a boolean value to get its opposite:

```
    <button
      className="close"
        onClick={() => {
          // console.log("-------------------------------------");
          // console.log("intaitally", isOpen);
          // console.log("after change", !isOpen);
          // console.log("-------------------------------------");
          return setIsOpen(!isOpen);
        }} >
      &times;
    </button>
```

### Using a Function Inside onClick

You can use a function inside the onClick handler to execute logic as long as it returns a value. When using a function defined outside the JSX code, simply write its name without parentheses to reference it, as React expects it that way.

```
    <button style={buttonColor} onClick={() => handlePrev()}>
      Previous
    </button>
    <button style={buttonColor} onClick={handleNext}>
      Next
    </button>
```

### Best Practices for Using States

Use a callback function when updating states. For example:

    ```
    const handleNext = () => {
      return step < 3 && setStep((s) => s + 1);
    };
    ```

### Get Emojis Section

button - win + .

### Array.from Method

This method is helpful for generating arrays, such as rows of numbers.

```
    {Array.from({ length: 20 }, (\_, i) => i + 1).map((num) => (
      <option value={num} key={num}>
        {num}
      </option>
    ))}
```

Here’s what happens:

1. A list of numbers from [1, 20] is generated using Array.from.
2. The .map() function loops over the list.
3. Basic JavaScript is used to create options for a <select> dropdown.

```
   <form className="add-form">
     <h3 className="font-bold text-gray-200">
       Don't forget to bring your stuff now, So what do you think you need for
       this trip?
     </h3>
     <select>
       {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
         <option value={num} key={num}>
           {num}
         </option>
       ))}
     </select>
     <input type="text" placeholder="Name of the item...." />
     <button>Add</button>
   </form>
```

### Prevent Default on Form Submit

Use e.preventDefault() to stop the default behavior when submitting forms.

```
    const onSubmit = (e) => {
      e.preventDefault();
    };
```

### Difference Between State and Props

- State: Internal data, acts like a memory for components.
- Props: External data, used for communication between parent and child components.

### Ways to use state

- Lift the state to the nearest parent component if sibling components also need access to it.

### Sorting Items

```
    sortBy === "desc" &&
      (sorteditems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description)));

    sortBy === "packed" &&
      (sorteditems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed)));
```

### Window Alert for Confirmation

The window.confirm method returns a boolean value: true if "OK" is clicked, otherwise false.

```
const confirm = window.confirm("Are you sure you want to clear the list ?");
```

### Using Children

You can pass children to a reusable button component like this:

```
    <Button buttonColor={buttonColor} handle={handlePrev}>
      👈 Previous
    </Button>
    <Button buttonColor={buttonColor} handle={handleNext}>
      Next 👉{" "}
    </Button>


    const Button = ({ buttonColor, handle, children }) => {
      return (
        <button style={buttonColor} onClick={handle}>
          {children}
        </button>
      );
    };
```

### Using <select> and <option>

Example of a <select> dropdown with options:

```
    <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
      <option value="5">Tip five precent (5%)</option>
      <option value="10">Tip five precent (10%)</option>
      <option value="15">Tip five precent (15%)</option>
      <option value="20">Tip five precent (20%)</option>
    </select>
```
