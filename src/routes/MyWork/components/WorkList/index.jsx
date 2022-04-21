import React from "react";

import { WorkList as WorkListTs } from '../../../../../src-ts/tools/work'
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
        <WorkListTs />
      </WorkProvider>
    </ProfileProvider>
  )
};

export default WorkList;
