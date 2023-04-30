import React, {useContext, useEffect, useState} from 'react';
import WithCalendarLayout from "../layout/WithCalendarLayout";
import DayView from "../components/DayView/DayView";
import BigCalendar from "../components/BigCalendar/BigCalendar";
import CalendarContext from "../context/CalendarContext";
import dayjs from "dayjs";
import axios from "axios";
import {useParams, useSearchParams} from "react-router-dom";


const HomePage = () => {

    const {
        events,
        setEvents,
        setCalendarView,
        calendarView,
        setMonthIndex,
        setNewEventData
    } = useContext(CalendarContext)

    useEffect(() => {
        let currentMonthIndex = dayjs().month()
        setMonthIndex(currentMonthIndex)

        axios.get("/api/calendar/events").then(({data}) => {
            setEvents(data)
        }).catch(ex => {

        })

    }, [])


    let params = useParams()

    // const [useParams, setParams] = useSearchParams()
    // console.log(useParams.set(""))

    useEffect(() => {
        if (params.view === "month") {
            setCalendarView("month")
        } else if (params.view === "day") {
            setCalendarView("day")
        }
    }, [params])


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
        <div>
            {
                params.view === "month"
                    ? <BigCalendar events={events}/>
                    : <DayView  events={events}/>
            }

        </div>
    );
};

export default WithCalendarLayout(HomePage);