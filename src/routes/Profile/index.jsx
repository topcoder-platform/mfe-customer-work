import { navigate } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import { BUTTON_TYPE, BUTTON_SIZE } from "constants/";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfile, isProfileLoading } from "selectors/profile";
import { getUserProfile, updateBasicInfoAndPassword } from "thunks/profile";
import withAuthentication from "../../hoc/withAuthentication";
import ProfileForm from "./components/ProfileForm";
import "./styles.module.scss";

/**
 * Profile Page
 */
const Profile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(getProfile);
  const profileLoading = useSelector(isProfileLoading);
  const [isLoading, setIsLoading] = useState(true);

  const [hasLength, setHasLength] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasSymbolNumber, setHasSymbolNumber] = useState(false);
  const [differentOldPassword, setDifferentOldPassword] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [isPristine, setIsPristine] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    handle: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!profileLoading) {
      setIsLoading(profileLoading);
    }
  }, [profileLoading]);

  useEffect(() => {
    if (!isLoading) {
      setFormData(profileData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const isFormValid = () => {
    if (isPristine) return false;
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      return (
        String(formData.firstName).length &&
        String(formData.lastName).length &&
        !profileLoading &&
        hasLength &&
        hasLetter &&
        hasSymbolNumber &&
        differentOldPassword &&
        rePasswordValid
      );
    } else {
      return (
        String(formData.firstName).length &&
        String(formData.lastName).length &&
        !profileLoading
      );
    }
  };

  const saveSettings = () => {
    if (formData.currentPassword && formData.newPassword) {
      dispatch(
        updateBasicInfoAndPassword(
          formData.handle,
          formData.firstName,
          formData.lastName,
          formData.currentPassword,
          formData.newPassword
        )
      );
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      dispatch(
        updateBasicInfoAndPassword(
          formData.handle,
          formData.firstName,
          formData.lastName
        )
      );
    }
  };

  const handleFormChange = () => {
    if (formData.newPassword && formData.newPassword.length > 0) {
      setHasLength(formData.newPassword.length >= 8);
      setHasLetter(/[a-zA-Z]/.test(formData.newPassword));
      setHasSymbolNumber(
        /[-!$@#%^&*()_+|~=`{}[\]:";'<>?,./]/.test(formData.newPassword) ||
          /[\d]/.test(formData.newPassword)
      );
    } else {
      setHasLength(false);
      setHasLetter(false);
      setHasSymbolNumber(false);
    }
    if (formData.currentPassword !== formData.newPassword) {
      setDifferentOldPassword(true);
    } else {
      setDifferentOldPassword(false);
    }

    if (formData.confirmPassword && formData.confirmPassword.length > 0) {
      setRePasswordValid(formData.newPassword === formData.confirmPassword);
    } else {
      setRePasswordValid(false);
    }
  };

  useEffect(() => {
    handleFormChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <LoadingSpinner show={isLoading} />
      {!isLoading && (
        <Page styleName="profilePage">
          <PageContent styleName="profilePageContent">
            <h3 styleName="profileTitle">MY PROFILE</h3>
            <ProfileForm
              formData={formData}
              setFormData={(e) => {
                setIsPristine(false);
                setFormData(e);
              }}
              hasLength={hasLength}
              hasLetter={hasLetter}
              hasSymbolNumber={hasSymbolNumber}
              differentOldPassword={differentOldPassword}
              rePasswordValid={rePasswordValid}
            />

            <PageDivider />

            <PageFoot>
              <Button
                type={BUTTON_TYPE.SECONDARY}
                size={BUTTON_SIZE.MEDIUM}
                onClick={() => navigate("/self-service")}
              >
                BACK
              </Button>
              <div styleName="footerContent">
                <div styleName="footer-right">
                  <Button
                    disabled={!isFormValid()}
                    size={BUTTON_SIZE.MEDIUM}
                    onClick={saveSettings}
                  >
                    SAVE SETTINGS
                  </Button>
                </div>
              </div>
            </PageFoot>
          </PageContent>
        </Page>
      )}
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(Profile));
