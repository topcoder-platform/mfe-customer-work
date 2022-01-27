import _ from "lodash";
import PropType from "prop-types";
import React, { useState } from "react";

import { Button } from "../Button";
import { FormField } from "../FormElements/FormField";
import { FormInputText } from "../FormElements/FormInputText";
import { FormInputTextArea } from "../FormElements/FormInputTextArea";

import { Modal } from ".";
import styles from "./styles.module.scss";

const SupportModal = ({ profileData, handleClose, onSubmit }) => {
  const { email, firstName, lastName } = profileData;

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
    onSubmit(request);
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
    <Modal
      halfWidth
      handleClose={handleClose}
      hideClose={true}
      show={true}
      title="We're Here to Help"
    >
      <div style={{ "text-align": "center" }}>
        Hi {firstName || "there"}, we're here to help. Please describe what
        you'd like to discuss, and a Topcoder Solutions Expert will email you
        back
        {email ? ` at ${email}` : ""}
        &nbsp;within one business day.
      </div>

      {submittedSupportRequest && (
        <div
          style={{
            "text-align": "center",
            "font-weight": "bold",
            "text-transform": "uppercase",
            "margin-top": "30px",
          }}
        >
          <p>Thank You.</p>
          <p>Message Received.</p>
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

          <FormField label="How Can We Help You?">
            <FormInputTextArea
              name="question"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder="Enter your question or issue"
              required
              rows="3"
              value={request?.question}
            />
          </FormField>

          <div className={styles.modalButtonContainer}>
            <Button
              type="primary"
              onClick={handleSubmission}
              disabled={!formIsValid}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

SupportModal.propTypes = {
  profileData: PropType.object.isRequired,
  handleClose: PropType.func.isRequired,
  supportRequest: PropType.string,
  onSubmit: PropType.func.isRequired,
};

export default SupportModal;
