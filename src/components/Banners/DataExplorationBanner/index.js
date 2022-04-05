/**
 *
 *  Data exploration banner
 */
import React from "react";
import "./styles.module.scss";

export const DataExplorationBanner = () => {
  return (
    <div styleName="heroContainer">
      <div styleName="heroBackgroundContainer"></div>
      <div styleName="heroContent">
        <div styleName="heroHeader">
          <div styleName="heroHeaderContent">
            <div styleName="heroHeaderTitle">DATA EXPLORATION</div>
            <div styleName="heroHeaderSubtitle">
              Get insights about your data from Topcoder experts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorationBanner;
