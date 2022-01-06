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
  { label: "Select Work Type", url: "/self-service" },
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
  },
  PROGRESS: {
    SET_ITEM: "SET_ITEM",
  },
};
