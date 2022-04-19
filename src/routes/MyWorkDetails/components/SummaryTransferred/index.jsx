import React from "react";
import ListDetail from "../ListDetail";

//icons
import ParticipantsIcon from "../../../../assets/images/participants.svg";
import SolutionsReceivedIcon from "../../../../assets/images/solutions-received.svg";
import SubmittedIcon from "../../../../assets/images/submitted.svg";
import WorkIdIcon from "../../../../assets/images/work-id.svg";
import CostUsdIcon from "../../../../assets/images/cost-usd.svg";

const SummaryTransferred = () => {
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
        <h3>Transferred</h3>
        <p>
          We have a few outstanding questions that will help us better understand the work and 
          scope before we can launch your work on our platform. A Topcoder Solutions Expert will 
          reach out to you via email with questions about your work request. Please note, the charge 
          to your credit card has been put on hold automatically for you. 
        </p>
        <p>
          Thank you! <br/>
          The Topcoder Team
        </p>
      </div>
      <ListDetail list={listDetail} />
    </div>
  );
};

export default SummaryTransferred;