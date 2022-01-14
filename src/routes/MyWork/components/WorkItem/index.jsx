import React from "react";
import PT from "prop-types";
import cn from "classnames";
import moment from "moment";
import Rating from "components/Rating";
import { formatWorkType } from "utils/formatters";
import { CHALLENGE_STATUS } from "constants/index.js";
import styles from "./styles.module.scss";

/**
 * Displays a work item for the work item list in the dashboard.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const WorkItem = ({ work }) => {
  const {
    challengeStatus,
    created,
    id,
    legacy,
    messagesCount,
    messagesHasNew,
    name,
    nextActionName,
    numOfRegistrants,
    rating,
    workStatus,
  } = work;
  const subTrack = legacy?.subTrack;
  return (
    <div styleName="container">
      <div styleName="header">
        <div
          styleName="status"
          className={cn(styles[(challengeStatus || "").toLowerCase()])}
        >
          {workStatus}
        </div>
        {nextActionName && (
          <div styleName="next-action">
            Next Action&nbsp;-&nbsp;{nextActionName}
          </div>
        )}
        <div styleName="date-created">
          Created: {moment(created).format("MM/DD/YY")}
        </div>
      </div>
      <div styleName="title">{name}</div>
      {subTrack && <div styleName="type">{formatWorkType(subTrack)}</div>}
      <div styleName="info">
        <div styleName="id">
          Work ID: <span>{id}</span>
        </div>
        <div styleName="participants">
          Participants: {numOfRegistrants || 0}
        </div>
        {!!messagesCount && (
          <div
            styleName="messages"
            className={cn({ [styles.hasNew]: messagesHasNew })}
          >
            Unread Messages
            <span styleName="count">{messagesCount}</span>
          </div>
        )}
        {challengeStatus === CHALLENGE_STATUS.COMPLETED &&
          rating !== undefined && (
            <div styleName="rating">
              Rating <Rating className={styles.stars} rating={rating} />
            </div>
          )}
      </div>
    </div>
  );
};

WorkItem.propTypes = {
  work: PT.shape({
    challengeStatus: PT.string.isRequired,
    created: PT.string.isRequired,
    id: PT.string.isRequired,
    legacy: PT.object.isRequired,
    messagesCount: PT.number.isRequired,
    messagesHasNew: PT.bool,
    name: PT.string.isRequired,
    nextActionName: PT.string,
    numOfRegistrants: PT.number,
    rating: PT.number.isRequired,
    status: PT.string,
    workStatus: PT.string.isRequired,
  }).isRequired,
};

export default WorkItem;
