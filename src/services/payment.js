import { CardNumberElement } from "@stripe/react-stripe-js";
import _ from "lodash";
import config from "../../config";
import challengeService from "./challenge";
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
  // get project ID from challenge
  const challenge = await challengeService.getChallengeDetails(challengeId);
  try {
    // Call stripe api the create payment method, so the card info does not pass to our server.
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    let response = await axios.post(
      `${config.API.V5}/customer-payments`,
      JSON.stringify({
        amount,
        currency,
        paymentMethodId: payload.paymentMethod.id,
        reference: "project",
        referenceId: _.toString(challenge.projectId),
      })
    );
    const customerPayment = response.data;
    if (customerPayment.status === "requires_action") {
      await stripe.handleCardAction(customerPayment.clientSecret);
      response = await axios.patch(
        `${config.API.v5}/customer-payments/${customerPayment.id}/confirm`,
        JSON.stringify({})
      );
    }

    return response?.data;
  } catch (e) {
    // TODO: Show error
    throw e;
  }
}
