import { createChallenge } from "services/challenge";
import { cacheChallengeId } from "../autoSaveBeforeLogin";
import { ACTIONS } from "../constants";

export const getChallenge = (challenge) => ({
  type: ACTIONS.CHALLENGE.GET_CHALLENGE,
  payload: challenge,
});

export const createNewChallenge = () => (dispatch) => {
  return createChallenge()
    .then((created) => {
      if (created?.id) {
        getChallenge(created);
        cacheChallengeId(created.id);
        return created.id;
      }
    })
    .catch((e) => {});
};
