import React, {useContext, useEffect} from 'react';
import {plus} from "../icons/plus";
import CalendarContext from "../context/CalendarContext";
import {BiCaretDown} from "react-icons/all";
import SmallCalendar from "../components/SmallCalendar/SmallCalendar";
import BigCalendar from "../components/BigCalendar/BigCalendar";
import dayjs from "dayjs";


const Calendar = () => {

    const {selectedDate, setMonthIndex} = useContext(CalendarContext)

    useEffect(()=>{
        let currentMonthIndex = dayjs().month()
        setMonthIndex(currentMonthIndex)

    }, [])


    return (
        <div className="my-container">

            <div className="flex ">
                <div className="sidebar">
                    <div className="calendar-page">
                        <button className="btn flex items-center rounded-full shadow-lg mt-4 add-new-btn">
                            <div dangerouslySetInnerHTML={{__html: plus}}></div>
                            <span className="mr-4 font-medium text-sm">Create</span>
                            <BiCaretDown />
                        </button>
                    </div>

                    <SmallCalendar />
                </div>
                <div className="border-l w-full">
                    <BigCalendar />
                </div>
            </div>
            
        </div>
    );
};

export default Calendar;