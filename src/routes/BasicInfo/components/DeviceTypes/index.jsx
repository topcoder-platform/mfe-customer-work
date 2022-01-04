/**
 * Tab element
 */
import classNames from "classnames";
import PT from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ComputerIconActive from "../../../../assets/images/icon-device-computer-active.svg";
import ComputerIcon from "../../../../assets/images/icon-device-computer.svg";
import PhoneIconActive from "../../../../assets/images/icon-device-phone-active.svg";
import PhoneIcon from "../../../../assets/images/icon-device-phone.svg";
import TabletIconActive from "../../../../assets/images/icon-device-tablet-active.svg";
import TabletIcon from "../../../../assets/images/icon-device-tablet.svg";
import "./styles.module.scss";

const DeviceTypes = ({ selectedOption, onSelect }) => {
  const types = [
    {
      title: "Computer",
      description: "(Included)",
      icon: <ComputerIcon />,
      iconActive: <ComputerIconActive />,
    },
    {
      title: "Tablet",
      description: "+$300",
      icon: <TabletIcon />,
      iconActive: <TabletIconActive />,
    },
    {
      title: "Phone",
      description: "+$500",
      icon: <PhoneIcon />,
      iconActive: <PhoneIconActive />,
    },
  ];

  return (
    <div styleName="device-types">
      {types.map((type, index) => {
        const isActive = index === selectedOption;
        return (
          <div
            styleName="device"
            key={uuidv4()}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(index, type.title)}
          >
            <div
              styleName={classNames("iconWrapper", isActive ? "active" : null)}
            >
              {isActive ? type.iconActive : type.icon}
            </div>
            <div styleName="title">{type.title}</div>
            <div styleName="subTitle">{type.description}</div>
          </div>
        );
      })}
    </div>
  );
};

DeviceTypes.defaultProps = {
  selectedOption: 0,
};

DeviceTypes.propTypes = {
  selectedOption: PT.number,
  onSelect: PT.func,
};

export default DeviceTypes;
