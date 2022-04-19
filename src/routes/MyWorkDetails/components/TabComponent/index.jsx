import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import * as selectors from "selectors/myWork";

import Summary from "../Summary";
import SummaryTransferred from "../SummaryTransferred";

import "./style.scss";

/**
 * Displays My Work Dashboard with work item list.
 *
 * @returns {JSX.Element}
 */

const TabNavItem = ({ id, title, activeTab, setActiveTab, number, classNameTabItem }) => {
 
  const handleClick = () => {
    setActiveTab(id);
  };
  
  return (
    <li onClick={handleClick} className={`${classNameTabItem} ${activeTab === id ? "active" : ""}`}>
      { title } 
      {classNameTabItem && <span className="number medium-subtitle"> { number }</span>}
    </li>
  );
};

const TabContent = ({id, activeTab, children}) => {
  return ( activeTab === id ? <div className="tab-content"> { children }</div> : null );
};
 
const Tabs = () => {

  const dispatch = useDispatch();

  const worksCount = useSelector(selectors.getWorksCount);
  const worksError = useSelector(selectors.getWorksError);

  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="tabs">
      <ul className="nav">
        <TabNavItem title="Summary" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Details" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem classNameTabItem="messages" title="Messages" number="3" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem classNameTabItem="sulutions" title="Solutions" number="5" id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>

      <TabContent id="tab1" activeTab={activeTab}>
        {worksError ? (
          <div className="error">
            <span>{worksError}</span>
          </div>
        ) : worksCount ? (
          <SummaryTransferred></SummaryTransferred>
        ) : (
          <Summary></Summary>
        )}
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <p>Tab 2 works!</p>
      </TabContent>
      <TabContent id="tab3" activeTab={activeTab}>
        <p>Tab 3 works!</p>
      </TabContent>
      <TabContent id="tab4" activeTab={activeTab}>
        <p>Tab 3 works!</p>
      </TabContent>
    </div>
  );
};

const mapStateToProps = ({ form }) => form;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);