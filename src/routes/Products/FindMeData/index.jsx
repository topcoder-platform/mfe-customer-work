import { Router } from "@reach/router";
import React from "react";
import Review from "../../Review";
import ThankYou from "../../ThankYou";
import LoginPrompt from "../../LoginPrompt";
import BasicInfo from "../components/BasicInfo";
import config from "../../../../config";
import FindMeDataIcon from "../../../assets/images/data-advisory-icon.svg";
import HelpBanner from "components/HelpBanner";
import { webWorkTypes } from "../../../constants/index";
import FeaturedWorkTypeBanner from "../../../components/Banners/FeaturedWorkTypeBanner";

export default function FindMeData({ isLoggedIn }) {
  const findMeData = webWorkTypes.find((type) => type.title === "Find Me Data");

  const { title, subTitle, helperBannerTitle, helperBannerContent } =
    findMeData;

  return (
    <Router>
      <BasicInfo
        path="/basic-info"
        isLoggedIn={isLoggedIn}
        bannerData={findMeData}
      />
      <LoginPrompt
        path="/login-prompt"
        isLoggedIn={isLoggedIn}
        previousPageUrl="/self-service/work/new/find-me-data/basic-info"
        nextPageUrl="/self-service/work/new/find-me-data/review"
      />
      <Review
        banner={<FeaturedWorkTypeBanner title={title} subTitle={subTitle} />}
        secondaryBanner={
          <HelpBanner defaultOpen title={helperBannerTitle} styles={["gray"]}>
            {helperBannerContent}
          </HelpBanner>
        }
        path="/review"
        previousPageUrl="/self-service/work/new/find-me-data/basic-info"
        nextPageUrl={
          isLoggedIn
            ? "/self-service/work/new/find-me-data/thank-you"
            : config.SIGN_IN_URL
        }
        icon={<FindMeDataIcon />}
        showIcon
        bannerData={findMeData}
      />
      <ThankYou path="/thank-you" />
    </Router>
  );
}
