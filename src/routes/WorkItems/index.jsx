import React, { useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import PT from "prop-types";
import { navigate } from "@reach/router";
import { connect, useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import {
  ROUTES,
} from "constants/";
import TabPane from "./components/TabPane";
import Details from "./components/Details";
import workUtil from "utils/work";
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
import { toggleSupportModal } from "../../actions/form";
import { getUserProfile } from "../../thunks/profile";
import { getProfile } from "../../selectors/profile";

import {
  Breadcrumb,
  ChallengeMetadataName,
  ContactSupportModal,
  TabsNavbar,
  workContext,
  WorkDetailHeader,
  WorkDetailSummary,
  WorkFeedback,
  WorkStatusItem,
  WorkDetailSolutions,
} from '../../../src-ts'

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
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("summary");
  const [showSurvey, setShowSurvey] = useState(false);
  const profileData = useSelector(getProfile);

  const workContextData = useContext(workContext)
  const workStatus = !!work ? workContextData.getStatusFromChallenge(work) : undefined

  useEffect(() => {
    getWork(workItemId);
  }, [workItemId, getWork]);

  const { summary, details, solutions } = useMemo(() => workItem, [workItem]);

  const isReviewPhaseEnded = useMemo(() => {
    if (work) {
      return workUtil.isReviewPhaseEnded(work);
    }
  }, [work]);
  
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
        console.log({workId: work.id});
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

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // TODO: get routes from a provider
  const breadcrumb = [
    {
      name: "My work",
      url: ROUTES.DASHBOARD_PAGE,
    },
    {
      name: work?.name,
      url: '', // this isn't necessary bc it's not a link
    }
  ];

  const navTabs = useMemo(() => [
    { id: 'summary', title: 'Summary' },
    { id: 'details', title: 'Details' },
    work && !workUtil.isMessagesDisabled(work) && {
      id: 'messaging',
      title: 'Messages',
      badges: [
        forumNotifications?.unreadNotifications && {
          count: +forumNotifications?.unreadNotifications,
          type: 'info'
        }
      ].filter(Boolean)
    },
    { id: 'solutions', title: 'Solutions' },
  ].filter(Boolean), [work]);

  function saveFeedback(updatedCustomerFeedback) {

    const metadata = (work.metadata || [])
      .filter(item => item.name !== ChallengeMetadataName.feedback);

    metadata.push({
      name: ChallengeMetadataName.feedback,
      value: JSON.stringify(updatedCustomerFeedback),
    });

    saveSurvey(work.id, metadata);
    setShowSurvey(false);
  }

  return (
    <>
      <LoadingSpinner show={isLoadingWork || isLoadingSolutions} />
      <Page styleName="page">
        <PageContent styleName="pageContent">

          <Breadcrumb items={breadcrumb} />
          <WorkDetailHeader
            challenge={work}
            markAsDone={() => setShowSurvey(true)}
          />

          {work && (
            <div styleName="status-line">
              {work.tags[0] && <div styleName="status-label">{work.tags[0]}</div>}
              <WorkStatusItem workStatus={workStatus} />
            </div>
          )}

          <TabsNavbar
            tabs={navTabs}
            defaultActive="summary"
            onChange={setSelectedTab}
          ></TabsNavbar>

          <div styleName="tabs-contents">
            <TabPane value={selectedTab} tab="summary">
              {work && summary && (
                <WorkDetailSummary challenge={work} status={workStatus} />
              )}
            </TabPane>

            <TabPane value={selectedTab} tab="details">
              <Details challenge={work} formData={details} />
            </TabPane>

            <TabPane value={selectedTab} tab="solutions">
              {work && solutions && (
                <WorkDetailSolutions
                  challenge={work}
                  solutions={solutions}
                  onDownload={downloadSolution}
                />
              )}
            </TabPane>

            <TabPane value={selectedTab} tab="messaging">
              {work && <Forum challengeId={work.id} />}
            </TabPane>

            <TabPane value={selectedTab} tab="history">
            </TabPane>
          </div>
        </PageContent>
      </Page>

      <WorkFeedback
        challenge={work}
        onClose={() => setShowSurvey(false)}
        saveSurvey={saveFeedback}
        showSurvey={showSurvey}
      />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkItem);
