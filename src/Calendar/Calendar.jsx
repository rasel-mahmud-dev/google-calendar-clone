import React, {useContext, useEffect, useState} from 'react';
import {plus} from "../icons/plus";
import CalendarContext from "../context/CalendarContext";
import {BiCaretDown} from "react-icons/all";
import SmallCalendar from "../components/SmallCalendar/SmallCalendar";
import BigCalendar from "../components/BigCalendar/BigCalendar";
import dayjs from "dayjs";
import Popup from "../components/Popup/Popup";
import SmallCalendarV2 from "../components/SmallCalendar/SmallCalendarV2";


const Calendar = () => {

    const {selectedDate, setMonthIndex, setNewEventData} = useContext(CalendarContext)

    useEffect(() => {
        let currentMonthIndex = dayjs().month()
        setMonthIndex(currentMonthIndex)

    }, [])

    const [isOpenChooseEventModal, setOpenChooseEventModal] = useState(false)

    function openAddNewEventModal(eventType) {
        let now = dayjs()
        setNewEventData(prev => ({
            ...prev,
            isOpen: true,
            type: eventType,
            date: now.date(),
            monthIndex: now.month()
        }))
        setOpenChooseEventModal(false)
    }

    return (
        <div className="my-container">


            <div className="flex ">
                <div className="sidebar">
                    <div className="calendar-page relative">
                        <button className="btn flex items-center rounded-full shadow-lg mt-4 add-new-btn"
                                onClick={() => setOpenChooseEventModal(true)}>
                            <div dangerouslySetInnerHTML={{__html: plus}}></div>
                            <span className="mr-4 font-medium text-sm">Create</span>
                            <BiCaretDown/>

                        </button>

                        <Popup className="rounded-lg px-0 py-1 absloute w-40 left-0 top-14"
                               onClose={() => setOpenChooseEventModal(false)}
                               isOpen={isOpenChooseEventModal}>
                            <div>
                                <li onClick={() => openAddNewEventModal("event")}
                                    className="text-sm cursor-pointer list-none hover:bg-gray-100 py-2 px-2">Event
                                </li>
                                <li onClick={() => openAddNewEventModal("task")}
                                    className="text-sm cursor-pointer list-none hover:bg-gray-100 py-2 px-2">Task
                                </li>
                            </div>
                        </Popup>

                    </div>

                    <SmallCalendar />
                    <br/>
                    <br/>
                    <br/>

                    {/*<SmallCalendarV2/>*/}
                </div>
                <div className="border-l w-full">
                    <BigCalendar/>
                </div>
            </div>

        </div>
    );
};

export default Calendar;