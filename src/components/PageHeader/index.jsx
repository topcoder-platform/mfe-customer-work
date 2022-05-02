import React from "react";

import { Button } from '../../../src-ts/lib'

import "./styles.module.scss";

const Header = ({ title, onClick, buttonContent }) => {
  return (
    <div styleName="container">
      <h1 styleName="heading">{title}</h1>
      <Button
        label={buttonContent}
        size='md'
        onClick={onClick}
      />
    </div>
  );
};

export default Header;
