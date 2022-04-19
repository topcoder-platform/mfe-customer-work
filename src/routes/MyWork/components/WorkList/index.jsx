import React from "react";
import { useSelector } from "react-redux";

import { WorkList as WorkListTs } from '../../../../../src-ts/tools/work'

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
      <WorkListTs challenges={works} />
  )
};

export default WorkList;
