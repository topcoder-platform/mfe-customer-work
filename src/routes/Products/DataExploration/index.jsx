import { Router } from "@reach/router";
import React from "react";
import Payment from "../../Payment";
import Review from "../../Review";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfo from "./Routes/BasicInfo";
import DataExplorationBanner from "../../../components/Banners/DataExplorationBanner";
import config from "../../../../config";

export default function DataExploration({ isLoggedIn }) {
  return (
    <Router>
      <BasicInfo path="/basic-info" isLoggedIn={isLoggedIn} />
      <LoginPrompt
        path="/login-prompt"
        isLoggedIn={isLoggedIn}
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl="/self-service/work/new/data-exploration/payment"
      />
      <Review
        enableEdit={false}
        banner={<DataExplorationBanner />}
        path="/review"
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl={
          isLoggedIn
            ? "/self-service/work/new/data-exploration/payment"
            : config.SIGN_IN_URL
        }
      />
      <Payment
        path="/payment"
        previousPageUrl="/self-service/work/new/data-exploration/review"
        nextPageUrl="/self-service/work/new/data-exploration/thank-you"
      />
      <ThankYou path="/thank-you" />
    </Router>
  );
}
