import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualKeyboard = ({ input, setInput }) => {
  const [layout, setLayout] = useState("default");
  const [language, setLanguage] = useState("th");

  const onChange = (input) => {
    setInput(input);
  };

  const handleLanguageSwitch = () => {
    setLanguage(language === "th" ? "en" : "th");
  };

  const layouts = {
    en: {
      default: [
        "q w e r t y u i o p [ ]",
        "a s d f g h j k l ; '",
        "z x c v b n m , . /",
        "{shift} {space} {backspace}",
      ],
      shift: [
        "Q W E R T Y U I O P { }",
        'A S D F G H J K L : "',
        "Z X C V B N M < > ?",
        "{shift} {space} {backspace}",
      ],
    },
    th: {
      default: [
        "ๆ ไ ำ พ ะ ก น ย ล ว ะ ั",
        "ฟ ห ด ต ้ แ ข ่ า ส ว",
        "ป ็ เ ข บ ท ร ม , . /",
        "{shift} {space} {backspace}",
      ],
      shift: [
        '๐ " ฑ ณ ษ ศ ซ ม ห ฐ ณ ฒ',
        "ผ ฝ ฎ ภ ฤ ฏ ธ ถ ถ ภ",
        "ป ช ฯ ญ ญ พ ฒ พ ง ๆ ๆ",
        "{shift} {space} {backspace}",
      ],
    },
  };

  return (
    <div
      className="keyboard-container fixed bottom-0 left-0 w-full bg-gray-200 p-4"
      onMouseDown={(e) => e.preventDefault()} // Prevents blur on keyboard clicks
    >
      <Keyboard
        layoutName={layout}
        onChange={onChange}
        layout={layouts[language]}
        display={{
          "{space}": "Space",
          "{backspace}": "Backspace",
          "{shift}": "Shift",
        }}
      />
      <button onClick={handleLanguageSwitch} className="mt-2">
        {language === "th" ? "Switch to English" : "Switch to Thai"}
      </button>
    </div>
  );
};

export default VirtualKeyboard;
