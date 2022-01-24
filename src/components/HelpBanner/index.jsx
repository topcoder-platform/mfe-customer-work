/**
 * Help Banner component
 */
import classNames from "classnames";
import React, { useState } from "react";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import "./styles.module.scss";
import Button from "../Button"

const HelpBanner = ({ title, description, contactSupport }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      styleName="banner"
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
    >
      <div styleName="title">
        <span>{title}</span>

        <div styleName={classNames("arrowIcon", open ? "up" : null)}>
          <ArrowIcon />
        </div>
      </div>

      {open && title !== description && (<p styleName="description">{description}</p>)}
      {open && (<p styleName="supportButton"><Button onClick={contactSupport}>Contact support</Button></p>)}
    </div>
  );
};

export default HelpBanner;
