/**
 * Help Banner component
 */
import classNames from "classnames";
import React, { useState } from "react";
import cn from "classnames";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import "./styles.module.scss";

const HelpBanner = ({ title, description, children, styles = [] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      styleName={cn("banner", ...styles)}
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

      {open && <p styleName="description">{children || description}</p>}
    </div>
  );
};

export default HelpBanner;
