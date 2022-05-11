/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PageDivider from "components/PageDivider";
import ReviewTable from "../../../Review/components/ReviewTable";
import config from "../../../../../config";
import ArrowRightIcon from "../../../../assets/images/arrow-right.svg";

import "./styles.module.scss";
import _ from "lodash";
import { OrderContractModal, PrivacyPolicyModal, TermsModal } from "../../../../../src-ts/lib";

const Details = ({ challenge, formData }) => {
  const [isOrderContractModalOpen, setIsOrderContractModalOpen] =
    useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false);
  const [isTermsModalOpne, setIsTermsModalOpen] = useState(false);

  return (
    <div styleName="details">
      <OrderContractModal isOpen={isOrderContractModalOpen} onClose={() => setIsOrderContractModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyModalOpen} onClose={() => setIsPrivacyPolicyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpne} onClose={() => setIsTermsModalOpen(false)} />
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
          role="button"
          tabIndex={0}
          onClick={() => setIsOrderContractModalOpen(true)}
          rel="noopener noreferrer"
        >
          ORDER CONTRACT
        </a>
        <a
          styleName="link"
          role="button"
          tabIndex={0}
          onClick={() => setIsPrivacyPolicyModalOpen(true)}
          rel="noopener noreferrer"
        >
          PRIVACY POLICY
        </a>
        <a
          styleName="link"
          role="button"
          tabIndex={0}
          onClick={() => setIsTermsModalOpen(true)}
          rel="noopener noreferrer"
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
