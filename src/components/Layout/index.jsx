import React from "react";
import PT from "prop-types";

import "./styles.module.scss";

/**
 * Block Layout
 */
const Layout = ({ sidebar, PageComponent, ...routeProps }) => {
  
  return (
    <div styleName="layout">
      <main className="main">
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
