import { CardNumberElement } from "@stripe/react-stripe-js";
import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";

/**
 * Initiates payment process
 *
 * @param {string} stripe stripe object
 * @param {string} elements stripe elements
 * @param {string} amount payment amount
 * @param {string} currency payment currency
 * @param {string} challengeId challenge id
 *
 * @returns {Promise} promise
 */
export async function processPayment(
  stripe,
  elements,
  amount,
  currency,
  challengeId
) {
  // Call stripe api the create payment method, so the card info does not pass to our server.
  const payload = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardNumberElement),
  });

  const response = await axios.post(
    `${config.API.V5}/customer-payments`,
    JSON.stringify({
      amount,
      currency,
      paymentMethodId: payload.paymentMethod.id,
      reference: "project",
      referenceId: challengeId,
    })
  );

  return response?.data;
}
