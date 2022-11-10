import React from 'react';
import v1 from "./v1";
import v2 from "./v2";


export default function View1() {
  return (
    <div className="container-view">
        <h1>Table1</h1>
        <div is="row">
          <div className="column">
            <span>{v1()}</span>
          </div> 
          <div className="column">
            <span>{v2()}</span>
            </div>
        </div>
    </div>

  )
}
