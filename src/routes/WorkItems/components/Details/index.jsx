/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReviewTable from "../../../Review/components/ReviewTable";

import "./styles.module.scss";
import _ from "lodash";
import { OrderContractModal, PrivacyPolicyModal, TermsModal } from "../../../../../src-ts";

const Details = ({ formData }) => {

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
        <ReviewTable
          formData={_.get(formData, "intake-form.form", {})}
          enableEdit={false}
          enableStepsToggle={false}
        />
      </div>

      <div styleName="invoiceWrapper">
        <h3>supporting information</h3>
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
