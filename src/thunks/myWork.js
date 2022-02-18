import axios from "axios";
import moment from "moment";
import { getUserHandle } from "hoc/withAuthentication/selectors";
import * as services from "services/myWork";
import * as selectors from "selectors/myWork";
import * as actions from "actions/myWork";
import {
  WORK_TIMELINE,
  WORK_STATUS_MAP,
  WORK_STATUS_ORDER,
} from "constants/index.js";
import { sortBySortOrder } from "utils";
import { getForumNotifications } from "services/challenge";
import _ from "lodash";
import { getSummary } from "services/work";

/**
 * Loads work items as pages, concatenates these pages and adds proper work
 * statuses and sorting orders to work items.
 *
 * @returns {() => Promise}
 */
export const loadWorks = () => async (dispatch, getState) => {
  const state = getState();
  selectors.getWorksCancelSource(state)?.cancel();
  const handle = getUserHandle(state);
  const works = [];
  let page = 1;
  const perPage = 100;
  const now = moment();
  let [promise, cancelSource] = services.getWorks(handle, { page, perPage });
  dispatch(actions.loadWorksPending(cancelSource));
  try {
    const promises = [promise];
    const { pagination } = await promise;
    const { totalPages } = pagination;
    for (page = 2; page <= totalPages; page++) {
      [promise] = services.getWorks(handle, { page, perPage }, cancelSource);
      promises.push(promise);
    }
    const results = await Promise.all(promises);
    for (let result of results) {
      for (let item of result.data) {
        let sortOrder = WORK_STATUS_ORDER.Unknown;
        let status = item.status;
        let challengeStatus = status;
        let workStatus = WORK_STATUS_MAP[status];
        if (workStatus) {
          sortOrder = WORK_STATUS_ORDER[status];
        } else {
          for (let key in WORK_STATUS_MAP) {
            if (status.toLowerCase().includes(key.toLowerCase())) {
              challengeStatus = key;
              workStatus = WORK_STATUS_MAP[key];
              sortOrder = WORK_STATUS_ORDER[key];
              break;
            }
          }
          if (!workStatus) {
            workStatus = status;
          }
        }
        item.summary = getSummary(item);
        item.challengeStatus = challengeStatus;
        item.workStatus = workStatus;
        item.sortOrder = sortOrder;
        const customerFeedback = _.get(item, "metadata", []).find(
          (i) => i.name === "customerFeedback"
        );
        if (customerFeedback) {
          item.rating = JSON.parse(customerFeedback.value);
        }
        works.push(item);
      }
    }
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actions.loadWorksError(error.toString()));
    }
    return;
  }
  works.sort(sortBySortOrder);
  dispatch(actions.loadWorksSuccess(works));
};

/**
 * Loads forum notifications of dashboard work items
 *
 * @returns {() => Promise}
 */
export const loadForumNotifications = () => async (dispatch, getState) => {
  const state = getState();
  const works = selectors.getWorks(state);

  let promises = [];
  let newWorkItems = works.map((work) => {
    if (work.status === "Active" && work.type !== "Task") {
      promises.push(getForumNotifications(work.id));
      return {
        ...work,
        forumNotificationLoading: true,
      };
    } else {
      return work;
    }
  });

  dispatch(actions.loadWorksSuccess(newWorkItems));
  const results = await Promise.all(promises);

  for (let result of results) {
    const currentItem = _.find(newWorkItems, { id: result.challengeId });
    const updatedItem = {
      ...currentItem,
      forumNotificationLoading: false,
      messagesCount: result?.unreadNotifications || 0,
      messagesHasNew: true,
    };

    newWorkItems = newWorkItems.map((item) =>
      item.id === result.challengeId ? updatedItem : item
    );
  }
  dispatch(actions.loadWorksSuccess(newWorkItems));
};
