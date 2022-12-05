import React from 'react';
import v1 from "./visualisations/v1";
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
            <span>{V8()}</span>
          </div>
          <div className="flex-item">
            <span>{V9()}</span>
          </div>
        </div>
      </div>

    </>
  )
}
