import { navigate } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH3 from "components/PageElements/PageH3";
import { BUTTON_SIZE, BUTTON_TYPE, tabNames } from "constants/";
import React, { useEffect, useState } from "react";
import { getChallengeDetails } from "services/challenge";
import config from "../../../config";
import ArrowRightIcon from "../../assets/images/arrow-right.svg";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import ReviewTable from "../Review/components/ReviewTable";
import Tabs from "./components/Tabs";
import "./styles.module.scss";

/**
 * Work Items Page
 */
const WorkItems = ({ workItemId }) => {
  const [isLoading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Details");

  useEffect(() => {
    setLoading(true);
    getChallengeDetails(workItemId)
      .then((res) => {
        setChallenge(res);
      })
      .catch(() => {
        navigate("/self-service/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workItemId]);

  const { name, metadata } = challenge || {};

  let formData = {};

  (metadata || []).forEach((item) => {
    if (item.name && item.name.includes(".")) {
      const data = item.name.split(".");
      const key = data[1];
      formData[data[0]] = {
        ...formData[data[0]],
        [key]: JSON.parse(item.value),
      };
    } else {
      if (item.name) {
        formData[item.name] = JSON.parse(item.value);
      }
    }
  });

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          {challenge && (
            <>
              <div styleName="backButton">
                <Button
                  size={BUTTON_SIZE.SMALL}
                  type={BUTTON_TYPE.ROUNDED}
                  onClick={() => {
                    navigate("/self-service");
                  }}
                >
                  <BackIcon />
                </Button>

                <PageH3>{name}</PageH3>
              </div>

              <Tabs
                tabs={tabNames}
                selectedTab={selectedTab}
                onSelect={setSelectedTab}
              />
            </>
          )}
          {challenge && selectedTab === "Details" && (
            <div styleName="details">
              <div styleName="reviewTable">
                <PageDivider />
                <ReviewTable formData={formData} enableEdit={false} />
              </div>

              <div styleName="invoiceWrapper">
                <Button size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.SECONDARY}>
                  DOWNLOAD INVOICE
                </Button>
                <PageDivider />

                <a
                  styleName="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${config.TOPCODER_COMMUNITY_WEBSITE_URL}/challenges/${challenge?.id}`}
                >
                  WORK CONTRACT
                  <ArrowRightIcon />
                </a>
                <a
                  styleName="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${config.TERMS_URL}`}
                >
                  PRIVACY POLICY
                  <ArrowRightIcon />
                </a>
                <a
                  styleName="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${config.PRIVACY_POLICY_URL}`}
                >
                  TERMS
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          )}
        </PageContent>
      </Page>
    </>
  );
};

export default WorkItems;
