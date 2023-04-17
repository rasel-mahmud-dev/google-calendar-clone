import React, {useEffect, useRef, useState} from 'react';

import "./style.scss"

const ClickExpand = ({label, children}) => {

    const [isExpand, setExpand] = useState(false)

    const contentRef = useRef()

    const [contentHeight, setContextHeight] = useState(0)

    function onClick() {
        if (!isExpand) {
            getContentHeight()
        }
        setExpand(!isExpand)

    }

    function getContentHeight() {
        console.dir(contentRef.current)
        if (contentRef.current) {
            let h = contentRef.current.offsetHeight
            setContextHeight(h)
        }
    }

    useEffect(() => {

        getContentHeight()


    }, [contentRef])

    const child =

        console.log(contentHeight, isExpand)

    return (
        <div className="w-full">
            <div>
                {label && label(onClick)}
            </div>
            <div className={`expand-able ${isExpand ? "expand-content" : "collapse-content"}`}
                 style={{height: isExpand ? contentHeight : 0 + "px"}}>
                <div ref={contentRef}>

                    {children}
                </div>


            </div>
        </div>
    );
};

export default ClickExpand;