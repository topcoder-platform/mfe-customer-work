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

const ServicePrice = ({
  stickerPrice,
  showIcon,
  icon,
  serviceType,
  price,
  duration = 1,
  hideTitle = false,
}) => {
  return (
    <div styleName="container">
      <PageRow styleName="inline">
        {showIcon && icon && <>{icon}</>}
        {showIcon && !icon && <WebsiteDesignIcon />}
        <div>
          {!hideTitle && <p styleName="serviceTitle">{serviceType}</p>}
          <div styleName="priceAndDuration">
            <div class="info">
              {stickerPrice && (
                <span styleName="stickerPrice">
                  {currencyFormat(stickerPrice)}
                </span>
              )}
              <span styleName="discount">{currencyFormat(price)}</span>
              <span styleName="separator" />
              <span>{duration}&nbsp;Days</span>
              <div styleName="filler" />
            </div>
            <HelpIcon>
              The price and project length is dynamic and dependant on the
              variables selected as you define your work.
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
