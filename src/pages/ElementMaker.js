import React from "react";

function ElementMaker(props) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
          />
        ) : (
          <h1
            onDoubleClick={props.handleDoubleClick}
            style={{
                display: "inline-block",
                height: "25px",
                minWidth: "300px",
            }}
          >
            {props.value}
          </h1>
        )
      }
    </span>
  );
}

export default ElementMaker;