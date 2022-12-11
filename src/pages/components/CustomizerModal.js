import React from 'react';
import { useState } from 'react';


export default function Modal({ showModal, setShowModal }) {

    const [views, setViews] = useState({
        v1: false,
        v3: false,
        v5: false,
        v6: false,
        v8: false,
        v9: false
    });

    const handleChange = e => {
        const checked = e.target.checked;

        const checkedValue = e.target.value;

        const checkedName = e.target.name;

        console.log(checked, checkedValue, checkedName);
        console.log(views)

        views[checkedName] = checked;
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
                                <form className="form-horizontal" action="">
                                    <div>
                                        <input type="checkbox" name="v1" id="v1" value="true" onChange={handleChange}  />
                                        <label htmlFor="v1">View 1-2</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v3" id="v3" value="true" onChange={handleChange}  />
                                        <label htmlFor="v3">View 3-4</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v5" id="v5" value="true" onChange={handleChange}  />
                                        <label htmlFor="v5">View 5</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v6" id="v6" value="true" onChange={handleChange}  />
                                        <label htmlFor="v6">View 6-7</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v8" id="v8" value="true" onChange={handleChange}  />
                                        <label htmlFor="v8">View 8</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="v9" id="v9" value="true" onChange={handleChange}  />
                                        <label htmlFor="v9">View 9</label>
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