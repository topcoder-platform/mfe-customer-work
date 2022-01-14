import React from "react";
import { useSelector } from "react-redux";
import WorkItem from "../WorkItem";
import { getWorks } from "selectors/myWork";
import "./styles.module.scss";

/**
 * Displays a list of work items for dashboard.
 *
 * @returns {JSX.Element}
 */
const WorkList = () => {
  const works = useSelector(getWorks);
  return (
    <div styleName="container">
      {works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
    </div>
  );
};

export default WorkList;
