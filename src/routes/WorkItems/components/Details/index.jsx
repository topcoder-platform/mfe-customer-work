/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PageDivider from "components/PageDivider";
import ReviewTable from "../../../Review/components/ReviewTable";
import config from "../../../../../config";
import ArrowRightIcon from "../../../../assets/images/arrow-right.svg";

import "./styles.module.scss";
import _ from "lodash";
import Modal from "components/Modal";
import OrderContract from "components/Modal/OrderContract";
import PrivacyPolicyModal from "components/Modal/PrivacyPolicyModal";
import TermsModal from "components/Modal/TermsModal";

const Details = ({ challenge, formData }) => {
  const [isOrderContractModalOpen, setIsOrderContractModalOpen] =
    useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false);
  const [isTermsModalOpne, setIsTermsModalOpen] = useState(false);

  return (
    <div styleName="details">
      <Modal
        fullWidth
        show={isOrderContractModalOpen}
        styleName="link"
        handleClose={() => setIsOrderContractModalOpen(false)}
      >
        <OrderContract />
      </Modal>
      <Modal
        fullWidth
        show={isPrivacyPolicyModalOpen}
        styleName="link"
        handleClose={() => setIsPrivacyPolicyModalOpen(false)}
      >
        <PrivacyPolicyModal />
      </Modal>
      <Modal
        fullWidth
        show={isTermsModalOpne}
        styleName="link"
        handleClose={() => setIsTermsModalOpen(false)}
      >
        <TermsModal />
      </Modal>
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
