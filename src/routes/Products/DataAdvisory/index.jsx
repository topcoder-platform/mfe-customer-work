import { Router } from "@reach/router";
import React from "react";
import Review from "../../Review";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfo from "../components/BasicInfo";
import config from "../../../../config";
import DataAdvisoryIcon from "../../../assets/images/data-advisory-icon.svg";
import HelpBanner from "components/HelpBanner";
import FeaturedWorkTypeBanner from "../../../components/Banners/FeaturedWorkTypeBanner";
import { webWorkTypes } from "../../../constants/index";

export default function DataAdvsisory({ isLoggedIn }) {
  const dataAdvisory = webWorkTypes.find(
    (type) => type.title === "Problem Statement & Data Advisory"
  );

  const { title, subTitle, helperBannerTitle, helperBannerContent } =
    dataAdvisory;

  return (
    <Router>
      <BasicInfo
        path="/basic-info"
        isLoggedIn={isLoggedIn}
        bannerData={dataAdvisory}
      />
      <LoginPrompt
        path="/login-prompt"
        isLoggedIn={isLoggedIn}
        previousPageUrl="/self-service/work/new/data-advisory/basic-info"
        nextPageUrl="/self-service/work/new/data-advisory/review"
      />
      <Review
        banner={
          <FeaturedWorkTypeBanner title="REVIEW & PAYMENT" subTitle={title} />
        }
        secondaryBanner={
          <HelpBanner defaultOpen title={helperBannerTitle} styles={["gray"]}>
            {helperBannerContent}
          </HelpBanner>
        }
        path="/review"
        previousPageUrl="/self-service/work/new/data-advisory/basic-info"
        nextPageUrl={
          isLoggedIn
            ? "/self-service/work/new/data-advisory/thank-you"
            : config.SIGN_IN_URL
        }
        icon={<DataAdvisoryIcon />}
        showIcon
        bannerData={dataAdvisory}
      />
      <ThankYou path="/thank-you" />
    </Router>
  );
}
