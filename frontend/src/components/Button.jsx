import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  handleFunction,
}) => {
  const { setIsClicked, initialState } = useStateContext();
  const handleonClick = () => {
    if(handleFunction)
      handleFunction();
    setIsClicked(initialState);
  }
  return (
    <button
      type="button"
      onClick={handleonClick}

      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
