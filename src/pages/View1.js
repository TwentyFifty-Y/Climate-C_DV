import React from 'react';
import v2 from "./visualisations/v2";
import v3 from "./visualisations/v3";
import V5 from "./visualisations/v5";
import v6 from "./visualisations/v6";

export default function View1() {
  return (
    <div className="container-view">
      <h1 className="title">Atmospheric CO<span id="sub">2</span> and Emissions</h1>
      <p>You may hide elements of the charts by clicking the color box or the title of the line. </p>
      <div id="flex-container">
        <div className="flex-item">
          {v2()}
        </div>
        <div className="flex-item">
          {v3()}
        </div>
        <div className="flex-item">
          {V5()}
        </div>
        <div className="flex-item">
          {v6()}
        </div>
      </div>
    </div>
  )
}
