import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
import _ from "lodash";
import PT from "prop-types";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageH3 from "components/PageElements/PageH3";
import { BUTTON_SIZE, BUTTON_TYPE, tabNames, WORK_STATUSES } from "constants/";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import TabPane from "./components/TabPane";
import Summary from "./components/Summary";
import Details from "./components/Details";
import Solutions from "./components/Solutions";
import FinalSurvey from "./components/Solutions/FinalSurvey";
import workUtil from "utils/work";
import { Modal } from "react-responsive-modal";
import Forum from "../Forum";

import {
  getWork,
  getSummary,
  getDetails,
  getSolutions,
  downloadSolution,
  saveSurvey,
  setIsSavingSurveyDone,
  getForumNotifications,
} from "../../actions/work";

import "./styles.module.scss";

/**
 * Work Item Page
 */
const WorkItem = ({
  workItemId,
  work,
  workItem,
  isLoadingWork,
  isLoadingSolutions,
  isSavingSurveyDone,
  forumNotifications,
  getWork,
  getSummary,
  getDetails,
  getSolutions,
  downloadSolution,
  saveSurvey,
  setIsSavingSurveyDone,
  getForumNotifications,
}) => {
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showSurvey, setShowSurvey] = useState(false);

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const initialTab = query.get("tab");
    if (initialTab && tabNames.indexOf(initialTab) !== -1) {
      setSelectedTab(initialTab);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(
      window.history.state,
      "",
      `?tab=${selectedTab}`
    );
  }, [selectedTab]);

  useEffect(() => {
    getWork(workItemId);
  }, [workItemId, getWork]);

  const { summary, details, solutions } = useMemo(() => workItem, [workItem]);

  useEffect(() => {
    if (!work) {
      return;
    }

    if (selectedTab === "summary") {
      if (!summary) {
        getSummary(work);
      }
    } else if (selectedTab === "solutions") {
      if (!solutions) {
        isReviewPhaseEnded && getSolutions(work.id);
      }
    } else if (selectedTab === "details") {
      if (!details) {
        getDetails(work);
      }
    }
  }, [
    work,
    selectedTab,
    summary,
    solutions,
    details,
    getSummary,
    getSolutions,
    getDetails,
    isReviewPhaseEnded,
  ]);

  useEffect(() => {
    if (!work) {
      return;
    }

    if (work || selectedTab === "messaging") {
      getForumNotifications(work.id);
    }
  }, [work, selectedTab, getForumNotifications]);

  useEffect(() => {
    if (isSavingSurveyDone) {
      getSummary(work);
      setIsSavingSurveyDone(false);
    }
  }, [work, isSavingSurveyDone, setIsSavingSurveyDone, getSummary]);

  const isReviewPhaseEnded = React.useMemo(() => {
    if (work) {
      return workUtil.isReviewPhaseEnded(work);
    }
  }, [work]);

  const reviewPhaseEndedDate = React.useMemo(() => {
    if (work) {
      return workUtil.getReviewPhaseEndedDate(work);
    }
  }, [work]);

  const markAsDoneButton = React.useMemo(() => {
    if (work) {
      if (
        work.status === WORK_STATUSES.Completed.value &&
        _.find(work.metadata, { name: "customerFeedback" }) == null
      ) {
        return (
          <Button
            styleName="markAsDoneBtn"
            onClick={() => setShowSurvey(true)}
            size={BUTTON_SIZE.MEDIUM}
          >
            MARK AS DONE
          </Button>
        );
      }
    }
  }, [work]);

  const customerFeedback = React.useMemo(() => {
    if (work && work.metadata) {
      const item = work.metadata.find((i) => i.name === "customerFeedback");
      return item && JSON.parse(item.value);
    }
  }, [work]);

  return (
    <>
      <LoadingSpinner show={isLoadingWork || isLoadingSolutions} />
      <Page styleName="page">
        <PageContent styleName="pageContent">
          <PageH3 styleName="pageTitle">
            <Button
              size={BUTTON_SIZE.MEDIUM}
              type={BUTTON_TYPE.ROUNDED}
              onClick={() => {
                navigate("/self-service");
              }}
            >
              <BackIcon />
            </Button>
            {work && work.name}
          </PageH3>

          <Tabs>
            <Tab
              active={selectedTab === "summary"}
              onClick={() => {
                setSelectedTab("summary");
              }}
            >
              SUMMARY
            </Tab>
            <Tab
              active={selectedTab === "details"}
              onClick={() => {
                setSelectedTab("details");
              }}
            >
              DETAILS
            </Tab>
            <Tab
              active={selectedTab === "messaging"}
              onClick={() => {
                setSelectedTab("messaging");
              }}
            >
              MESSAGES
              {forumNotifications && forumNotifications.unreadNotifications && (
                <span styleName="message-count">
                  {String.prototype.padStart.call(
                    forumNotifications.unreadNotifications,
                    2,
                    "0"
                  )}
                </span>
              )}
            </Tab>
            <Tab
              active={selectedTab === "solutions"}
              onClick={() => {
                setSelectedTab("solutions");
              }}
            >
              SOLUTIONS
            </Tab>
            <Tab
              active={selectedTab === "history"}
              onClick={() => {
                setSelectedTab("history");
              }}
            >
              HISTORY
            </Tab>
          </Tabs>

          <div>
            <TabPane value={selectedTab} tab="summary">
              {summary && (
                <Summary
                  summary={summary}
                  onTabChange={(tab) => setSelectedTab(tab)}
                />
              )}
              {markAsDoneButton}
            </TabPane>

            <TabPane value={selectedTab} tab="details">
              <Details challenge={work} formData={details} />
              {markAsDoneButton}
            </TabPane>

            <TabPane value={selectedTab} tab="solutions">
              <Solutions
                solutions={solutions}
                onDownload={downloadSolution}
                isReviewPhaseEnded={isReviewPhaseEnded}
                reviewPhaseEndedDate={reviewPhaseEndedDate}
                work={work}
              />
              <div styleName="solution-tab-footer">
                {markAsDoneButton}
                <a href="#void()" styleName="need-help-link">
                  Need Help?
                </a>
              </div>
            </TabPane>

            <TabPane value={selectedTab} tab="messaging">
              {work && <Forum challengeId={work.id} />}
              {markAsDoneButton}
            </TabPane>

            <TabPane value={selectedTab} tab="history">
              {markAsDoneButton}
            </TabPane>
          </div>
        </PageContent>
      </Page>

      <Modal
        open={showSurvey}
        center
        showCloseIcon={false}
        focusTrapped={false}
        onClose={() => setShowSurvey(false)}
        styles={{
          modal: {
            maxWidth: "100%",
            padding: 0,
            margin: 0,
            background: "none",
          },
        }}
      >
        <FinalSurvey
          saveSurvey={(updatedCustomerFeedback) => {
            let metadata = work.metadata || [];

            metadata = metadata.filter((i) => i.name !== "customerFeedback");
            metadata.push({
              name: "customerFeedback",
              value: JSON.stringify(updatedCustomerFeedback),
            });

            saveSurvey(work.id, metadata);
            setShowSurvey(false);
          }}
          onCancel={() => setShowSurvey(false)}
          customerFeedback={customerFeedback}
        />
      </Modal>
    </>
  );
};

WorkItem.propTypes = {
  workItemId: PT.string,
  work: PT.shape(),
  workItem: PT.shape(),
  isLoadingWork: PT.bool,
  isLoadingSolutions: PT.bool,
  isSavingSurveyDone: PT.bool,
  getWork: PT.func,
  getSummary: PT.func,
  getDetails: PT.func,
  getSolutions: PT.func,
  downloadSolution: PT.func,
  saveSurvey: PT.func,
  setIsSavingSurveyDone: PT.func,
};

const mapStateToProps = (state) => {
  const {
    work,
    workItem,
    isLoadingWork,
    isLoadingSolutions,
    isSavingSurveyDone,
    forumNotifications,
  } = state.work;

  return {
    work,
    workItem,
    isLoadingWork,
    isLoadingSolutions,
    isSavingSurveyDone,
    forumNotifications,
  };
};

const mapDispatchToProps = {
  getWork,
  getSummary,
  getDetails,
  getSolutions,
  downloadSolution,
  saveSurvey,
  setIsSavingSurveyDone,
  getForumNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkItem);
