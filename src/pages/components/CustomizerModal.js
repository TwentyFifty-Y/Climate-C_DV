import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';

export default function Modal({ showModal, setShowModal, userId, customViewsArray }) {

    const [views, setViews] = useState({
        v1: false,
        v3: false,
        v5: false,
        v6: false,
        v8: false,
        v9: false
    });

    const [viewTitle, setViewTitle] = useState("");
    const [viewDescription, setViewDescription] = useState("");

    const LINK = "//express.twentyfifty-y.com"

    const handleChange = e => {
        const checked = e.target.checked;

        const checkedName = e.target.name;

        console.log(views)

        views[checkedName] = checked;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setShowModal(prev => !prev);
        const json = {
            viewId: uniqid(),
            viewName: viewTitle,
            viewDescription: viewDescription,
            views: views
        }
        // push json into customViewsArray
        customViewsArray.push(json);
        axios.post(LINK + '/custom-views', {
            id: userId,
            json: JSON.stringify(customViewsArray)
        }).then(() => {
            //reload page   
            window.location.reload(false);
        })      
    }

    return (
        <div>
            {showModal ?
                <>
                    <div className="modal-background">
                        <div className="modal-container">
                            <div className="modal-header">
                                <h2>Create your own view</h2>
                                <button className="close" onClick={() => setShowModal(prev => !prev)}>X</button>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <div>
                                        <input type="text" placeholder="View Title" onChange={e => setViewTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="View Description" onChange={e => setViewDescription(e.target.value)}/>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v1" id="v1" value="true" onChange={handleChange} />
                                        <label htmlFor="v1"> Global historical surface temperature anomalies from January 1850 onwards</label>
                                        <label htmlFor="v1">  + Northern Hemisphere 2,000-year temperature reconstruction </label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v3" id="v3" value="true" onChange={handleChange} />
                                        <label htmlFor="v3">Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</label>
                                        <label htmlFor="v3">+ Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v5" id="v5" value="true" onChange={handleChange} />
                                        <label htmlFor="v5">Vostok Ice Core CO2 measurements, 417160 - 2342 year</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v6" id="v6" value="true" onChange={handleChange} />
                                        <label htmlFor="v6">Ice core 800k year composite study CO2 measurement</label>
                                        <label htmlFor="v6">+ Evolution of global temperature over the past two million years</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v8" id="v8" value="true" onChange={handleChange} />
                                        <label htmlFor="v8">CO2 emissions by country</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v9" id="v9" value="true" onChange={handleChange} />
                                        <label htmlFor="v9">CO2 emissions by sectors</label>
                                    </div>
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </> : null}
        </div>
    )
}