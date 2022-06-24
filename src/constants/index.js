import _ from "lodash";
import moment from "moment";
import React from "react";

// for some reason this has to be loaded from a lower-level
// barrel for it to be available when this file loads.
// yet another reason to get off the legacy architecture...
import { WorkPrices, WorkType } from '../../src-ts/tools/work'
import WebsiteDesignPdf1 from "../assets/pdf/WebDesign-1.pdf";
import WebsiteDesignPdf2 from "../assets/pdf/WebDesign-2.pdf";
import "./styles.module.scss";

import MyWorkActiveIcon from "../assets/images/icon-my-work-active.svg";
import exampleImage1 from "../assets/images/design-example-image1.png";
import exampleImage2 from "../assets/images/design-example-image2.png";
import MyWorkIcon from "../assets/images/icon-my-work.svg";
import PageUl from "../components/PageElements/PageUl";
import PageP from "../components/PageElements/PageP";
import copyFileIcon from "../assets/images/icon-copy-file.svg";
import workUtil from "../utils/work";

import * as dataExplorationConfigs from "./products/DataExploration";
import * as findMeDataConfigs from "./products/FindMeData";
import * as dataAdvisoryConfigs from "./products/DataAdvisory";
import * as webDesignConfigs from "./products/WebsiteDesign";
import * as webDesignLegacyConfigs from "./products/WebsiteDesignLegacy";
import countries from "./countries";

import imgProductDataExploration from "../assets/images/products/product-main-photos/data-exploration.jpeg";
import imgProductProblemStatement from "../assets/images/products/product-main-photos/problem-statements-and-data.jpeg";
import imgProductFindMeData from "../assets/images/products/product-main-photos/find-me-data.jpeg";
import imgProductWebsiteDesign from "../assets/images/products/product-main-photos/web-design.jpeg";
import imgRedBlueGradient from "../assets/images/products/product-main-photos/reb-blue-gradient-background.jpeg";

export const UNDER_MAINTENANCE = false;

export const GA_ID = "GTM-MXXQHG8";

export const ROUTES = {
  INTAKE_FORM: "/self-service/wizard",
  HOME_PAGE: "/self-service",
  DASHBOARD_PAGE: "/work/dashboard",
  WEBSITE_DESIGN: "/self-service/work/new/website-design-new/basic-info",
  WEBSITE_DESIGN_REVIEW: "/self-service/work/new/website-design-new/review",
  DATA_EXPLORATION: "/self-service/work/new/data-exploration/basic-info",
  DATA_EXPLORATION_REVIEW: "/self-service/work/new/data-exploration/review",
  PROBLEM_STATEMENT: "/self-service/work/new/data-advisory/basic-info",
  PROBLEM_STATEMENT_REVIEW: "/self-service/work/new/data-advisory/review",
  FIND_ME_DATA: "/self-service/work/new/find-me-data/basic-info",
  FIND_ME_DATA_REVIEW: "/self-service/work/new/find-me-data/review",
  WEBSITE_DESIGN_LEGACY: "/self-service/work/new/website-design/basic-info",
  WEBSITE_DESIGN_PURPOSE_LEGACY:
    "/self-service/work/new/website-design/website-purpose",
  WEBSITE_DESIGN_PAGE_DETAILS_LEGACY:
    "/self-service/work/new/website-design/page-details",
  WEBSITE_DESIGN_BRANDING_LEGACY:
    "/self-service/work/new/website-design/branding",
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
  description:
    "Topcoder also offers solutions for multiple other technical needs and problems. We have community members expertly skilled in Development, UX / UI Design, Data Science, Quality Assurance, and more. We’d love to talk with you about all of our services.",
};

/**
 * Industry List
 */
