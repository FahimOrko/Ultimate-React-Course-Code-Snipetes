### using !

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

### Using fuction indside on click fucntion

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
