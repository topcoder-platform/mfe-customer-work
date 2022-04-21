import React from "react";

import { WorkTable } from '../../../../../src-ts/tools/work'
import { ProfileProvider, WorkProvider } from "../../../../../src-ts/lib"
/**
 * Displays a list of work items for dashboard.
 *
 * @returns {JSX.Element}
 */
const WorkList = () => {
  return (
    <ProfileProvider>
      <WorkProvider>
        <WorkTable />
      </WorkProvider>
    </ProfileProvider>
  )
};

export default WorkList;
