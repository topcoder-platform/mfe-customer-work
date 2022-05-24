import React from "react";
import { Link } from "@reach/router";
import "./style.scss";

function BreadcrumbItem({ url, name, index }) {
  return (
    <li key={index}>
      <Link to={url}> {name} </Link>
    </li>
  );
}

const Breadcrumb = ({ breadcrumbItems }) => {
  return (
    <nav className="breadcrumb">
      <ol>
        {breadcrumbItems.map((item, index, array) => (
          <BreadcrumbItem {...item} index={index + 1} key={index} />
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
