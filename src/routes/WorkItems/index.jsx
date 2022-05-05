/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
import _ from "lodash";
import PT from "prop-types";
import { navigate } from "@reach/router";
import { connect, useSelector, useDispatch } from "react-redux";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageH3 from "components/PageElements/PageH3";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  tabNames,
  WORK_STATUSES,
  ROUTES,
} from "constants/";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import TabPane from "./components/TabPane";
import Summary from "./components/Summary";
import Details from "./components/Details";
import Solutions from "./components/Solutions";
import FinalSurvey from "./components/Solutions/FinalSurvey";
import workUtil from "utils/work";
import { padStart } from "utils";
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
import { toggleSupportModal, createNewSupportTicket } from "../../actions/form";
import SupportModal from "../../components/Modal/SupportModal";
import { getUserProfile } from "../../thunks/profile";
import { getProfile } from "../../selectors/profile";

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
  createNewSupportTicket,
}) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showSurvey, setShowSurvey] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const profileData = useSelector(getProfile);

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

    if (profileData) {
      if (work.createdBy !== profileData.handle) {
        navigate(ROUTES.HOME_PAGE);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isReviewPhaseEnded = useMemo(() => {
    if (work) {
      return workUtil.isReviewPhaseEnded(work);
    }
  }, [work]);

  const reviewPhaseEndedDate = useMemo(() => {
    if (work) {
      return workUtil.getReviewPhaseEndedDate(work);
    }
  }, [work]);

  const markAsDoneButton = useMemo(() => {
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

  const [customerFeedback, setCustomerFeedback] = useState();
  useEffect(() => {
    if (work && work.metadata) {
      const item = work.metadata.find((i) => i.name === "customerFeedback");
      setCustomerFeedback(item && JSON.parse(item.value));
    }
  }, [work]);

  const onShowSupportModal = () => {
    setShowSupportModal(true);
  };
  const onHideSupportModal = () => {
    setShowSupportModal(false);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const onSubmitSupportRequest = (submittedSupportRequest) =>
    createNewSupportTicket(
      submittedSupportRequest,
      work?.id,
      work?.legacy?.selfService
    );

  return (
    <>
      <LoadingSpinner show={isLoadingWork || isLoadingSolutions} />
      {showSupportModal && (
        <SupportModal
          profileData={profileData}
          handleClose={onHideSupportModal}
          onSubmit={onSubmitSupportRequest}
        ></SupportModal>
      )}
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
            {work && !workUtil.isMessagesDisabled(work) ? (
              <Tab
                active={selectedTab === "messaging"}
                onClick={() => {
                  setSelectedTab("messaging");
                }}
              >
                MESSAGES
                {forumNotifications &&
                forumNotifications.unreadNotifications ? (
                  <span styleName="message-count">
                    {padStart(forumNotifications.unreadNotifications)}
                  </span>
                ) : null}
              </Tab>
            ) : null}
            <Tab
              active={selectedTab === "solutions"}
              onClick={() => {
                setSelectedTab("solutions");
              }}
            >
              SOLUTIONS
            </Tab>
          </Tabs>

          <div>
            <TabPane value={selectedTab} tab="summary">
              {summary && (
                <Summary
                  summary={summary}
                  setSelectedTab={setSelectedTab}
                  setShowSurvey={setShowSurvey}
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
                <a onClick={onShowSupportModal} styleName="need-help-link">
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
          onCancel={(tempData) => {
            setShowSurvey(false);
            setCustomerFeedback(tempData);
          }}
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
  toggleSupportModal,
  createNewSupportTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkItem);
