/**
 * Tab element
 */
import PageRow from "components/PageElements/PageRow";
import PT from "prop-types";
import React from "react";
import HintIcon from "../../assets/images/icon-hint.svg";
import "./styles.module.scss";

const ServicePrice = ({ serviceType, price }) => {
  return (
    <div>
      <PageRow>
        <div>
          <p styleName="serviceTitle">{serviceType}</p>
          <div styleName="servicePrice">
            PRICE: ${price}
            <HintIcon />
          </div>
        </div>
      </PageRow>
    </div>
  );
};

ServicePrice.defaultProps = {
  price: 0,
};

ServicePrice.propTypes = {
  price: PT.number,
};

export default ServicePrice;