export const IndustryList = [
  { label: "Accounting & Financial", value: "accounting-financial" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Animal & Pet", value: "animal-pet" },
  { label: "Architectural", value: "architectural" },
  { label: "Art & Design", value: "art-design" },
  { label: "Attorney & Law", value: "attorney-law" },
  { label: "Automotive", value: "automotive" },
  { label: "Bar & Nightclub", value: "bar-nightclub" },
  { label: "Business & Consulting", value: "business-consulting" },
  { label: "Childcare", value: "childcare" },
  { label: "Cleaning & Maintenance", value: "cleaning-maintenance" },
  { label: "Communications", value: "communications" },
  { label: "Community & Nonprofit", value: "community-nonprofit" },
  { label: "Computer", value: "computer" },
  { label: "Construction", value: "construction" },
  { label: "Cosmetic & Beauty", value: "cosmetic-beauty" },
  { label: "Dating", value: "dating" },
  { label: "Education", value: "education" },
  { label: "Entertainment & the Arts", value: "entertainment-the-arts" },
  { label: "Environmental", value: "environmental" },
  { label: "Fashion", value: "fashion" },
  { label: "Food & Drink", value: "food-drink" },
  { label: "Games & Recreation", value: "games-recreation" },
  { label: "Home furnishing", value: "home-furnishing" },
  { label: "Industrial", value: "industrial" },
  { label: "Internet", value: "internet" },
  { label: "Landscaping", value: "landscaping" },
  { label: "Medical & Pharmaceutical", value: "medical-pharmaceutical" },
  { label: "Photography", value: "photography" },
  { label: "Physical Fitness", value: "physical-fitness" },
  { label: "Political", value: "political" },
  { label: "Real Estate & Mortgage", value: "real-estate-mortgage" },
  { label: "Religious", value: "religious" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Retail", value: "retail" },
  { label: "Security", value: "security" },
  { label: "Spa & Esthetics", value: "spa-esthetics" },
  { label: "Sport", value: "sport" },
  { label: "Travel & Hotel", value: "travel-hotel" },
  { label: "Wedding Service", value: "wedding-service" },
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
 * page options
 */
export const PageOptions = [
  { label: "1 page", price: 50, value: false },
  { label: "2 pages", price: 100, value: false },
  { label: "3 pages", price: 150, value: false },
  { label: "4 pages", price: 200, value: false },
  { label: "5 pages", price: 300, value: false },
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
  { label: "Any (recommended for best participation)", value: false },
  { label: "Adobe XD", value: false },
  { label: "Figma", value: false },
  { label: "Sketch", value: false },
  { label: "Other", value: false },
];

/**
 * page options
 */
export const AllowStockOptions = [
  { label: "Yes, allow stock photos", value: true },
  { label: "No, do not allow stock photos", value: false },
];

/**
 * page options
 */
export const PrimaryDataChallengeOptions = [
  { label: "I have data but can't share it", value: true },
  {
    label: "I've looked for this data and haven't been able to find it",
    value: false,
  },
  {
    label: "I don't have time to find this data",
    value: false,
  },
  {
    label: "Other (please specify below)",
    value: false,
  },
];

/**
 * Work Types
 */
export const workTypes = [
  {
    title: "Website Development",
    subTitle:
      "Our developers can bring your website designs to life! We'll get your website ready for the world to see.",
    price: 499,
    comingSoon: true,
  },
  { title: "Mobile", subTitle: "Example or description text", price: 499 },
  {
    title: "Architecture",
    subTitle: "Example or description text",
    price: 499,
  },
  { title: "API", subTitle: "Example or description text", price: 499 },
  {
    title: "Data Science & AI",
    subTitle:
      "Data Mining & Analysis will empower you to reach your goals faster. Tap data science geniuses from our pool of experts.",
    price: 499,
    comingSoon: true,
  },
  {
    title: "Visual Design",
    subTitle: "Example or description text",
    price: 499,
  },
];

/**
 * Project & professional service content
 */
export const projectAndProfessionalWork = {
  title: "Projects & Professional Services",
  shortDescription:
    "Have a more complex need or project to discuss? We do it all and do it well. Start with confidence right here.",
  bgImage: imgRedBlueGradient,
  svgIcon: copyFileIcon,
  ctaText: "Let's talk",
};

/**
 * Web Work Types
 */
const dataPrice = WorkPrices[WorkType.data]
const designPrice = WorkPrices[WorkType.design]
const designLegacyPrice = WorkPrices[WorkType.designLegacy]
const findDataPrice = WorkPrices[WorkType.findData]
const problemPrice = WorkPrices[WorkType.problem]
export const webWorkTypes = [
  {
    type: WorkType.designLegacy,
    title: "Website Design",
    duration: `${webDesignLegacyConfigs.DEFAULT_DURATION} Days`,
    description:
      "Create a beautiful custom visual design for your website. Specify the scope and device types, your vision, and receive up to 5 modern designs.",
    shortDescription: "Create Custom Website Designs that Wow",
    shortDescriptionMobile: "Design your business",
    subTitle:
      "​​Create a beautiful custom visual design for your website. Specify the scope and device types, your vision, and receive up to 5 modern designs.",
    price: designLegacyPrice.getPrice(designLegacyPrice),
    stickerPrice: designLegacyPrice.base,
    featured: true,
    startRoute: "/self-service/work/new/website-design/basic-info",
    basePath: "website-design",
    bgImage: imgProductWebsiteDesign,
  },
  {
    type: WorkType.design,
    title: "Website Design (NEW)",
    subTitle:
      "Create a beautiful custom visual design for your website. Specify the scope and device types, your vision, and receive up to 5 modern designs.",
    shortDescription: "Create Custom Website Designs that Wow",
    shortDescriptionMobile: "Design your business",
    description:
      "Create a beautiful custom visual design for your website. Specify the scope and device types, your vision, and receive up to 5 modern designs.",
    price: designPrice.getPrice(designPrice),
    // stickerPrice: designPrice.base,
    duration: `${webDesignConfigs.DEFAULT_DURATION} Days`,
    featured: true,
    startRoute: "/self-service/work/new/website-design-new/basic-info",
    basePath: "website-design-new",
    helperBannerTitle: "WHAT WILL I RECEIVE?",
    bgImage: imgProductWebsiteDesign,
    helperBannerContent: (
      <>
        <br />
        <div styleName="helpBanner">
          <PageP>
            You will receive up to five unique visual designs for the main page
            of your website, in an industry-standard format. Visual designs are
            the first step in creating a functional website. Topcoder can help
            you with launching your website once you have approved your design.
          </PageP>
          <div styleName="sampleImages">
            <a href={WebsiteDesignPdf1} target="_blank">
              <img styleName="imgBanner" src={exampleImage1} />
            </a>
            &nbsp;
            <a href={WebsiteDesignPdf2} target="_blank">
              <img src={exampleImage2} />
            </a>
          </div>
        </div>
      </>
    ),
    aboutBannerTitle: "ABOUT WEBSITE DESIGN",
    aboutBannerContent: (
      <>
        <p>
          Topcoder design experts will take all of the information you provide
          below, and create visual designs for your website that fit your
          industry and match your desired look & feel. We've done this for
          hundreds of customers and will work with you to create your ideal
          design.
        </p>
      </>
    ),
    breadcrumbs: {
      basic: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: "#", name: "Website Design" },
      ],
      review: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: ROUTES.WEBSITE_DESIGN, name: "Website design" },
        { url: "#", name: "Review & Payment" },
      ],
    },
  },
  {
    type: WorkType.data,
    title: "Data Exploration",
    subTitle: "Get insights about your data from Topcoder experts.",
    shortDescription: "Uncover What's Interesting About Your Data",
    description:
      "We accumulate data every day in the course of life and business, yet rarely have the time to give it a closer look. Get multiple fresh, expert perspectives to identify the patterns and relationships in your data. They might just be the key to your next 'Aha' moment.",
    price: dataPrice.getPrice(dataPrice),
    stickerPrice: dataPrice.base,
    duration: `${dataExplorationConfigs.DEFAULT_DURATION} Days`,
    featured: true,
    startRoute: "/self-service/work/new/data-exploration/basic-info",
    basePath: "data-exploration",
    bgImage: imgProductDataExploration,
    helperBannerTitle: "WHAT WILL I GET?",
    helperBannerContent: (
      <>
        <br />
        Topcoder data experts will create a custom report for you with:
        <PageUl>
          <li>Clear written analysis of your data and key findings</li>
          <li>
            Visuals of the most compelling relationships and patterns in your
            data
          </li>
          <li>
            Expert commentary on the relevance of findings to your goals and
            recommendations for further analysis
          </li>
        </PageUl>
      </>
    ),
    aboutBannerTitle: "ABOUT DATA EXPLORATION",
    aboutBannerContent: (
      <p>
        In Data Exploration, multiple data science experts uncover the most
        significant patterns and relationships in your data. Unlock the full
        potential of your data with expert insights presented in an
        easy-to-understand format.
      </p>
    ),
    breadcrumbs: {
      basic: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: "#", name: "Data exploration" },
      ],
      review: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: ROUTES.DATA_EXPLORATION, name: "Data exploration" },
        { url: "#", name: "Review & Payment" },
      ],
    },
  },
  {
    type: WorkType.problem,
    title: "Problem Statement & Data Advisory",
    subTitle:
      "Translate your data science idea into an actionable data science approach.",
    shortDescription: "The easiest way to get started in data science",
    description:
      "Problem Statement & Data Advisory is for those asking themselves: How can I apply data science to this idea or goal? How will I interpret solutions, and how will that help me take action? What data do I need?",
    price: problemPrice.getPrice(problemPrice),
    stickerPrice: problemPrice.base,
    duration: `${dataAdvisoryConfigs.DEFAULT_DURATION} Days`,
    featured: true,
    startRoute: "/self-service/work/new/data-advisory/basic-info",
    basePath: "data-advisory",
    helperBannerTitle: "WHAT WILL I RECEIVE?",
    bgImage: imgProductProblemStatement,
    helperBannerContent: (
      <>
        <br />
        <PageUl>
          <li>
            Detailed feedback on your business question and/or problem statement
          </li>
          <li>Recommendations or refinement of your problem statement</li>
          <li>
            Recommendations on the amount and type of data that should be used
          </li>
          <li>
            Assessment of the quality of your data and recommendations on how to
            improve or augment the data set
          </li>
          <li>
            Scoring and evaluation recommendations for future data science
            solutions
          </li>
        </PageUl>
      </>
    ),
    aboutBannerTitle: "ABOUT PROBLEM STATEMENT & DATA ADVISORY",
    aboutBannerContent: (
      <p>
        Problem Statement &amp; Data Advisory is for those asking themselves:
        How can I apply data science to this idea or goal? How will I interpret
        solutions, and how will that help me take action? What data do I need?
      </p>
    ),
    breadcrumbs: {
      basic: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: "#", name: "Problem statement & data advisory" },
      ],
      review: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        {
          url: ROUTES.PROBLEM_STATEMENT,
          name: "Problem statement & data advisory",
        },
        { url: "#", name: "Review & Payment" },
      ],
    },
  },
  {
    type: WorkType.findData,
    title: "Find Me Data",
    subTitle: "Get the data you need to meet your analysis goals.",
    shortDescription: "Our Experts Source Useful Data Sets For You",
    description:
      "Sometimes data is the only thing standing between you and something great. Tell us what you're solving for, and let our experts find the data to get you started now.",
    price: findDataPrice.getPrice(findDataPrice),
    stickerPrice: findDataPrice.base,
    duration: `${findMeDataConfigs.DEFAULT_DURATION} Days`,
    featured: true,
    startRoute: "/self-service/work/new/find-me-data/basic-info",
    basePath: "find-me-data",
    bgImage: imgProductFindMeData,
    helperBannerTitle: "WHAT WILL I RECEIVE?",
    helperBannerContent: (
      <>
        <br />
        <PageUl>
          <li>
            You get all of the free public data options that meet your goals.
          </li>
          <li>
            Where public data isn't available, you get a listing of the best
            paid data options and how to use them.
          </li>
          <li>
            For the trickiest of data requirements, you get expert advice on how
            to create the data you need.
          </li>
        </PageUl>
      </>
    ),
    aboutBannerTitle: "ABOUT FIND ME DATA",
    aboutBannerContent: (
      <>
        <p>
          Find Me Data is designed for business leaders, researchers or any
          individual who has a data question and is struggling to find the data
          to answer it.
        </p>
        <br />
        <p>Use Find Me Data if you:</p>
        <PageUl>
          <li>
            Want to better understand how to find and use open-source/public
            data in your projects
          </li>
          <li>Need data that you can share with others.</li>
          <li>
            Note, we also offer data anonymization services to convert your
            existing data into secure and shareable form
          </li>
        </PageUl>
      </>
    ),
    breadcrumbs: {
      basic: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: "#", name: "Find me data" },
      ],
      review: [
        { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
        { url: ROUTES.INTAKE_FORM, name: "Start work" },
        { url: ROUTES.FIND_ME_DATA, name: "Find me data" },
        { url: "#", name: "Review & Payment" },
      ],
    },
  },
];

