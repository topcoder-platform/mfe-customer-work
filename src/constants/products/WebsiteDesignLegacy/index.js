export const BASE_PRODUCT_PRICE = 100;
export const STICKER_PRICE = 398;
export const PRIZES_PAYMENT_BREAKDOWN = [0.5, 0.2, 0.1];
export const REVIEWER_PAYMENT_BREAKDOWN = [0.1, 0.1];
export const DEFAULT_DURATION = "4-6";
export const PER_PAGE_COST = 99;

export const CHALLENGE_FIELD_VALUES = {
  trackId: "5fa04185-041f-49a6-bfd1-fe82533cd6c8",
  typeId: "927abff4-7af9-4145-8ba1-577c16e64e2e",
  timelineTemplateId: "918f6a3e-1a63-4680-8b5e-deb95b1411e7",
};

export const DEFAULT_TIMELINE = [
  {
    // Screening
    phaseId: "2d7d3d85-0b29-4989-b3b4-be7f2b1d0aa6",
    duration: 14400,
  },
  {
    // Review
    phaseId: "aa5a3f78-79e0-4bf7-93ff-b11e8f5b398b",
    duration: 144000,
  },
  {
    // Approval
    phaseId: "ad985cff-ad3e-44de-b54e-3992505ba0ae",
    duration: 14400,
  },
];

export const DEVICE_TYPE_DETAILS = {
  computer: "Default screen 1366px width, 768px height",
  tablet: "Default screen (vertical) 810px height, 1080px width",
  phone: "Default screen 375px width, 812px height",
};

export const DURATION_MAPPING = [
  [
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 1 device
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 2 devices
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 3 devices
  ], // 1 page

  [
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 1 device
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 2 devices
    {
      submissionDuration: 2,
      totalDuration: 4,
    }, // 3 devices
  ], // 2 pages

  [
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 1 device
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 2 devices
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 3 devices
  ], // 3 pages

  [
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 1 device
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 2 devices
    {
      submissionDuration: 4,
      totalDuration: 6,
    }, // 3 devices
  ], // 4 pages

  [
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 1 device
    {
      submissionDuration: 3,
      totalDuration: 5,
    }, // 2 devices
    {
      submissionDuration: 4,
      totalDuration: 6,
    }, // 3 devices
  ], // 5 pages
];

export const INTAKE_FORM_ROUTES = [
  "/self-service/wizard",
  "/self-service/work/new/website-design/basic-info",
  "/self-service/work/new/website-design/website-purpose",
  "/self-service/work/new/website-design/page-details",
  "/self-service/work/new/website-design/login-prompt",
  "/self-service/work/new/website-design/branding",
  "/self-service/work/new/website-design/review",
  "/self-service/work/new/website-design/thank-you",
];

export const PROGRESS_LEVELS = [
  {
    label: "Basic Info",
    url: "/self-service/work/new/website-design/basic-info",
    trueIndex: 2,
    showIndex: 1,
    visibleInProgressIndicator: true,
  },
  {
    label: "REVIEW REQUIREMENTS",
    url: "/self-service/work/new/website-design/basic-info",
    trueIndex: 2,
    showIndex: 1,
  },
  {
    label: "Website Purpose",
    url: "/self-service/work/new/website-design/website-purpose",
    trueIndex: 3,
    showIndex: 2,
    visibleInProgressIndicator: true,
  },
  {
    label: "Page Details",
    url: "/self-service/work/new/website-design/page-details",
    trueIndex: 4,
    showIndex: 3,
    visibleInProgressIndicator: true,
  },
  {
    label: "Branding",
    url: "/self-service/work/new/website-design/branding",
    trueIndex: 5,
    showIndex: 4,
    visibleInProgressIndicator: true,
  },
  {
    label: "Review",
    url: "/self-service/work/new/website-design/review",
    trueIndex: 6,
    showIndex: 5,
    visibleInProgressIndicator: true,
  },
];
