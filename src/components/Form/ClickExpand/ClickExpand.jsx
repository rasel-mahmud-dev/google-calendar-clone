import React, {useEffect, useRef, useState} from 'react';

import "./style.scss"

const ClickExpand = ({label, children}) => {

    const [isExpand, setExpand] = useState(false)

    const contentRef = useRef()

    const [contentHeight, setContextHeight] = useState(0)

    function onClick() {
        setExpand(!isExpand)
    }



    return (
        <div className="w-full">
            <div>
                {label && label({onPress: onClick, isOpen: isExpand})}
            </div>
            <div className={`expand-able ${isExpand ? "expand-content" : "collapse-content"}`}>
                <div >

                    {children}
                </div>


            </div>
        </div>
    );
};

export default ClickExpand;