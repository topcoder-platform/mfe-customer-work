import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";

/**
 * Get Challenge challenge details
 * @param {String} challengeId challenge id
 */
export async function getChallengeDetails(challengeId) {
  const response = await axios.get(
    `${config.API.V5}/challenges/${challengeId}`
  );

  return response?.data;
}

/**
 * Get Forum notifications
 * @param {String} challengeId challenge id
 * @param {String} handle member handle
 */
export async function getForumNotifications(challengeId, handle) {
  const response = await fetch(
    `${config.VANILLA_FORUM_API}/groups/${challengeId}/member/${handle}?access_token=${config.VANILLA_ACCESS_TOKEN}`,
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}
