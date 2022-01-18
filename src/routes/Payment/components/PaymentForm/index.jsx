import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import FormField from "components/FormElements/FormField";
import FormInputNumber from "components/FormElements/FormInputNumber";
import Select from "components/ReactSelect";
import PT from "prop-types";
import React, { useState } from "react";
import "./styles.module.scss";
/**
 * Payment Form Page
 */
const PaymentForm = ({ minAmount, formData, setFormData }) => {
  const handleInputChange = (name, value) => {
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const [amountError, setAmountError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];

  return (
    <div styleName="paymentForm">
      <FormField label={"Amount"}>
        <FormInputNumber
          value={formData?.amount}
          onChange={(e) => {
            if (Number(e.target.value) < minAmount) {
              setAmountError(`Amount should be greater than ${minAmount}`);
            } else {
              setAmountError("");
            }
            handleInputChange(e.target.name, e.target.value);
          }}
          name="amount"
          placeholder={"Enter amount"}
        />
        {String(amountError).length ? (
          <span styleName="error">{amountError}</span>
        ) : null}
      </FormField>
      <FormField label={"Currency"}>
        <Select
          value={formData?.currency?.label}
          onChange={(option) => {
            handleInputChange("currency", option.value);
          }}
          name="currency"
          options={currencyOptions}
          style2={true}
          placeholder={"Select currency"}
        />
      </FormField>
      <FormField label={"Card Number"}>
        <div styleName="cardElement">
          <CardNumberElement
            onChange={(data) => {
              if (data?.error?.message) {
                setCardNumberError(data?.error?.message);
                handleInputChange("cardNumber", false);
              } else {
                setCardNumberError("");
                handleInputChange("cardNumber", true);
              }
            }}
          />
        </div>

        {String(cardNumberError).length ? (
          <span styleName="error">{cardNumberError}</span>
        ) : null}
      </FormField>

      <FormField label={"Expiration Date"}>
        <div styleName="cardElement">
          <CardExpiryElement
            onChange={(data) => {
              if (data?.error?.message) {
                setCardExpiryError(data?.error?.message);
                handleInputChange("expiryDate", false);
              } else {
                setCardExpiryError("");
                handleInputChange("expiryDate", true);
              }
            }}
          />
        </div>
        {String(cardExpiryError).length ? (
          <span styleName="error">{cardExpiryError}</span>
        ) : null}
      </FormField>

      <FormField label={"CVC"}>
        <div styleName="cardElement">
          <CardCvcElement
            onChange={(data) => {
              if (data?.error?.message) {
                setCvcError(data?.error?.message);
                handleInputChange("cvc", false);
              } else {
                setCvcError("");
                handleInputChange("cvc", true);
              }
            }}
          />
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
