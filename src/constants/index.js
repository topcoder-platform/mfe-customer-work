import MyWorkActiveIcon from "../assets/images/icon-my-work-active.svg";
import MyWorkIcon from "../assets/images/icon-my-work.svg";

export const ROUTES = {
  INTAKE_FORM: "/self-service/wizard",
  HOME_PAGE: "/self-service/home",
  DASHBOARD_PAGE: "/self-service",
};

/**
 * All action types
 */
export const ACTION_TYPE = {
  /*
    withAuthentication
   */
  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR: "AUTH_USER_ERROR",
};

/**
 * Supported Button Sizes
 */
export const BUTTON_SIZE = {
  TINY: "tiny",
  SMALL: "small",
  MEDIUM: "medium",
};

/**
 * Supported Button Types
 */
export const BUTTON_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  ROUNDED: "rounded",
};

export const MAX_COMPLETED_STEP = "MAX_COMPLETED_STEP";
export const HELP_BANNER = {
  title: "Not seeing what you need?",
  description: "Not seeing what you need?",
};

/**
 * Industry List
 */
export const IndustryList = [
  { label: "Technology", value: "technology" },
  { label: "Public Sector", value: "public-sector" },
  { label: "Retail", value: "retail" },
  { label: "Oil & Gas", value: "oil-gas" },
];

/**
 * Design Options
 */
export const DesignOptions = [
  {
    label: "Yes, allow designers to recommend stock photos",
    value: "allow",
  },
  { label: "No, Do not Stock Photos", value: "not-allow" },
];

/**
 * ProgressLevels
 */
export const ProgressLevels = [
  { label: "Select Work Type", url: "/self-service/wizard" },
  { label: "Basic Info", url: "/self-service/basic-info" },
  { label: "Website Purpose", url: "/self-service/website-purpose" },
  { label: "Page Details", url: "/self-service/page-details" },
  { label: "Branding", url: "/self-service/branding" },
  { label: "Review", url: "/self-service/review" },
  { label: "Payment", url: "/self-service/payment" },
];

/**
 * page options
 */
export const PageOptions = [
  { label: "1 page (from 50$)", price: 50, value: false },
  { label: "2 page (from 100$)", price: 100, value: false },
  { label: "3 page (from 150$)", price: 150, value: false },
  { label: "4 page (from 200$)", price: 200, value: false },
  { label: "5 page (from 300$)", price: 300, value: false },
];

/**
 * page options
 */
export const DeviceOptions = [
  { label: "Computer", price: 0 },
  { label: "Tablet", price: 300 },
  { label: "Phone", price: 500 },
];

/**
 * page options
 */
export const DeliverablesOptions = [
  { label: "No Preference. Recommended for best participation", value: false },
  { label: "Figma", value: false },
  { label: "Sketch", value: false },
  { label: "Adobe XD", value: false },
  { label: "Other", value: false },
];

/**
 * Work Types
 */
export const workTypes = [
  { title: "Web", subTitle: "Example or description text", price: 499 },
  { title: "Mobile", subTitle: "Example or description text", price: 499 },
  {
    title: "Architecture",
    subTitle: "Example or description text",
    price: 499,
  },
  { title: "API", subTitle: "Example or description text", price: 499 },
  {
    title: "Data Science & AI",
    subTitle: "Example or description text",
    price: 499,
  },
  {
    title: "Visual Design",
    subTitle: "Example or description text",
    price: 499,
  },
];

/**
 * Web Work Types
 */
export const webWorkTypes = [
  {
    title: "Website Design",
    subTitle: "Information to help understand what this category would include",
    price: 499,
  },
  {
    title: "Website Development",
    subTitle: "Information to help understand what this category would include",
    price: 499,
  },
  {
    title: "Web App Design",
    subTitle: "Information to help understand what this category would include",
    price: 499,
  },
];

/**
 * Color Options
 */
export const ColorOptionsItems = [
  { name: "Blues", className: "blues" },
  { name: "Aquas", className: "aquas" },
  { name: "Greens", className: "greens" },
  { name: "Purples", className: "purples" },
  { name: "Pinks", className: "pinks" },
  { name: "Reds", className: "reds" },
  { name: "Oranges", className: "oranges" },
  { name: "Yellows", className: "yellows" },
  { name: "Light Grays", className: "lightGrays" },
  { name: "Dark Grays", className: "darkGrays" },
  { name: "Any Colors", className: "angularGradient" },
];

/**
 * Color Options
 */
export const tabNames = [
  "Summary",
  "Details",
  "Messaging",
  "Solutions",
  "History",
];

