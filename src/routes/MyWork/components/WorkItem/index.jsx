import React from "react";
import PT from "prop-types";
import cn from "classnames";
import moment from "moment";
import Rating from "components/Rating";
import { formatWorkType } from "utils/formatters";
import { CHALLENGE_STATUS } from "constants/index.js";
import { Link } from "@reach/router";
import { cacheChallengeId } from "../../../../autoSaveBeforeLogin";
import styles from "./styles.module.scss";
import ClipLoader from "react-spinners/ClipLoader";
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
    numOfRegistrants,
    rating,
    workStatus,
    forumNotificationLoading,
  } = work;
  const subTrack = legacy?.subTrack;
  const url =
    workStatus === CHALLENGE_STATUS.DRAFT
      ? "/self-service/wizard"
      : `/self-service/work-items/${id}`;
  return (
    <Link
      styleName="container"
      to={url}
      onClick={() => {
        if (workStatus === CHALLENGE_STATUS.DRAFT) {
          cacheChallengeId(id);
        }
      }}
    >
      <div styleName="header">
        <div
          styleName="status"
          className={cn(styles[(challengeStatus || "").toLowerCase()])}
        >
          {workStatus}
        </div>
        <div styleName="date-created">
          Created: {moment(created).format("MM/DD/YY")}
        </div>
      </div>
      <div styleName="title">{name}</div>
      {subTrack && <div styleName="type">{formatWorkType(subTrack)}</div>}
      <div styleName="info">
        <div styleName="participants">
          Participants: {numOfRegistrants || 0}
        </div>
        {(!!messagesCount || !!forumNotificationLoading) && (
          <div
            styleName="messages"
            className={cn({ [styles.hasNew]: messagesHasNew })}
          >
            Unread Messages
            {!!forumNotificationLoading ? (
              <div styleName="forumLoader">
                <ClipLoader size={12} loading={true} />
              </div>
            ) : (
              <span styleName="count">{messagesCount}</span>
            )}
          </div>
        )}
        {challengeStatus === CHALLENGE_STATUS.COMPLETED &&
          rating !== undefined && (
            <div styleName="rating">
              Rating <Rating className={styles.stars} rating={rating} />
            </div>
          )}
      </div>
    </Link>
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
