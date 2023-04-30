import React from "react";
import Button from "../Button/Button";
import "../../styles/input/input.css";
import { motion } from "framer-motion";

function Input(props) {
  function inputCallBack(e) {
    props.handleInputTask(e);
  }

  function buttonCallBack() {
    props.handleBtnTask();
  }

  return (
    <div className={props.containerStyle}>
      <motion.input
        whileFocus={{
          scale: 1.05,
        }}
        animate={{ transition: "easeIn" }}
        type={props.inputType}
        placeholder={props.placeHolder}
        className={props.inputStyle}
        onChange={inputCallBack}
        required={props.required}
      ></motion.input>
      <Button
        isAnimated={true}
        label="Login"
        buttonType="game-button"
        handleTask={buttonCallBack}
      />
    </div>
  );
}

export default Input;
