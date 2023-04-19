import React from "react";

const AccordionItem = ({children, isOpen, header,...attr}) => {
    return (
        <div {...attr}>

            {header && header(isOpen)}

            {isOpen && children}


            {/*{children.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            {index === 0 && item}*/}
            {/*            {index === 1 && isOpen && item}*/}

            {/*        </>*/}
            {/*    )*/}
            {/*})}*/}

        </div>
    )
}


export default AccordionItem