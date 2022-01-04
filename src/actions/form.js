import { ACTIONS } from "../constants";

export const saveWorkType = (workType) => ({
  type: ACTIONS.FORM.SAVE_WORK_TYPE,
  payload: workType,
});

export const saveBasicInfo = (basicInfo) => ({
  type: ACTIONS.FORM.SAVE_BASIC_INFO,
  payload: basicInfo,
});

export const saveWebsitePurpose = (websitePurpose) => ({
  type: ACTIONS.FORM.SAVE_WEBSITE_PURPOSE,
  payload: websitePurpose,
});

export const savePageDetails = (pageDetails) => ({
  type: ACTIONS.FORM.SAVE_PAGE_DETAILS,
  payload: pageDetails,
});

export const saveBranding = (branding) => ({
  type: ACTIONS.FORM.SAVE_BRANDING,
  payload: branding,
});

export const updatePrice = (price) => ({
  type: ACTIONS.FORM.UPDATE_PRICE,
  payload: price,
});

export const updateAdditionalPrice = (price) => ({
  type: ACTIONS.FORM.UPDATE_ADDITIONAL_PRICE,
  payload: price,
});

export const addDevicePrice = (price) => ({
  type: ACTIONS.FORM.ADD_DEVICE_PRICE,
  payload: price,
});

export const updatePagePrice = (price) => ({
  type: ACTIONS.FORM.UPDATE_PAGE_PRICE,
  payload: price,
});
