import { Router } from "@reach/router";
import React from "react";
import ReviewLegacy from "../../ReviewLegacy";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfoLegacy from "../../BasicInfoLegacy";
import config from "../../../../config";
import DataExplorationIcon from "../../../assets/images/data-exploration-icon.svg";
import HelpBanner from "components/HelpBanner";
import FeaturedWorkTypeBanner from "../../../components/Banners/FeaturedWorkTypeBanner";
import { webWorkTypes } from "../../../constants/index";
import { WorkType } from "../../../../src-ts/lib";
import Branding from "../../Branding";
import PageDetails from "../../PageDetails";
import Payment from "../../Payment";
import WebsitePurpose from "../../WebsitePurpose";
import WebsiteDesignBanner from "../../../components/Banners/WebsiteDesignBanner";

export default function WebsiteDesignLegacy({ isLoggedIn }) {
  //TODO CON see which items are needed for banner data and add to legacy
  const webDesignLegacy = webWorkTypes.find(
    (workType) => workType.type === WorkType.designLegacy
  );

  // const { title, subTitle, helperBannerTitle, helperBannerContent } =
  //   websiteDesign;

  return (
    <Router>
      <BasicInfoLegacy path="/basic-info" />
      <WebsitePurpose path="/website-purpose" />
      <PageDetails path="/page-details" />
      <LoginPrompt path="/login-prompt" isLoggedIn={isLoggedIn} />
      <Branding path="/branding" />
      <ReviewLegacy
        path="/review"
        showIcon
        introText="Your Website Design project includes up to 5 unique Visual Design solutions. Each solution will match your specified scope and device types. You will receive industry-standard source files to take take forward to further design and/or development. Design deliverables will NOT include functional code."
        banner={<WebsiteDesignBanner />}
        showProgress
      />
      <Payment path="/payment" showProgress />
      <ThankYou path="/thank-you" />
    </Router>
  );
}
