import React, { useEffect, useRef } from "react";
import PT from "prop-types";
import { useTargetSize } from "utils/hooks/useTargetSize";

import "./styles.module.scss";

/**
 * Block Layout
 */
const Layout = ({ sidebar, PageComponent, ...routeProps }) => {
  const [size, mainRef] = useTargetSize();
  const asideRef = useRef();
  const height = size && size.height;

  useEffect(() => {
    if (height) {
      asideRef.current.style.height = `${height}px`;
    }
  }, [height]);

  return (
    <div styleName="layout">
      <aside styleName="aside" ref={asideRef}>
        {sidebar}
      </aside>
      <main styleName="main" ref={mainRef}>
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
