import React, { useState } from 'react';
import ElementMaker from "./ElementMaker";
import V2 from "./visualisations/v2";
import V3 from "./visualisations/v3";
import V5 from "./visualisations/v5";
import V6 from "./visualisations/v6";
import V8 from "./visualisations/v8";

import Modal from "./components/CustomizerModal";


export default function Custom() {
  const [title, setTitle] = useState("My Title (double-click me)");
  const [showInputEle, setShowInputEle] = useState([]);
  const [open, setOpen] = useState(false);
  const [v12Open, setV12open] = useState(false);
  const [v34Open, setV34open] = useState(false);
  const [v5Open, setV5open] = useState(false);
  const [v6Open, setV6open] = useState(false);
  const [v8Open, setV8Open] = useState(false);
  // const [vOpen, setVopen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }



  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setV12open(!v12Open);

    setOpen(false);
  };

  const handleMenuTwo = () => {
    setV34open(!v34Open);
    setOpen(false);
  };

  const handleMenuThree = () => {
    setV5open(!v5Open);
    setOpen(false);
  }

  const handleMenuFour = () => {
    setV6open(!v6Open);
    setOpen(false);
  }

  const handleMenuFive = () => {
    setV8Open(!v8Open);
    setOpen(false);
  }


  return (
    <div className="custom-container">
      <h1 className="title">My custom views</h1>
      {/* <div className="title">
            <ElementMaker
                value={title}
                handleChange={(e) => setTitle(e.target.value)}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                showInputEle={showInputEle}
            />
        </div> */}
      <button onClick={toggleModal}>Show Modal</button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <div className="dropdown">
        <button onClick={handleOpen}>Select your charts!</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleMenuOne}>Global historical surface temperature anomalies from January 1850 onwards + Northern Hemisphere 2,000-year temperature reconstruction</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuTwo}>Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958 + Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurement</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuThree}>Vostok Ice Core CO2 measurements, 417160 - 2342 years</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuFour}>Ice core 800k year composite study CO2 measurements</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuFive}>Evolution of global temperature over the past two million years + CO2 emissions by country</button>
            </li>
          </ul>
        ) : null}
        {/* {open ? <div>Is Open</div> : <div>Is Closed</div>} */}
        <div>
          {v12Open ? (
            <div className="flex-item">
              <V2 />
            </div>
          ) : null}
        </div>
      </div>
      <div>
        {v34Open ? (
          <div className="flex-item">
            <V3 />
          </div>
        ) : null}
      </div>
      <div>
        {v5Open ? (
          <div className="flex-item">
            <V5 />
          </div>
        ) : null}
      </div>
      <div>
        {v6Open ? (
          <div className="flex-item">
            <V6 />
          </div>
        ) : null}
      </div>
      <div>
        {v8Open ? (
          <div className="flex-item">
            <V8 />
          </div>
        ) : null}
      </div>


    </div>
  )

}
