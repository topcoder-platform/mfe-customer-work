import Page from "components/Page";
import PageContent from "components/PageContent";
import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../selectors/profile";
import { getUserProfile } from "../../thunks/profile";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import "./styles.module.scss";
import { createNewSupportTicket } from "../../actions/form";
import _ from "lodash";
import PageH2 from "components/PageElements/PageH2";
import PageDivider from "components/PageDivider";
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import { BUTTON_SIZE, BUTTON_TYPE, ROUTES } from "constants/";
import Button from "components/Button";
import PageFoot from "components/PageElements/PageFoot";
import { navigate } from "@reach/router";

const SupportPage = ({ createNewSupportTicket }) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challenge);
  const profileData = useSelector(getProfile);
  const { email, firstName, lastName } = profileData;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // use the state to handle form values
  const [formIsValid, setFormIsValid] = useState(false);
  const [request, setRequest] = useState(null);
  const [submittedSupportRequest, setSubmittedSupportRequest] = useState(null);

  // set the form validators
  const validators = {
    email: () => {
      // TODO: validate email
      return true;
    },
  };

  const handleSubmission = () => {
    setSubmittedSupportRequest(request);
    createNewSupportTicket(
      request,
      challenge?.id,
      challenge?.legacy?.selfService
    );
  };

  // the request is valid if there are values for all of its properties
  // and all validators associated w/the field succeed
  const validateRequest = (newRequest, fieldName) => {
    const isValid = validators[fieldName];
    return (
      (!isValid || isValid()) &&
      !Object.keys(newRequest).some((k) => _.isEmpty(newRequest[k]))
    );
  };

  // any time the form values change, update the request value and validate the form
  const handleInputChange = (name, value) => {
    // if the request hasn't been initialized, use the default
    const priorRequest = request || {
      email,
      firstName,
      lastName,
      question: "",
    };
    const newRequest = {
      ...priorRequest,
      [name]: value,
    };
    setRequest(newRequest);
    setFormIsValid(validateRequest(newRequest, name));
  };

  return (
    <>
      <Page>
        <PageContent>
          <PageH2>Contact Us</PageH2>
          <PageDivider />
          {!submittedSupportRequest && (
            <div>
              <br />
              Hi {firstName || "there"}, we're here to help. Please describe
              what you'd like to discuss, and a Topcoder Solutions Expert will
              email you back
              {email ? ` at ` : ""}
              {email ? <strong>{email}</strong> : ""}
              &nbsp;within one business day.
              <br />
              <br />
            </div>
          )}

          {submittedSupportRequest && (
            <div
              style={{
                "text-align": "center",
                "font-weight": "bold",
                "text-transform": "uppercase",
                "margin-top": "30px",
              }}
            >
              <br />
              <br />
              <p>Thank You.</p>
              <p>Message Received.</p>
              <br />
              <br />
            </div>
          )}

          {!submittedSupportRequest && (
            <form>
              {!firstName && (
                <FormField label="First Name">
                  <FormInputText
                    name="firstName"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    required
                    value={request?.firstName}
                  />
                </FormField>
              )}

              {!lastName && (
                <FormField label="Last Name">
                  <FormInputText
                    name="lastName"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    required
                    value={request?.lastName}
                  />
                </FormField>
              )}

              {!email && (
                <FormField label="Email">
                  <FormInputText
                    name="email"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    required
                    value={request?.email}
                  />
                </FormField>
              )}

              <FormField label="How can we help you?">
                <FormInputTextArea
                  name="question"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Enter your question or issue"
                  required
                  rows="3"
                  value={request?.question}
                />
              </FormField>
            </form>
          )}

          <PageFoot>
            <div styleName="footerContent">
              <div>
                <Button
                  size={BUTTON_SIZE.MEDIUM}
                  type={BUTTON_TYPE.SECONDARY}
                  onClick={() => navigate(ROUTES.HOME_PAGE)}
                >
                  <div styleName="backButtonWrapper">
                    <BackIcon />
                  </div>
                </Button>
              </div>
              <div styleName="footer-right">
                <Button
                  onClick={handleSubmission}
                  disabled={!formIsValid}
                  size={BUTTON_SIZE.MEDIUM}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </PageFoot>
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  createNewSupportTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage);
