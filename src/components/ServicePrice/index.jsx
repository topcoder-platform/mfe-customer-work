/**
 * Tab element
 */
import PageRow from "components/PageElements/PageRow";
import PT from "prop-types";
import React from "react";
import moment from "moment";
import "./styles.module.scss";
import WebsiteDesignIcon from "../../assets/images/website-design.svg";
import HelpIcon from "../HelpIcon";

const ServicePrice = ({ serviceType, price, durationInSec = 86400 }) => {
  return (
    <div styleName="container">
      <PageRow>
        <WebsiteDesignIcon />
        <div>
          <p styleName="serviceTitle">{serviceType}</p>
          <div styleName="priceAndDuradion">
            PRICE: ${price}
            <span styleName="separator" />
            {moment.utc(durationInSec * 1000).format("D")} Days
            <HelpIcon>
              The price and project length is dynamic and dependant on the
              variables selected as your define your work.
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
