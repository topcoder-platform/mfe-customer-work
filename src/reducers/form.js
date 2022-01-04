/**
 * `form` reducer
 */

import { ACTIONS } from "constants/";

const initialState = {
  price: 0,
  additionalPrice: 0,
  devicePrice: 0,
  pagePrice: 0,
  workType: null,
  basicInfo: null,
  websitePurpose: null,
  pageDetails: null,
  branding: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FORM.SAVE_WORK_TYPE:
      return {
        ...state,
        workType: action.payload,
      };
    case ACTIONS.FORM.UPDATE_PRICE:
      return {
        ...state,
        price: action.payload,
      };
    case ACTIONS.FORM.UPDATE_ADDITIONAL_PRICE:
      return {
        ...state,
        additionalPrice: action.payload,
      };
    case ACTIONS.FORM.ADD_DEVICE_PRICE:
      return {
        ...state,
        devicePrice: action.payload,
      };
    case ACTIONS.FORM.UPDATE_PAGE_PRICE:
      return {
        ...state,
        pagePrice: action.payload,
      };
    case ACTIONS.FORM.SAVE_BASIC_INFO:
      return {
        ...state,
        basicInfo: action.payload,
      };
    case ACTIONS.FORM.SAVE_WEBSITE_PURPOSE:
      return {
        ...state,
        websitePurpose: action.payload,
      };
    case ACTIONS.FORM.SAVE_PAGE_DETAILS:
      return {
        ...state,
        pageDetails: action.payload,
      };
    case ACTIONS.FORM.SAVE_BRANDING:
      return {
        ...state,
        branding: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
