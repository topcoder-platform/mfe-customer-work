/**
 * `form` reducer
 */
import moment from "moment";
import "moment-timezone";
import config from "../../config";
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
  reviewConfirmed: false,
  updatedAt: "",
};

const formReducer = (state = initialState, action) => {
  const updatedAt = moment().tz(config.TIME_ZONE).format();
  switch (action.type) {
    case ACTIONS.FORM.SAVE_FORM:
      return {
        ...state,
        ...action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.RESET_INTAKE_FORM:
      return {
        ...state,
        ...initialState,
        updatedAt,
      };
    case ACTIONS.FORM.SAVE_WORK_TYPE:
      return {
        ...state,
        workType: {
          ...state.workType,
          ...action.payload,
        },
        updatedAt,
      };
    case ACTIONS.FORM.UPDATE_PRICE:
      return {
        ...state,
        price: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.UPDATE_ADDITIONAL_PRICE:
      return {
        ...state,
        additionalPrice: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.ADD_DEVICE_PRICE:
      return {
        ...state,
        devicePrice: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.UPDATE_PAGE_PRICE:
      return {
        ...state,
        pagePrice: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.REVIEW_CONFIRMED:
      return {
        ...state,
        reviewConfirmed: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.SAVE_BASIC_INFO:
      return {
        ...state,
        basicInfo: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.SAVE_WEBSITE_PURPOSE:
      return {
        ...state,
        websitePurpose: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.SAVE_PAGE_DETAILS:
      return {
        ...state,
        pageDetails: action.payload,
        updatedAt,
      };
    case ACTIONS.FORM.SAVE_BRANDING:
      return {
        ...state,
        branding: action.payload,
        updatedAt,
      };
    default:
      return state;
  }
};

export default formReducer;