/**
 * Color Options
 */
export const ColorOptionsItems = [
  { name: "Any Colors", className: "angularGradient", isAny: true },
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
];

/**
 * Color Options
 */
export const tabNames = ["summary", "details", "messaging", "solutions"];

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
  "/self-service/login-prompt",
  "/self-service/work-items/*",
  "/self-service/work/*",
];

export const menuItems = [
  {
    item: "My Work",
    url: ROUTES.DASHBOARD_PAGE,
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
    TOGGLE_SUPPORT_MODAL: "TOGGLE_SUPPORT_MODAL",
    CREATE_SUPPORT_TICKET: "CREATE_SUPPORT_TICKET",
  },
  PROGRESS: {
    SET_ITEM: "SET_ITEM",
  },
  AUTO_SAVE: {
    COOKIE_CLEARED: "COOKIE_CLEARED",
    TRIGGER_AUTO_SAVE: "TRIGGER_AUTO_SAVE",
    INIT_ERRORED: "INIT_ERRORED",
    TRIGGER_COOKIE_CLEARED: "TRIGGER_COOKIE_CLEARED",
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
    GET_FORUM_NOTIFICATIONS: "GET_FORUM_NOTIFICATIONS",
    GET_FORUM_NOTIFICATIONS_PENDING: "GET_FORUM_NOTIFICATIONS_PENDING",
    GET_FORUM_NOTIFICATIONS_SUCCESS: "GET_FORUM_NOTIFICATIONS_SUCCESS",
    GET_FORUM_NOTIFICATIONS_ERROR: "GET_FORUM_NOTIFICATIONS_ERROR",
  },
};

