import React, {useEffect, useRef, useState} from 'react';
import Dropdown from "../Dropdown/Dropdown";


import moment from "moment/moment";
import SmallCalendar from "../SmallCalendar/SmallCalendar";

const DatePicker = ({isOpen, onOpen, onClose, dateTime, setDateTime, dropdownClass = "", tileDisabled}) => {

    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(isOpen)
    }, [isOpen])

    function handleToggle() {
        if (isOpen) {
            onClose()
        } else {
            onOpen()
        }
    }

    function handleChangeDate(date){
        let isDate = typeof(date) === "object" &&  date instanceof Date

        if(isDate){
            dateTime.setDate(date.getDate())
            dateTime.setMonth(date.getMonth())
            dateTime.setFullYear(date.getFullYear())
        } else {

        }

        // update date
        setDateTime(dateTime)
        onClose && onClose()
    }



    return (
        <div>
            <li className="relative cursor-pointer mui-select"  tabIndex="-1" aria-hidden={true}>
                <Dropdown className={dropdownClass} isOpen={isOpen} render={() => (
                    <div className="overflow-auto w-full react-calendar-update">

                        <SmallCalendar onChange={handleChangeDate} value={dateTime} />

                        {/*<RCCalendar*/}
                        {/*    prevAriaLabel=""*/}
                        {/*    onChange={handleChangeDate}*/}
                        {/*    value={dateTime}*/}
                        {/*    tileDisabled={tileDisabled ? tileDisabled : false}*/}
                        {/*/>*/}
                    </div>
                )}/>
                <div
                    className="font-medium text-gray-600 hover:bg-gray-100 cursor-pointer py-2  rounded relative "
                    onClick={handleToggle}>
                    <span className="px-2 mui-select-item">{moment(dateTime).format("LL")}</span>
                    <div className={`input-border ${active ? "input-border-active" : "input-border-inactive"} `}></div>
                </div>
            </li>
        </div>
    );
};

export default DatePicker;
