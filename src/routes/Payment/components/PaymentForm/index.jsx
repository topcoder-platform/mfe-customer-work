import _ from 'lodash'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import PT from "prop-types";
import React, { useState } from "react";

import FormField from "../../../../components/FormElements/FormField";

import "./styles.module.scss";

/**
 * Payment Form Page
 */
const PaymentForm = ({ formData, setFormData }) => {
  const handleInputChange = (name, value) => setFormData((formData) => ({ ...formData, [name]: value }));

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const getFieldError = (data) => data?.error?.message || ""

  const onCardNumberChange = (data) => {
    const errorMessage = getFieldError(data);
    setCardNumberError(errorMessage);
    if (_.isEmpty(errorMessage)) {
      handleInputChange("cardNumber", data?.complete);
    } 
  }

  const onExpirationChange = (data) => {
    const errorMessage = getFieldError(data);
    setCardExpiryError(errorMessage);
    if (_.isEmpty(errorMessage)) {
      handleInputChange("expiryDate", data?.complete);
    }
  }

  const onCvcChange = (data) => {
    const errorMessage = getFieldError(data);
    setCvcError(errorMessage);
    handleInputChange("cvc", !errorMessage && data?.complete);
  }

  return (
    <div styleName="paymentForm">

      <FormField label="Card Number">
        <div styleName="cardElement">
          <CardNumberElement required onChange={(data) => onCardNumberChange(data)} />
        </div>
        {String(cardNumberError).length ? (
          <span styleName="error">{cardNumberError}</span>
        ) : null}
      </FormField>

      <FormField label={"Expiration Date"}>
        <div styleName="cardElement">
          <CardExpiryElement required onChange={(data) => onExpirationChange(data)} />
        </div>
        {String(cardExpiryError).length ? (
          <span styleName="error">{cardExpiryError}</span>
        ) : null}
      </FormField>

      <FormField label={"CVC"}>
        <div styleName="cardElement">
          <CardCvcElement required onChange={(data) => onCvcChange(data)} />
        </div>
        {String(cvcError).length ? (
          <span styleName="error">{cvcError}</span>
        ) : null}
      </FormField>
    </div>
  );
};

PaymentForm.defaultProps = {};

PaymentForm.propTypes = {
  formData: PT.shape(),
  onFormUpdate: PT.func,
  minAmount: PT.number,
};

export default PaymentForm;
