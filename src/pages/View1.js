import React from 'react';
import v1 from "./visualisations/v1";
import v2 from "./visualisations/v2";

export default function View1() {
  return (
    <div className="container-view">
      <h1 className="title">Atmospheric CO<span id="sub">2</span> and Emissions</h1>
      <div id="flex-container">
        <div className="flex-item">
          <span>{v1()}</span>
        </div> 
        <div className="flex-item">
          <span>{v2()}</span>
        </div>
        <div className="flex-item">
          <span>{v2()}</span>
        </div> 
        <div className="flex-item">
          <span>{v1()}</span>
        </div>
      </div>
    </div>
  )
}
