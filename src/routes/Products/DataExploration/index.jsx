import { Router } from "@reach/router";
import React from "react";
import Payment from "../../Payment";
import Review from "../../Review";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfo from "./Routes/BasicInfo";
import DataExplorationBanner from "../../../components/Banners/DataExplorationBanner";

export default function DataExploration({ isLoggedIn }) {
  return (
    <Router>
      <BasicInfo path="/basic-info" />
      <LoginPrompt
        path="/login-prompt"
        isLoggedIn={isLoggedIn}
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl="/self-service/work/new/data-exploration/review"
      />
      <Review
        enableEdit={false}
        banner={<DataExplorationBanner />}
        path="/review"
        previousPageUrl="/self-service/work/new/data-exploration/basic-info"
        nextPageUrl="/self-service/work/new/data-exploration/payment"
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
