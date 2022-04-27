import React from "react";
import Button from "components/Button";
import { BUTTON_SIZE } from "constants/index.js";

import "./styles.module.scss";

const Header = ({ title, onClick, buttonContent }) => {
  return (
    <div styleName="container">
      <h1 styleName="heading">{title}</h1>
      <Button size={BUTTON_SIZE.MEDIUM} className="button" onClick={onClick}>
        {buttonContent}
      </Button>
    </div>
  );
};

export default Header;
