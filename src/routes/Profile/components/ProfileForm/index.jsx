/**
 * Profile Form component
 */
import cn from "classnames";
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormPasswordField from "components/FormElements/FormPasswordField";
import PageDivider from "components/PageDivider";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import PT from "prop-types";
import React, { useState } from "react";
import "./styles.module.scss";

const ProfileForm = ({
  formData,
  setFormData,
  hasLength,
  hasLetter,
  hasSymbolNumber,
  differentOldPassword,
  rePasswordValid,
}) => {
  const handleInputChange = (name, value) => {
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const [showNewTips, setShowNewTips] = useState(false);
  const [showRePasswordTips, setShowRePasswordTips] = useState(false);

  return (
    <div styleName="profileForm">
      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">BASIC INFORMATION</PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField
            label={"Username"}
            disabled
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormInputText
              value={formData.handle}
              styleName="formInputText"
              disabled
            />
          </FormField>
          <FormField
            label={"Email"}
            disabled
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormInputText
              value={formData.email}
              styleName="formInputText"
              disabled
              name="email"
            />
          </FormField>
          <FormField
            label={"First Name"}
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormInputText
              placeholder={"Enter first name"}
              value={formData.firstName}
              name="firstName"
              maxLength={64}
              required
              styleName="formInputText"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </FormField>
          <FormField
            label={"Last Name"}
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormInputText
              placeholder={"Enter last name"}
              value={formData.lastName}
              name="lastName"
              required
              maxLength={64}
              styleName="formInputText"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />

      <PageRow styleName="form-row">
        <div styleName="leftContent">
          <PageP styleName="title">RESET PASSWORD</PageP>
          <PageP styleName="description">
            Do eiusmod tempor incididunt ut labore et dolore magna aliqua{" "}
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField
            label={"Current Password"}
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormPasswordField
              placeholder={"Type your current password"}
              styleName="formInputText"
              minLength="8"
              maxLength="64"
              required
              value={formData.currentPassword}
              name="currentPassword"
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.value, e.target.value)
              }
            />
          </FormField>

          <FormField
            label={"New Password"}
            helperText={
              "At least 8 characters in length with lowercase, uppercase, and number(s)"
            }
            styleName="formField"
            formTitleStyle="formTitleStyle"
            labelStyle="labelStyle"
          >
            <FormPasswordField
              id="new-password-input"
              placeholder={"Type your new password"}
              styleName="formInputText"
              value={formData.newPassword}
              name="newPassword"
              minLength="8"
              maxLength="64"
              required
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onFocus={() => setShowNewTips(true)}
              onBlur={() => setShowNewTips(false)}
            />
            <div
              id="password-tips"
              styleName={cn("tips password-tips", showNewTips ? "" : "hidden")}
            >
              <h3>Your password must have:</h3>
              <p styleName={hasLength ? "has-length-between-range" : ""}>
                At least 8 characters
              </p>
              <p styleName={hasLetter ? "has-letter" : ""}>
                At least one letter
              </p>
              <p styleName={hasSymbolNumber ? "has-symbol-or-number" : ""}>
                At least one number or symbol
              </p>
              <p
                styleName={
                  differentOldPassword ? "different-with-old-password" : ""
                }
              >
                Should not be the same as the old password
              </p>
            </div>
          </FormField>

          <FormField
            label={"Confirm New Password"}
            formTitleStyle="formTitleStyle"
            styleName="formField"
            labelStyle="labelStyle"
          >
            <FormPasswordField
              id="re-password-input"
              placeholder={"Re-type your new password"}
              value={formData.confirmPassword}
              styleName="formInputText"
              name="confirmPassword"
              minLength="8"
              maxLength="64"
              required
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.value, e.target.value)
              }
              onFocus={() => setShowRePasswordTips(true)}
              onBlur={() => setShowRePasswordTips(false)}
            />
            <div
              id="password-tips"
              styleName={cn(
                "tips password-tips",
                showRePasswordTips ? "" : "hidden"
              )}
            >
              <h3>Your Re-typed password must:</h3>
              <p styleName={rePasswordValid ? "re-password-match" : ""}>
                Match the new password entered
              </p>
            </div>
          </FormField>
        </div>
      </PageRow>
    </div>
  );
};

ProfileForm.defaultProps = {};

ProfileForm.propTypes = {
  formData: PT.shape(),
  onFormUpdate: PT.func,
};

export default ProfileForm;
