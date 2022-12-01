import React, { useState } from 'react';
import ElementMaker from "./ElementMaker";
import V2 from "./visualisations/v2";
import V3 from "./visualisations/v3";
import V5 from "./visualisations/v5";
import V6 from "./visualisations/v6";


export default function Custom() {
    const [title, setTitle] = useState("My Title (double-click me)");
    const [showInputEle, setShowInputEle] = useState([]); 
    const [open, setOpen] = useState(false);
    const [v12Open, setV12open] = useState(false);
    const [v34Open, setV34open] = useState(false);
    const [v5Open, setV5open] = useState(false);
    const [v6Open, setV6open] = useState(false);
    // const [vOpen, setVopen] = useState(false);
    

    // let list = [v2(), v3(), V5(), v6()];

  
    

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

  


  return (
    <div className="custom-container">
        <div className="title">
            <ElementMaker
                value={title}
                handleChange={(e) => setTitle(e.target.value)}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                showInputEle={showInputEle}
            />
        </div>
            <div className="dropdown">
      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
          <button onClick={handleMenuOne}>v1-2</button>
          </li>
          <li className="menu-item">
          <button onClick={handleMenuTwo}>v3-4</button>
          </li>
          <li className="menu-item">
          <button onClick={handleMenuThree}>v5</button>
          </li>
          <li className="menu-item">
          <button onClick={handleMenuFour}>v6</button>
          </li>
        </ul>
      ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
      <div>
          {v12Open ? (
              <div className="flex-item">
              <V2/>
              </div>
            ): null}
            </div>
    </div>
    <div>
          {v34Open ? (
              <div className="flex-item">
              <V3/>
              </div>
            ): null}
            </div>
            <div>
          {v5Open ? (
              <div className="flex-item">
              <V5/>
              </div>
            ): null}
            </div>
             <div>
          {v6Open ? (
              <div className="flex-item">
              <V6/>
              </div>
            ): null}
            </div>
    
    
    </div>
  )

}
