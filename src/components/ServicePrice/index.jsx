/**
 * Tab element
 */
import PageRow from "components/PageElements/PageRow";
import PT from "prop-types";
import React from "react";
import "./styles.module.scss";
import WebsiteDesignIcon from "../../assets/images/website-design.svg";
import HelpIcon from "../HelpIcon";
import { currencyFormat } from "utils/";

const ServicePrice = ({ stickerPrice, serviceType, price, duration = 1 }) => {
  return (
    <div styleName="container">
      <PageRow>
        <WebsiteDesignIcon />
        <div>
          <p styleName="serviceTitle">{serviceType}</p>
          <div styleName="priceAndDuration">
            {stickerPrice && (
              <span styleName="stickerPrice">
                {currencyFormat(stickerPrice)}
              </span>
            )}
            <span styleName="discount">
              {currencyFormat(price)} through February
            </span>
            <span styleName="separator" />
            {duration} Days
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
