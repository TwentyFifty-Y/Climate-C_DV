import React from 'react';
import v2 from "./visualisations/v2";
import v3 from "./visualisations/v3";
import V5 from "./visualisations/v5";

export default function View1() {
  return (
    <div className="container-view">
      <h1 className="title">Atmospheric CO<span id="sub">2</span> and Emissions</h1>
      <div id="flex-container">
        <div className="flex-item">
          <span>{v2()}</span>
        </div>
        <div className="flex-item">
          <span>{v3()}</span>
        </div>
        <div className="flex-item">
          <span>{V5()}</span>
        </div>
      </div>
    </div>
  )
}
