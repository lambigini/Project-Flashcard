import React from "react";

function Breadcrumb({ url, object, text }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {object && (
          <li className="breadcrumb-item">
            <a href={`${url}`}> {object.name} </a>
          </li>
        )}

        <li className="breadcrumb-item active" aria-current="page">
          {text}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
