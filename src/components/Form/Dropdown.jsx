import React from 'react';
import {createPortal} from "react-dom";

function Dropdown(props) {
    const {position} = props
    return createPortal(
        <div>
            <div className="select-dropdown" style={{
                top: position.top + "px",
                left: position.left + "px",
                width: position.width + "px",
                display: position.display,
            }}>
                {props.children}
            </div>

        </div>, document.querySelector("#select-dropdown")
    )
}

export default Dropdown;