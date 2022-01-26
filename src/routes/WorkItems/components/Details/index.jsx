import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import PageDivider from "components/PageDivider";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";
import ReviewTable from "../../../Review/components/ReviewTable";
import config from "../../../../../config";
import ArrowRightIcon from "../../../../assets/images/arrow-right.svg";

import "./styles.module.scss";
import _ from "lodash";

const Details = ({ challenge, formData }) => {
  return (
    <div styleName="details">
      <div styleName="reviewTable">
        <PageDivider />
        <ReviewTable
          formData={_.get(formData, "intake-form.form", {})}
          enableEdit={false}
        />
      </div>

      <div styleName="invoiceWrapper">
        <Button size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.SECONDARY}>
          DOWNLOAD INVOICE
        </Button>
        <PageDivider />

        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.TOPCODER_COMMUNITY_WEBSITE_URL}/challenges/${challenge?.id}`}
        >
          WORK CONTRACT
          <ArrowRightIcon />
        </a>
        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.TERMS_URL}`}
        >
          PRIVACY POLICY
          <ArrowRightIcon />
        </a>
        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.PRIVACY_POLICY_URL}`}
        >
          TERMS
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

Details.defaultProps = {};
Details.propTypes = {};

export default Details;
