import React from 'react';
import AccordionItem from "./AccordionItem";
import "./accordion.scss";

const Accordion = ({openIds=[], className = "", children, ...attr}) => {


    function isOpen(dataId) {
        return openIds?.includes(dataId)
    }


    // props children manipulation
    return (
        <div className={`accordion ${className}`} {...attr}>
            {children.map(accordionItem => React.cloneElement(accordionItem,
                {
                    ...accordionItem.props.children,
                    isOpen: isOpen(accordionItem.props.dataId),
                    className: `accordion-item ${accordionItem.props.className}`
                })
            )}
        </div>
    );
};

Accordion.Item = AccordionItem

export default Accordion;



/*** uses
 <Accordion openIds={[]}>
     <Accordion.Item dataId={number | string}>
         First element Item head
         Second element Accordion content
     </Accordion.Item>
 </Accordion>
 * */