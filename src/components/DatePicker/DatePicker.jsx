import React, {useEffect, useRef, useState} from 'react';
import Dropdown from "../Dropdown/Dropdown";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import dayjs from "dayjs";



const DatePicker = ({isOpen, value, onOpen, onClose, onChange}) => {

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
        // let isDate = typeof(date) === "object" &&  date instanceof Date
        //
        // if(isDate){
        //     dateTime.setDate(date.getDate())
        //     dateTime.setMonth(date.getMonth())
        //     dateTime.setFullYear(date.getFullYear())
        // } else {
        //     notification.error({
        //         message: "Invalid Date"
        //     })
        // }
        //
        // // update date
        // setDateTime(dateTime)
        onClose && onClose()
    }



    return (
        <div>
            <li className="relative cursor-pointer mui-select"  tabIndex="-1" aria-hidden={true}>
                <Dropdown isOpen={isOpen} render={() => (
                    <div className="overflow-auto w-full calendar-dropdown">
                        <SmallCalendar
                            prevAriaLabel=""
                            onChange={handleChangeDate}
                            value={value}
                        />
                    </div>
                )}/>
                <div
                    className="font-medium text-gray-600 hover:bg-gray-100 cursor-pointer py-2  rounded relative "
                    onClick={handleToggle}>
                    <span className="px-2">{dayjs(value).format("MMMM")}</span>
                    <div className={`input-border ${active ? "input-border-active" : "input-border-inactive"} `}></div>
                </div>
            </li>
        </div>
    );
};

export default DatePicker;
