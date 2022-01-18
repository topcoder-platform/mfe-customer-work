import MyWorkActiveIcon from "../assets/images/icon-my-work-active.svg";
import MyWorkIcon from "../assets/images/icon-my-work.svg";
import workUtil from "../utils/work";
import moment from "moment";

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
  LARGE: "large",
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
  "summary",
  "details",
  "messaging",
  "solutions",
  "history",
];

export const menuItems = [
  {
    item: "My Work",
    url: "/self-service/work-items",
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
  },
  PROGRESS: {
    SET_ITEM: "SET_ITEM",
  },
  WORK: {
    GET_WORK: "GET_WORK",
    GET_WORK_PENDING: "GET_WORK_PENDING",
    GET_WORK_SUCCESS: "GET_WORK_SUCCESS",
    GET_WORK_ERROR: "GET_WORK_ERROR",
    GET_SUMMARY: "GET_SUMMARY",
    GET_DETAILS: "GET_DETAILS",
    GET_SOLUTIONS: "GET_SOLUTIONS",
    GET_SOLUTIONS_PENDING: "GET_SOLUTIONS_PENDING",
    GET_SOLUTIONS_SUCCESS: "GET_SOLUTIONS_SUCCESS",
    GET_SOLUTIONS_ERROR: "GET_SOLUTIONS_ERROR",
    DOWNLOAD_SOLUTION: "DOWNLOAD_SOLUTION",
    DOWNLOAD_SOLUTION_PENDING: "DOWNLOAD_SOLUTION_PENDING",
    DOWNLOAD_SOLUTION_SUCCESS: "DOWNLOAD_SOLUTION_SUCCESS",
    DOWNLOAD_SOLUTION_ERROR: "DOWNLOAD_SOLUTION_ERROR",
    SAVE_SURVEY: "SAVE_SURVEY",
    SAVE_SURVEY_PENDING: "SAVE_SURVEY_PENDING",
    SAVE_SURVEY_SUCCESS: "SAVE_SURVEY_SUCCESS",
    SAVE_SURVEY_ERROR: "SAVE_SURVEY_ERROR",
    SET_IS_SAVING_SURVEY_DONE: "SET_IS_SAVING_SURVEY_DONE",
  },
};

export const WORK_STATUSES = {
  Draft: {
    name: "Draft",
    value: "New",
    color: "#555555",
  },
  Submitted: {
    name: "Submitted",
    value: "Draft",
    color: "#e90c5a",
  },
  InProgress: {
    name: "In-progress",
    value: "Active",
    color: "#12c188",
  },
  Completed: {
    name: "Completed",
    value: "Completed",
    color: "#2c95d7",
  },
  DirectedToSales: {
    name: "Directed to sales",
    value: "Canceled",
    color: "#6569ff",
  },
};

export const WORK_TIMELINE = [
  {
    title: "WORK SUBMITTED",
    date: "created",
    active: (work) => work.status === WORK_STATUSES.Submitted.value,
    completed: (work) => work.status !== WORK_STATUSES.Submitted.value,
  },
  {
    title: "WORK STARTED",
    date: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Registration");
      return workUtil.phaseStartDate(phase);
    },
    active: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Registration");
      const isRegistrationPhaseOpen =
        phase.isOpen && moment(workUtil.phaseEndDate(phase)).isAfter();
      return (
        work.status === WORK_STATUSES.InProgress.value &&
        isRegistrationPhaseOpen
      );
    },
    completed: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Registration");
      const isRegistrationPhaseClosed = moment(
        workUtil.phaseEndDate(phase)
      ).isBefore();
      return isRegistrationPhaseClosed;
    },
  },
  {
    title: "WORK FINISHED",
    date: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Submission");
      return workUtil.phaseEndDate(phase);
    },
    active: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Submission");
      const isSubmissionPhaseOpen =
        phase.isOpen && moment(workUtil.phaseEndDate(phase)).isAfter();
      return (
        work.status === WORK_STATUSES.InProgress.value && isSubmissionPhaseOpen
      );
    },
    completed: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Submission");
      const isSubmissionPhaseClosed = moment(
        workUtil.phaseEndDate(phase)
      ).isBefore();
      return isSubmissionPhaseClosed;
    },
  },
  {
    name: "downloads-ready",
    title: "DOWNLOADS READY",
    date: (work) => {
      let phase = work.phases.find(
        (phase) => phase.name === "Appeals Response"
      );

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Review");
      }

      if (!phase) {
        return;
      }
      return workUtil.phaseEndDate(phase);
    },
    active: (work) => {
      let phase = work.phases.find(
        (phase) => phase.name === "Appeals Response"
      );

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Review");
      }

      if (!phase) {
        return;
      }
      const isAppealResponsePhaseOpen =
        phase.isOpen && moment(workUtil.phaseEndDate(phase)).isAfter();
      return isAppealResponsePhaseOpen;
    },
    completed: (work) => {
      let phase = work.phases.find(
        (phase) => phase.name === "Appeals Response"
      );

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Review");
      }

      if (!phase) {
        return;
      }
      const allPreviousPhasesClosed = work.phases
        .slice(0, work.phases.indexOf(phase))
        .every((p) => !p.isOpen);
      const isAppealResponsePhaseEnded = moment(
        workUtil.phaseEndDate(phase)
      ).isBefore();
      return isAppealResponsePhaseEnded && allPreviousPhasesClosed;
    },
  },
  {
    title: "MARK AS DONE",
    date: (work) => {
      if (work.status === WORK_STATUSES.Completed.value) {
        return work.updated;
      }
    },
    active: (work) => work.status === WORK_STATUSES.Completed.value,
    completed: (work) => {
      const customerFeedbacked =
        work.metadata &&
        work.metadata.find((item) => item.name === "customerFeedback");
      return (
        work.status === WORK_STATUSES.Completed.value && customerFeedbacked
      );
    },
  },
  {
    name: "send-to-solutions-expert",
    title: "SEND TO SOLUTIONS EXPERT",
    date: (work) => {
      if (work.status === WORK_STATUSES.DirectedToSales.value) {
        return work.updated;
      }
    },
    completed: true,
    hidden: (work) => work.status !== WORK_STATUSES.DirectedToSales.value,
  },
];
