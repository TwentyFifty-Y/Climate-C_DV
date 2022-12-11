import React from 'react';
import v2 from "./visualisations/v2";
import V8 from "./visualisations/v8";
import V9 from "./visualisations/v9";

export default function View2() {
  return (
    <>
      <div className="container-view">
        <h1 className="title">Emission sources</h1>
        <div id="flex-container">
          {/* <div className="flex-item">
          <span>{v1()}</span>
        </div>  */}
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
