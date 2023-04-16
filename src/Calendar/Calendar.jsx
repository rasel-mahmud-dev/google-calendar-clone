import React, {useContext} from 'react';
import {plus} from "../icons/plus";
import CalendarContext from "../context/CalendarContext";
import {BiCaretDown} from "react-icons/all";
import SmallCalendar from "../components/SmallCalendar/SmallCalendar";


const Calendar = () => {

    const {selectedDate} = useContext(CalendarContext)


    return (
        <div className="container">

           <div className="calendar-page">
               <button className="btn flex items-center rounded-full shadow-lg mt-4 add-new-btn">
                   <div dangerouslySetInnerHTML={{__html: plus}}></div>
                   <span className="mr-4 font-medium text-sm">Create</span>
                   <BiCaretDown />
               </button>
           </div>

            <SmallCalendar />

            
        </div>
    );
};

export default Calendar;