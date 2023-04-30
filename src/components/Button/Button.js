import React from "react";
import "../../styles/button/button.css";
import { motion } from "framer-motion";

function Button(props) {
  if (props.isAnimated) {
    return (
      <motion.div
        whileTap={{ scale: 0.9 }}
        data-button-input={props.buttonInput}
        className={props.buttonType}
        onClick={(e) => props.handleTask(e)}
      >
        {props.label}
      </motion.div>
    );
  }
  return (
    <div
      data-button-input={props.buttonInput}
      className={props.buttonType}
      onClick={(e) => props.handleTask(e)}
    >
      {props.label}
    </div>
  );
}

Button.defaultProps = {
  label: "Button",
  buttonType: "default-button",
  isAnimated: false,
};

export default Button;
