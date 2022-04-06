import { Router } from "@reach/router";
import React from "react";
import Review from "../../Review";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfo from "./Routes/BasicInfo";
import DataExplorationBanner from "../../../components/Banners/DataExplorationBanner";
import config from "../../../../config";
import DataExplorationIcon from "../../../assets/images/data-exploration-icon.svg";
import HelpBanner from "components/HelpBanner";
import PageUl from "components/PageElements/PageUl";

export default function DataExploration({ isLoggedIn }) {
  return (
    <Router>
      <BasicInfo path="/basic-info" isLoggedIn={isLoggedIn} />
      <LoginPrompt
        path="/login-prompt"
        isLoggedIn={isLoggedIn}
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl="/self-service/work/new/data-exploration/review"
      />
      <Review
        banner={<DataExplorationBanner />}
        secondaryBanner={
          <HelpBanner defaultOpen title="WHAT WILL I GET?" styles={["gray"]}>
            <br />
            <PageUl>
              <li>Clear written analysis of your data and key findings</li>
              <li>
                Visuals of the most compelling relationships and patterns in
                your data
              </li>
              <li>
                Expert commentary on the relevance of findings to your goals and
                recommendations for further analysis
              </li>
            </PageUl>
          </HelpBanner>
        }
        path="/review"
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl={
          isLoggedIn
            ? "/self-service/work/new/data-exploration/thank-you"
            : config.SIGN_IN_URL
        }
        icon={<DataExplorationIcon />}
        showIcon
      />
      <ThankYou path="/thank-you" />
    </Router>
  );
}
