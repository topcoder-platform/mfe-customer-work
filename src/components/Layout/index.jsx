import React from "react";
import PT from "prop-types";

import "./styles.module.scss";

/**
 * Block Layout
 */
const Layout = ({ PageComponent, ...routeProps }) => {
  
  return (
    <div styleName="layout">
      <main className="main">
        <PageComponent {...routeProps} />
      </main>
    </div>
  );
};

Layout.propTypes = {
  PageComponent: PT.func,
  path: PT.string,
};

export default Layout;
