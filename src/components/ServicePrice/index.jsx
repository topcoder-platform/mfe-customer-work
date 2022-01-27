/**
 * Tab element
 */
import PageRow from "components/PageElements/PageRow";
import PT from "prop-types";
import React from "react";
import "./styles.module.scss";
import WebsiteDesignIcon from "../../assets/images/website-design.svg";
import HelpIcon from "../HelpIcon";

const ServicePrice = ({ serviceType, price }) => {
  return (
    <div styleName="container">
      <PageRow>
        <WebsiteDesignIcon />
        <div>
          <p styleName="serviceTitle">{serviceType}</p>
          <div styleName="priceAndDuradion">
            PRICE: ${price}
            <span styleName="separator" />4 Days
            <HelpIcon>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque gravida nulla id malesuada viverra.
            </HelpIcon>
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
