import React, { useEffect, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRef } from "react";

const ThaiVirtualKeyboard = ({ input, setInput, layout, setLayout }) => {
  const keyboardRef = useRef(null);

  const onChange = (input) => {
    setInput(input);
  };

  const onKeyPress = (button) => {
    // Only handle shift/lock key toggle once per key press
    if (button === "{shift}" || button === "{lock}") {
      setLayout((prevLayout) => {
        return prevLayout === "default" ? "shift" : "default";
      });
    }
  };

  // Add effect to track layout state and prevent infinite toggling
  useEffect(() => {
    const timer = setTimeout(() => {
      setLayout((prevLayout) => {
        // Only toggle when necessary
        if (prevLayout === "shift") {
          return "default";
        }
        return prevLayout;
      });
    }, 300); // Add delay to avoid continuous toggling loop

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [layout]);

  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      layoutName={layout}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default ThaiVirtualKeyboard;
