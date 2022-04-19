import React from "react";
import ProgressBar from "../Progress";
import ListDetail from "../ListDetail";

//icons
import ParticipantsIcon from "../../../../assets/images/participants.svg";
import SolutionsReceivedIcon from "../../../../assets/images/solutions-received.svg";
import SubmittedIcon from "../../../../assets/images/submitted.svg";
import WorkIdIcon from "../../../../assets/images/work-id.svg";
import CostUsdIcon from "../../../../assets/images/cost-usd.svg";

const Summary = () => {
  const progress = [
    { stepNumber: '1', name: 'Submitted', date: '12/22/2021'},
    { stepNumber: '2', name: 'Started', date: '12/22/2021' },
    { stepNumber: '3', name: 'In Review', date: '12/22/2021' },
    { stepNumber: '4', name: 'Solutions Ready', date: '12/22/2021' },
    { stepNumber: '5', name: 'Done', date: '12/22/2021' }
  ];
  const listDetail = [
    { icon: <ParticipantsIcon />, name: 'Participants', info: '23' },
    { icon: <SolutionsReceivedIcon />, name: 'Solutions Received', info: '5' },
    { icon: <SubmittedIcon />, name: 'Submitted', info: '12/22/2021' },
    { icon: <WorkIdIcon />, name: 'Work id', info: '#1234567890' },
    { icon: <CostUsdIcon />, name: 'Cost usd', info: '$1,100' }
  ];

  return (
    <div className="summary">
      <div className="grey-box">
        <h3>Progress</h3>
        <ProgressBar selectItem="3" progresslist={progress} />
      </div>
      <ListDetail list={listDetail} />
    </div>
  );
};

export default Summary;