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

export const BASE_PRODUCT_PRICE = 100;
export const STICKER_PRICE = 398;
export const PRIZES_PAYMENT_BREAKDOWN = [0.5, 0.2, 0.1];
export const REVIEWER_PAYMENT_BREAKDOWN = [0.1, 0.1];
export const DEFAULT_DURATION = '4-6';
export const PER_PAGE_COST = 99;

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
