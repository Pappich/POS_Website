import React, { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const ThaiVirtualKeyboard = ({ input, setInput, layout, setLayout }) => {
  const keyboardRef = useRef(null);

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      // Toggle layout between default and shift
      setLayout((prevLayout) =>
        prevLayout === "default" ? "shift" : "default"
      );
    } else if (button === "{bksp}") {
      // Handle backspace
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (!button.startsWith("{")) {
      // Append the pressed key to the existing input value
      setInput((prevInput) => prevInput + button);
    }
    else if(button === "{`}"){
      
    }
  };

  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      layoutName={layout}
      onKeyPress={onKeyPress}
    />
  );
};

export default ThaiVirtualKeyboard;
