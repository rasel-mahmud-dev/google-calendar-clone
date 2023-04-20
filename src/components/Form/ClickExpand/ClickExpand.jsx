import React, {useEffect, useRef, useState} from 'react';

import "./style.scss"

const ClickExpand = ({label, initialOpen = false, children}) => {

    const [isExpand, setExpand] = useState(false)

    useEffect(() => {
        if (initialOpen) {
            setExpand(true)
        }
    }, [initialOpen])


    function onClick() {
        setExpand(!isExpand)
    }


    return (
        <div className="w-full">
            <div>
                {label && label({onPress: onClick, isOpen: isExpand})}
            </div>
            <div className={`expand-able ${isExpand ? "expand-content" : "collapse-content"}`}>
                <div>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default ClickExpand;