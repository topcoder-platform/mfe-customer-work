import React from "react";
import PageDivider from "components/PageDivider";
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
        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.TOPCODER_COMMUNITY_WEBSITE_URL}/challenges/${challenge?.id}`}
        >
          ORDER CONTRACT
        </a>
        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.TERMS_URL}`}
        >
          PRIVACY POLICY
        </a>
        <a
          styleName="link"
          target="_blank"
          rel="noopener noreferrer"
          href={`${config.PRIVACY_POLICY_URL}`}
        >
          TERMS
        </a>
      </div>
    </div>
  );
};

Details.defaultProps = {};
Details.propTypes = {};

export default Details;