export const disabledSidebarRoutes = [
  "/self-service/basic-info",
  "/self-service/website-purpose",
  "/self-service/page-details",
  "/self-service/branding",
  "/self-service/review",
  "/self-service/payment",
  "/self-service/thank-you",
  "/self-service/wizard",
  "/self-service/profile",
];

export const menuItems = [
  {
    item: "My Work",
    url: "/self-service",
    icon: <MyWorkIcon />,
    activeIcon: <MyWorkActiveIcon />,
  },
];

export const ACTIONS = {
  FORM: {
    UPDATE_PRICE: "UPDATE_PRICE",
    UPDATE_ADDITIONAL_PRICE: "UPDATE_ADDITIONAL_PRICE",
    SAVE_WORK_TYPE: "SAVE_WORK_TYPE",
    SAVE_BASIC_INFO: "SAVE_BASIC_INFO",
    SAVE_WEBSITE_PURPOSE: "SAVE_WEBSITE_PURPOSE",
    SAVE_PAGE_DETAILS: "SAVE_PAGE_DETAILS",
    SAVE_BRANDING: "SAVE_BRANDING",
    ADD_DEVICE_PRICE: "ADD_DEVICE_PRICE",
    UPDATE_PAGE_PRICE: "UPDATE_PAGE_PRICE",
    REVIEW_CONFIRMED: "REVIEW_CONFIRMED",
    SAVE_FORM: "SAVE_FORM",
    RESET_INTAKE_FORM: "RESET_INTAKE_FORM",
  },
  PROGRESS: {
    SET_ITEM: "SET_ITEM",
  },
  AUTO_SAVE: {
    COOKIE_CLEARED: "COOKIE_CLEARED",
    TRIGGER_AUTO_SAVE: "TRIGGER_AUTO_SAVE",
    INIT_ERRORED: "INIT_ERRORED",
  },
  CHALLENGE: {
    GET_CHALLENGE: "GET_CHALLENGE",
  },
  MY_WORK: {
    LOAD_WORKS_ERROR: "LOAD_WORKS_ERROR",
    LOAD_WORKS_PENDING: "LOAD_WORKS_PENDING",
    LOAD_WORKS_SUCCESS: "LOAD_WORKS_SUCCESS",
  },
  PROFILE: {
    GET_PROFILE: "GET_PROFILE",
    UPDATE_BASIC_INFO_PENDING: "UPDATE_BASIC_INFO_PENDING",
    UPDATE_BASIC_INFO_SUCCESS: "UPDATE_BASIC_INFO_SUCCESS",
    UPDATE_BASIC_INFO_ERROR: "UPDATE_BASIC_INFO_ERROR",
  },
};

export const AUTO_SAVE_FORM = "AUTO_SAVE_FORM";

export const CACHED_CHALLENGE_ID = "CACHED_CHALLENGE_ID";

export const CHALLENGE_FIELD_VALUES = {
  trackId: "9b6fc876-f4d9-4ccb-9dfd-419247628825",
  typeId: "927abff4-7af9-4145-8ba1-577c16e64e2e",
  timelineTemplateId: "7ebf1c69-f62f-4d3a-bdfb-fe9ddb56861c",
};

export const INTAKE_FORM_ROUTES = [
  "/self-service/wizard",
  "/self-service/basic-info",
  "/self-service/website-purpose",
  "/self-service/page-details",
  "/self-service/branding",
  "/self-service/review",
  "/self-service/payment",
  "/self-service/thank-you",
];

export const CHALLENGE_STATUS = {
  ACTIVE: "Active",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  DRAFT: "Draft",
  NEW: "New",
};

export const WORK_STATUS_MAP = {
  [CHALLENGE_STATUS.ACTIVE]: "In progress",
  [CHALLENGE_STATUS.CANCELLED]: "Directed to sales",
  [CHALLENGE_STATUS.COMPLETED]: "Completed",
  [CHALLENGE_STATUS.DRAFT]: "Submitted",
  [CHALLENGE_STATUS.NEW]: "Draft",
};

export const WORK_STATUS_ORDER = {
  [CHALLENGE_STATUS.NEW]: 0, // Draft
  [CHALLENGE_STATUS.DRAFT]: 1, // Submitted
  [CHALLENGE_STATUS.ACTIVE]: 2, // In progress
  [CHALLENGE_STATUS.COMPLETED]: 3,
  [CHALLENGE_STATUS.CANCELLED]: 4, // Directed to sales
  Unknown: 999,
};
