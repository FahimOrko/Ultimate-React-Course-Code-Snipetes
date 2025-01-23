### Using !

Here a bullean value is changes when used (!ture == false) and vice versa (!false == true), and you can simple access that using the (!var) sign before the var that contains the bullean value and get the oppiste of that bullean value

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

### Using fuction indside of onClick fucntion

To my understanding you can use a fucntion inside the onlcik fuicntion and do stuff isnde it as long as it returns a values, and hwne you have a fuction outisde the html code just simply write the fuction name and not the brackets to use that fuction, because react expexts it that way

    <button style={buttonColor} onClick={() => handlePrev()}>
      Previous
    </button>
    <button style={buttonColor} onClick={handleNext}>
      Next
    </button>

### best practice for using states

set the steps with a callback fucntion like this -

    const handleNext = () => {
      return step < 3 && setStep((s) => s + 1);
    };

### Get emojis section

button - win + .

### Array form method

this is mainly used to genarate stuff like rows of number

    {Array.from({ length: 20 }, (\_, i) => i + 1).map((num) => (
      <option value={num} key={num}>
        {num}
      </option>
    ))}

Here in the code before the map fuction with the array from a list of numbers from [1,20] is created.
Then we chain the map fuction to it to loop of over the list.
And then just basic javascript inside a from to create options
the full code looks something like thios -

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

### Prevent defualt on submit in forms

    const onSubmit = (e) => {
      e.preventDefault();
    };

### Diff between state and props

state - internal data, more like memory data
props - external data, comminucation between parent and child

### Ways to use state

- lift up state to the first parent componnet, if the siblings components aloso need to use the state

### sorting Items

    sortBy === "desc" &&
      (sorteditems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description)));

    sortBy === "packed" &&
      (sorteditems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed)));

### Window alert for confirming somethging

This has a boolean value, if okay is clicked it ture else false

    const confirm = window.confirm("Are you sure you want to clear the list ?");

### Using Children

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

### Using select and option

    <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
      <option value="5">Tip five precent (5%)</option>
      <option value="10">Tip five precent (10%)</option>
      <option value="15">Tip five precent (15%)</option>
      <option value="20">Tip five precent (20%)</option>
    </select>
