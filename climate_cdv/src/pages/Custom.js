import React, { useState } from 'react';
import ElementMaker from "./ElementMaker";

export default function Custom() {
    const [title, setTitle] = useState("My Title (double-click me)");
    const [showInputEle, setShowInputEle] = useState(1); 

  return (
    <div>
        <div className="title">
            <ElementMaker
                value={title}
                handleChange={(e) => setTitle(e.target.value)}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(1)}
                showInputEle={showInputEle}
            />
        </div>
    </div>
  )
}
