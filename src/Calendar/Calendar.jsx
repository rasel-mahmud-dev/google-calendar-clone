import React, {useContext, useEffect, useState} from 'react';
import {plus} from "../icons/plus";
import CalendarContext from "../context/CalendarContext";
import {BiCaretDown} from "react-icons/all";
import SmallCalendar from "../components/SmallCalendar/SmallCalendar";
import BigCalendar from "../components/BigCalendar/BigCalendar";
import dayjs from "dayjs";
import Popup from "../components/Popup/Popup";
import axios from "axios";
import CalendarSidebar from "../components/CalendarSidebar/CalendarSidebar";


const Calendar = () => {

    const {events, setEvents, selectedDate, setMonthIndex, setNewEventData} = useContext(CalendarContext)

    useEffect(() => {
        let currentMonthIndex = dayjs().month()
        setMonthIndex(currentMonthIndex)

        axios.get("http://localhost:4000/api/calendar/events").then(({data}) => {
            setEvents(data)
        }).catch(ex => {

        })

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
                <CalendarSidebar
                    events={events}
                    openAddNewEventModal={openAddNewEventModal}
                    isOpenChooseEventModal={isOpenChooseEventModal}
                    setOpenChooseEventModal={setOpenChooseEventModal}
                />
                <div className="border-l w-full">
                    <BigCalendar events={events}/>
                </div>
            </div>

        </div>
    );
};

export default Calendar;