import { WorkPrices, WorkType } from '../../src-ts'
import {
  PER_PAGE_COST,
  PRIZES_PAYMENT_BREAKDOWN,
  REVIEWER_PAYMENT_BREAKDOWN,
  DURATION_MAPPING,
} from "constants/";
import * as dataExplorationConfigs from "constants/products/DataExploration";
import * as findMeDataConfigs from "constants/products/FindMeData";
import _ from "lodash";

/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo(0, 0);
}

/**
 * Function used to sort objects that have "sortOrder" values.
 *
 * @param {Object} objA object A
 * @param {number} objA.sortOrder object A sort order
 * @param {Object} objB object B
 * @param {number} objB.sortOrder object B sort order
 * @returns {number}
 */
export function sortBySortOrder(objA, objB) {
  return objA.sortOrder - objB.sortOrder;
}

export function triggerDownload(fileName, blob) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}

/**
 * Pad a number with leading zeros.
 */
export function padStart(target, targetLength = 2) {
  if (target === 0) {
    return target;
  }

  return String.prototype.padStart.call(target, targetLength, "0");
}

export function getDataExplorationPriceAndTimelineEstimate() {
  const priceConfig = WorkPrices[WorkType.data]
  const total = priceConfig.getPrice(priceConfig);
  return {
    total,
    stickerPrice: priceConfig.base,
    submissionDuration: 3,
    totalDuration: dataExplorationConfigs.DEFAULT_DURATION,
    prizeSets: [
      {
        prizes: [
          ..._.map(dataExplorationConfigs.PRIZES_PAYMENT_BREAKDOWN, (p) => ({
            type: "USD",
            value: _.round(p * total),
          })),
        ],
        description: "Challenge Prizes",
        type: "placement",
      },
      {
        prizes: [
          ..._.map(dataExplorationConfigs.REVIEWER_PAYMENT_BREAKDOWN, (p) => ({
            type: "USD",
            value: _.round(p * total),
          })),
        ],
        description: "Reviewer Payment",
        type: "reviewer",
      },
    ],
  };
}

export function getFindMeDataPriceAndTimelineEstimate() {

  const priceConfig = WorkPrices[WorkType.findData]
  const total = priceConfig.getPrice(priceConfig);
  const placementPercentages = priceConfig.usePromo
    ? findMeDataConfigs.PROMOTIONAL_PRIZES_PAYMENT_BREAKDOWN
    : findMeDataConfigs.BASE_PRIZES_PAYMENT_BREAKDOWN;
  const reviewerPercentages = priceConfig.usePromo
    ? findMeDataConfigs.PROMOTIONAL_REVIEWER_PAYMENT_BREAKDOWN
    : findMeDataConfigs.BASE_REVIEWER_PAYMENT_BREAKDOWN;

  return {
    total,
    stickerPrice: priceConfig.base,
    submissionDuration: 3,
    totalDuration: findMeDataConfigs.DEFAULT_DURATION,
    prizeSets: [
      {
        prizes: placementPercentages.map((percentage) => ({
          type: "USD",
          value: _.round(percentage * total),
        })),
        description: "Challenge Prizes",
        type: "placement",
      },
      {
        prizes: reviewerPercentages.map((percentage) => ({
          type: "USD",
          value: _.round(percentage * total),
        })),
        description: "Reviewer Payment",
        type: "reviewer",
      },
    ],
  };
}

export function getDynamicPriceAndTimelineEstimate(formData) {
  const numOfPages = _.get(formData, "form.pageDetails.pages.length", 1);
  const numOfDevices = _.get(
    formData,
    "form.basicInfo.selectedDevice.option.length",
    1
  );
  return getDynamicPriceAndTimeline(numOfPages || 1, numOfDevices || 1);
}

/**
 * Get dynamic price
 * @param {Number} pages the number of pages
 * @param {Number} devices the number of devices
 */
export function getDynamicPriceAndTimeline(pages, devices) {

  const priceConfig = WorkPrices[WorkType.design]
  const total = priceConfig.getPrice(priceConfig, pages, devices);

  const pricing = {
    total,
    stickerPrice: total * 2,
    ...DURATION_MAPPING[pages - 1][devices - 1],
    costPerAdditionalPage: devices * PER_PAGE_COST,
    prizeSets: [
      {
        prizes: [
          ..._.map(PRIZES_PAYMENT_BREAKDOWN, (p) => ({
            type: "USD",
            value: _.round(p * total),
          })),
        ],
        description: "Challenge Prizes",
        type: "placement",
      },
      {
        prizes: [
          ..._.map(REVIEWER_PAYMENT_BREAKDOWN, (p) => ({
            type: "USD",
            value: _.round(p * total),
          })),
        ],
        description: "Reviewer Payment",
        type: "reviewer",
      },
    ],
  };

  return pricing;
}

/**
 * Format number to currency
 * @param {Number} num number
 * @returns the formated string
 */
export function currencyFormat(num) {
  return "$" + _.toString(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
