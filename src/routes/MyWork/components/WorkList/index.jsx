import React from "react";

import { WorkTable } from '../../../../../src-ts/tools/work'
import { WorkProvider } from "../../../../../src-ts/lib"
/**
 * Displays a list of work items for dashboard.
 *
 * @returns {JSX.Element}
 */
const WorkList = () => {
  return (
    <WorkProvider>
      <WorkTable />
    </WorkProvider>
  )
};

export default WorkList;