export const AUTO_SAVE_FORM = "AUTO_SAVE_FORM";

export const CACHED_CHALLENGE_ID = "CACHED_CHALLENGE_ID";

export const CHALLENGE_STATUS = {
  ACTIVE: "Active",
  CANCELLED: "Cancelled",
  CANCELLED_REQUIREMENTS_INFEASIBLE: "Cancelled - Requirements Infeasible",
  CANCELLED_PAYMENT_FAILED: "Cancelled - Payment Failed",
  COMPLETED: "Completed",
  DRAFT: "Draft",
  NEW: "New",
  APPROVED: "Approved",
  DELETED: "Deleted",
};

export const WORK_STATUS_MAP = {
  [CHALLENGE_STATUS.ACTIVE]: "Started",
  [CHALLENGE_STATUS.CANCELLED]: "Redirected",
  [CHALLENGE_STATUS.CANCELLED_REQUIREMENTS_INFEASIBLE]: "Redirected",
  [CHALLENGE_STATUS.CANCELLED_PAYMENT_FAILED]: "Redirected",
  [CHALLENGE_STATUS.COMPLETED]: "Done",
  [CHALLENGE_STATUS.DRAFT]: "Submitted",
  [CHALLENGE_STATUS.NEW]: "Draft",
  [CHALLENGE_STATUS.DELETED]: "Deleted",
};

