import { getAuthUserProfile, updateUserProfile } from "@topcoder/mfe-header";
import * as actions from "actions/profile";
import _ from "lodash";
import { toastr } from "react-redux-toastr";
import * as services from "services/profile";
import * as userSelectors from "../hoc/withAuthentication/selectors";

/**
 * Loads User Profile Information
 * @returns {() => Promise}
 */
export const getUserProfile = () => async (dispatch, getState) => {
  const state = getState();

  getAuthUserProfile().then((authUser) => {
    const profile = _.pick(authUser, [
      "firstName",
      "lastName",
      "email",
      "handle",
    ]);
    dispatch(actions.getUserProfile(profile));
  });
};

/**
 * Updates User Basic Info and update password
 *
 * @param {String} handle user handle
 * @param {String} firstName first name
 * @param {String} lastName last name
 * @param {String} currentPassword user's current password
 * @param {String} password user's new password
 *
 * @returns {() => Promise}
 */
export const updateBasicInfoAndPassword =
  (handle, firstName, lastName, currentPassword, password) =>
  async (dispatch, getState) => {
    const state = getState();
    const userId = userSelectors.getUserId(state);

    dispatch(actions.updateBasicInfoPending());

    if (currentPassword && password) {
      const promises = [
        services.updateBasicInfo(handle, firstName, lastName),
        services.updatePasswordV3(userId, currentPassword, password),
      ];

      const results = await Promise.allSettled(promises);

      if (
        results[0].status === "fulfilled" &&
        results[1].status === "fulfilled"
      ) {
        const res = results[0].value;
        dispatch(
          actions.updateBasicInfoSuccess({
            handle: res.handle,
            firstName: res.firstName,
            lastName: res.lastName,
          })
        );
        toastr.success(
          "Success",
          "Profile and Password both successfully updated"
        );
      }

      if (
        results[0].status === "fulfilled" &&
        results[1].status === "rejected"
      ) {
        const res = results[0].value;
        const err =
          results[1].reason?.response?.data?.result?.content ||
          "Something went wrong";
        dispatch(
          actions.updateBasicInfoSuccess({
            handle: res.handle,
            firstName: res.firstName,
            lastName: res.lastName,
          })
        );
        toastr.warning("Profile is updated but user password is failed", err);
      }

      if (
        results[0].status === "rejected" &&
        results[1].status === "fulfilled"
      ) {
        toastr.warning(
          "Warning",
          "Password is updated but user info is failed"
        );
      }
      if (
        results[0].status === "rejected" &&
        results[1].status === "rejected"
      ) {
        toastr.error(
          "Error",
          "There was an error during updating user info and password"
        );
      }
    } else {
      services
        .updateBasicInfo(handle, firstName, lastName)
        .then((res) => {
          dispatch(
            actions.updateBasicInfoSuccess({
              handle: res.handle,
              firstName: res.firstName,
              lastName: res.lastName,
            })
          );
          toastr.success("Success", "Profile info has successfully updated");
          updateUserProfile(res.firstName, res.lastName);
        })
        .catch((err) => {
          dispatch(actions.updateBasicInfoError(err));
          const defaultError = "There was an error during profile updated";
          const message = err?.message;
          toastr.error("Error", message ? message : defaultError);
        });
    }
  };
