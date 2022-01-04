/**
 * Help Banner component
 */
import classNames from "classnames";
import React, { useState } from "react";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import "./styles.module.scss";

const HelpBanner = ({ title, description }) => {
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

      {open && <p styleName="description">{description}</p>}
    </div>
  );
};

export default HelpBanner;
