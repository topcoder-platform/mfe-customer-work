import React, { useEffect, useRef } from "react";
import PT from "prop-types";
import { useTargetSize } from "utils/hooks/useTargetSize";

import "./styles.module.scss";

/**
 * Block Layout
 */
const Layout = ({ sidebar, PageComponent, ...routeProps }) => {
  return (
    <div styleName="layout">
      <main>
        <PageComponent {...routeProps} />
      </main>
    </div>
  );
};

Layout.propTypes = {
  sidebar: PT.node,
  PageComponent: PT.func,
  path: PT.string,
};

export default Layout;
