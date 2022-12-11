import React from 'react';
import V8 from "./visualisations/v8";
import V9 from "./visualisations/v9";

export default function View2() {
  return (
    <>
      <div className="container-view">
        <h1 className="title">Emission sources</h1>
        <p>You may hide elements of the charts by clicking the color box or the title of the line. </p>
        <div id="flex-container">
          <div className="flex-item">
            {V8()}
          </div>
          <div className="flex-item">
            {V9()}
          </div>
        </div>
      </div>
    </>
  )
}
