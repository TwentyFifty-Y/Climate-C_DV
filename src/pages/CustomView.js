import React from 'react';
import { useLocation } from 'react-router-dom';
import v2 from "./visualisations/v2";
import v3 from "./visualisations/v3";
import V5 from "./visualisations/v5";
import v6 from "./visualisations/v6";
import V8 from "./visualisations/v8";
import V9 from "./visualisations/v9";

export default function CustomView() {
    const view = useLocation().state;
    console.log(view)
    return (
        <div className="container-view">
            <h1 className="title">{view.viewName}</h1>
            <p>{view.viewDescription}</p>
            <div id="flex-container">
                {view.views.v1 ? <div className="flex-item">{v2()}</div> : null}
                {view.views.v3 ? <div className="flex-item">{v3()}</div> : null}
                {view.views.v5 ? <div className="flex-item">{V5()}</div> : null}
                {view.views.v6 ? <div className="flex-item">{v6()}</div> : null}
                {view.views.v8 ? <div className="flex-item">{V8()}</div> : null}
                {view.views.v9 ? <div className="flex-item">{V9()}</div> : null}

            </div>
        </div>
    )
}