export const WORK_STATUS_ORDER = {
  [CHALLENGE_STATUS.NEW]: 0, // Draft
  [CHALLENGE_STATUS.DRAFT]: 1, // Submitted
  [CHALLENGE_STATUS.ACTIVE]: 2, // In progress
  [CHALLENGE_STATUS.COMPLETED]: 3,
  [CHALLENGE_STATUS.CANCELLED]: 4, // Directed to sales
  [CHALLENGE_STATUS.CANCELLED_REQUIREMENTS_INFEASIBLE]: 4, // Directed to sales
  [CHALLENGE_STATUS.CANCELLED_PAYMENT_FAILED]: 4, // Directed to sales
  Unknown: 999,
};

export const WORK_STATUSES = {
  Draft: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.NEW],
    value: CHALLENGE_STATUS.NEW,
    color: "#555555",
  },
  Submitted: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.DRAFT],
    value: CHALLENGE_STATUS.DRAFT,
    color: "#12C188",
  },
  InProgress: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.ACTIVE],
    value: CHALLENGE_STATUS.ACTIVE,
    color: "#12C188",
  },
  Completed: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.COMPLETED],
    value: CHALLENGE_STATUS.COMPLETED,
    color: "#555555",
  },
  Deleted: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.DELETED],
    value: CHALLENGE_STATUS.DELETED,
    color: "#E90C5A",
  },
  DirectedToSales: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.CANCELLED_REQUIREMENTS_INFEASIBLE],
    value: CHALLENGE_STATUS.CANCELLED_REQUIREMENTS_INFEASIBLE,
    color: "#F46500",
  },
  Cancelled: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.CANCELLED],
    value: CHALLENGE_STATUS.CANCELLED,
    color: "#F46500",
  },
  PaymentFailed: {
    name: WORK_STATUS_MAP[CHALLENGE_STATUS.CANCELLED_PAYMENT_FAILED],
    value: CHALLENGE_STATUS.CANCELLED_PAYMENT_FAILED,
    color: "#F46500",
  },
};

