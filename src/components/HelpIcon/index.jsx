import React, { useRef } from "react";
import ReactTooltip from "react-tooltip";
import HintIcon from "../../assets/images/icon-hint.svg";
import { v4 as uuidv4 } from "uuid";

import "./styles.module.scss";

const HelpIcon = ({ children }) => {
  const tooltipId = useRef(uuidv4());

  return (
    <div styleName="help-icon">
      <HintIcon data-tip data-for={tooltipId.current} />
      <ReactTooltip
        arrowColor="#f4f4f4"
        backgroundColor="#f4f4f4"
        styleName="tooltip"
        id={tooltipId.current}
        aria-haspopup="true"
      >
        {children}
      </ReactTooltip>
    </div>
  );
};

export default HelpIcon;
