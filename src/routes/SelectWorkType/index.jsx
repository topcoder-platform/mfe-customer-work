import { navigate } from "@reach/router";

import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { triggerAutoSave } from "../../actions/autoSave";
import {
  saveWorkType,
  toggleSupportModal,
  createNewSupportTicket,
} from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import IconWebsiteTools from "../../assets/images/design-tools.svg";
import Button from "../../components/Button";
import HelpBanner from "../../components/HelpBanner";
import SupportModal from "../../components/Modal/SupportModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import Page from "../../components/Page";
import PageContent from "../../components/PageContent";
import PageDivider from "../../components/PageDivider";
import PageFoot from "../../components/PageElements/PageFoot";
import PageH2 from "../../components/PageElements/PageH2";
import Breadcrumb from "../../components/Breadcrumb";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  HELP_BANNER,
  webWorkTypes,
  workTypes,
} from "../../constants/";
import { getProfile } from "../../selectors/profile";
import { getUserProfile } from "../../thunks/profile";

import styles from "./styles.module.scss";
import { currencyFormat } from "utils/";

/**
 * Select Work Type Page
 */
const SelectWorkType = ({
  saveWorkType,
  setProgressItem,
  toggleSupportModal,
  createNewSupportTicket,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const showSupportModal = useSelector((state) => state.form.showSupportModal);
  const challenge = useSelector((state) => state.challenge);
  const profileData = useSelector(getProfile);

  const allWorkTypes = [...workTypes, ...webWorkTypes];
  const workTypesComingSoon = allWorkTypes.filter((wt) => wt.comingSoon);
  const featuredWorkTypes = allWorkTypes.filter((wt) => wt.featured);

  useEffect(() => {
    return () => {
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (selectedItem = webWorkTypes[0]) => {
    saveWorkType({
      selectedWorkType: selectedItem.title,
      selectedWorkTypeDetail: selectedItem.title,
    });
    setProgressItem(2);
    navigate(selectedItem.startRoute);
    dispatch(triggerAutoSave(true));
  };

  const onBack = () => {
    navigate(`/self-service`);
    setProgressItem(1);
    saveWorkType({ workTypeStep: 0 });
    dispatch(triggerAutoSave(true));
  };

  const onShowSupportModal = () => {
    toggleSupportModal(true);
  };
  const onHideSupportModal = () => {
    toggleSupportModal(false);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const onSubmitSupportRequest = (submittedSupportRequest) =>
    createNewSupportTicket(
      submittedSupportRequest,
      challenge?.id,
      challenge?.legacy?.selfService
    );

  const breadcrumb = [
    { url: "/self-service/dashboard", name: "My work" },
    { url: "/self-service/wizard", name: "Start work" },
  ];

  const workTypeClassName = (title) => title.toLowerCase().split(" ").join("-");

  return (
    <>
      <LoadingSpinner show={isLoading} />
      {showSupportModal && (
        <SupportModal
          profileData={profileData}
          handleClose={onHideSupportModal}
          onSubmit={onSubmitSupportRequest}
        ></SupportModal>
      )}
      <Breadcrumb breadcrumbItems={breadcrumb} />
      <Page>
        <PageContent>
          <PageH2>SELECT WORK TYPE</PageH2>
          {featuredWorkTypes.map((featuredWorkType) => (
            <div
              className={`${styles.heroContainer} ${
                styles[workTypeClassName(featuredWorkType.title)]
              }`}
            >
              <div
                className={`${styles.heroBackgroundContainer} ${
                  styles[workTypeClassName(featuredWorkType.title)]
                }`}
              ></div>
              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <div className={styles.heroIconContainer}>
                    <IconWebsiteTools />
                  </div>
                  <div className={styles.heroHeaderContent}>
                    <div>{featuredWorkType.title}</div>
                    <div className={styles.heroHeaderSubtitle}>
                      starting at&nbsp;
                      {featuredWorkType.stickerPrice && (
                        <span className={styles.strikeThrough}>
                          {currencyFormat(featuredWorkType.stickerPrice)}
                        </span>
                      )}
                      {
                        <span className={styles.priceChip}>
                          {currencyFormat(featuredWorkType.price)}
                        </span>
                      }
                      <span className={styles.separator}>|</span>
                      {featuredWorkType.duration}
                    </div>
                  </div>
                </div>
                <div className={styles.heroText}>
                  {featuredWorkType.subTitle}
                </div>
                <div className={styles.heroButtonContainer}>
                  <Button
                    onClick={() => handleClick(featuredWorkType)}
                    size={BUTTON_SIZE.MEDIUM}
                    type="secondary"
                  >
                    START WORK
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.cardContainer}>
            {workTypesComingSoon.map((wt) => (
              <div className={styles.card}>
                <div className={styles.smallHeader}>Coming Soon</div>
                <div className={styles.title}>{wt.title}</div>
                <div className={styles.text}>{wt.subTitle}</div>
              </div>
            ))}
          </div>

          <HelpBanner
            title={HELP_BANNER.title}
            description={HELP_BANNER.description}
            contactSupport={onShowSupportModal}
          />

          <PageDivider />

          <PageFoot>
            <div className={styles.backButtonContainer}>
              <Button
                size={BUTTON_SIZE.MEDIUM}
                type={BUTTON_TYPE.SECONDARY}
                onClick={onBack}
              >
                <div className={styles.backButtonWrapper}>
                  <BackIcon />
                </div>
              </Button>
            </div>
          </PageFoot>
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  saveWorkType,
  setProgressItem,
  toggleSupportModal,
  createNewSupportTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkType);