export const WORK_TIMELINE = [
  {
    title: "SUBMITTED",
    color: "#12C188",
    name: "submitted",
    date: "created",
    active: (work) => {
      return work.status === WORK_STATUSES.Submitted.value;
    },
    completed: (work) => {
      const submitted =
        WORK_STATUS_ORDER[work.status] >
        WORK_STATUS_ORDER[WORK_STATUSES.Draft.value];
      return submitted;
    },
  },
  {
    name: "started",
    title: "STARTED",
    color: "#12C188",
    date: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Registration");
      return phase && workUtil.phaseStartDate(phase);
    },
    active: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Submission");
      const isPhaseOpen =
        phase && phase.isOpen && moment(workUtil.phaseEndDate(phase)).isAfter();
      return work.status === WORK_STATUSES.InProgress.value && isPhaseOpen;
    },
    completed: (work) => {
      const phase = work.phases.find((phase) => phase.name === "Submission");
      const isPhaseOpen =
        phase && moment(workUtil.phaseEndDate(phase)).isBefore();
      const didStart =
        WORK_STATUS_ORDER[work.status] >=
        WORK_STATUS_ORDER[WORK_STATUSES.InProgress.value];
      return isPhaseOpen && didStart;
    },
  },
  {
    name: "in-review",
    title: "IN REVIEW",
    color: "#12C188",
    date: (work) => {
      let phase = work.phases.find((phase) => phase.name === "Approval");

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Review");
      }

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Appeals");
      }

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Appeals Response");
      }
      return workUtil.phaseEndDate(phase);
    },
    active: (work) => {
      const reviewPhases = _.filter(work.phases, (p) =>
        _.includes(
          ["Approval", "Screening", "Review", "Appeals", "Appeals Response"],
          p.name
        )
      );
      return (
        work.status === WORK_STATUSES.InProgress.value &&
        _.filter(reviewPhases, (p) => p.isOpen).length > 0
      );
    },
    completed: (work) => {
      let phase = work.phases.find((phase) => phase.name === "Approval");

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Review");
      }

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Appeals Response");
      }
      const isPhaseClosed = moment(workUtil.phaseEndDate(phase)).isBefore();
      const didStart =
        WORK_STATUS_ORDER[work.status] >=
        WORK_STATUS_ORDER[WORK_STATUSES.InProgress.value];
      return isPhaseClosed && didStart;
    },
  },
  {
    name: "downloads-ready",
    title: "SOLUTIONS READY",
    color: "#2C95D7",
    date: (work) => {
      let phase = work.phases.find((phase) => phase.name === "Approval");

      if (!phase) {
        phase = work.phases.find((phase) => phase.name === "Appeals Response");
      }
      return phase && workUtil.phaseEndDate(phase);
    },
    active: (work) => {
      const active =
        WORK_STATUS_ORDER[work.status] >=
        WORK_STATUS_ORDER[WORK_STATUSES.Completed.value];

      const customerFeedbacked =
        work.metadata &&
        work.metadata.find((item) => item.name === "customerFeedback");

      return active && !customerFeedbacked;
    },
    completed: (work) => {
      let phase = work.phases.find((phase) => phase.name === "Approval");

      const customerFeedbacked =
        work.metadata &&
        work.metadata.find((item) => item.name === "customerFeedback");

      const isReviewPhaseEnded =
        phase &&
        (moment(workUtil.phaseEndDate(phase)).isBefore() ||
          !customerFeedbacked);

      return (
        isReviewPhaseEnded && work.status === WORK_STATUSES.Completed.value
      );
    },
  },
  {
    name: "mark-as-done",
    title: "DONE",
    color: "#555555",
    date: (work) => {
      if (work.status === WORK_STATUSES.Completed.value) {
        return work.updated;
      }
    },
    active: (work) => {
      const active =
        WORK_STATUS_ORDER[work.status] >=
        WORK_STATUS_ORDER[WORK_STATUSES.Completed.value];

      const customerFeedbacked =
        work.metadata &&
        work.metadata.find((item) => item.name === "customerFeedback");

      return active && customerFeedbacked;
    },
    completed: (work) => {
      const customerFeedbacked =
        work.metadata &&
        work.metadata.find((item) => item.name === "customerFeedback");
      return (
        work.status === WORK_STATUSES.Completed.value && customerFeedbacked
      );
    },
    hidden: (work) => {
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
    title: "REDIRECTED",
    color: "#F46500",
    date: (work) => {
      if (work.status === WORK_STATUSES.DirectedToSales.value) {
        return work.updated;
      }
      if (work.status === WORK_STATUSES.PaymentFailed.value) {
        return work.updated;
      }
      if (work.status === WORK_STATUSES.Cancelled.value) {
        return work.updated;
      }
    },
    completed: true,
    hidden: (work) => {
      return (
        work.status !== WORK_STATUSES.DirectedToSales.value &&
        work.status !== WORK_STATUSES.Cancelled.value &&
        work.status !== WORK_STATUSES.PaymentFailed.value
      );
    },
  },
];

export const SURVEY_QUESTIONS = [
  {
    name: "How happy are you with the quality of work?",
    value: 0,
  },
  {
    name: "How easy was it to get the results you wanted?",
    value: 0,
  },
  {
    name: "How likely are you to recommend Topcoder?",
    value: 0,
  },
  {
    name: "What can we do to make your experience better?",
    value: "",
  },
];

export const COUNTRY_OPTIONS = countries.map((ct) => ({
  label: ct.name,
  value: ct.code,
}));
