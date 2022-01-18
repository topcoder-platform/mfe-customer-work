import React from "react";
import cn from "classnames";
import PT from "prop-types";
import "./styles.module.scss";

const Layout = ({ sidebar, PageComponent, ...routeProps }) => {
  return (
    <div styleName="layout">
      <aside styleName="aside">{sidebar}</aside>
      <main styleName="main">
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
