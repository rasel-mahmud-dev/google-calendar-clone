import React, {useContext, useEffect, useState} from 'react';

import "./big-calendar.scss"
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import {isToday} from "date-fns";
import AddEventModal from "../AddEventModal/AddEventModal";


const BigCalendar = () => {

    const {
        selectedDate,
        setNewEventData,
        currentDate,
        newEventData,
        monthIndex,

    } = useContext(CalendarContext)




    const [isOpenChooseEventModal, setOpenChooseEventModal] = useState(false)

    function openAddNewEventModal(eventType) {
        setNewEventData(prev => ({
            ...prev,
            isOpen: true,
            type: eventType
        }))
        setOpenChooseEventModal(false)
    }


    let weeks = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ]


    let todayDayInPrevMonth = dayjs(new Date(dayjs().year(), monthIndex - 1)).daysInMonth()
    let todayDayInCurrentMonth = dayjs(new Date(dayjs().year(), monthIndex)).daysInMonth()
    let nextMonth = dayjs(new Date(dayjs().year(), monthIndex + 1)).daysInMonth()

    let totalCell = 42

    function prevCalendarEnd() {

        let day = dayjs(new Date(dayjs().year(), monthIndex))
        let dayIndex = day.day()

        let arr = Array.from({length: todayDayInPrevMonth}).map((_item, index) => index + 1).reverse()
        let itemsPrev = arr.slice(0, dayIndex).reverse()


        return {
            total: dayIndex,
            dateStart: itemsPrev[0]
        }
    }

    function nextCalendarStart() {

        let day = dayjs(new Date(dayjs().year(), monthIndex))
        let dayIndex = day.day()


        let rest = totalCell - (todayDayInCurrentMonth + dayIndex)

        let arr = Array.from({length: nextMonth}).map((_item, index) => index + 1)
        let itemsPrev = arr.slice(0, rest)

        return {
            total: rest,
            dateStart: itemsPrev[0]
        }
    }

    function isToday2(date) {
        let r = dayjs(new Date(dayjs().year(), monthIndex, date))
        return isToday(r.toDate())
    }



    // jump to day view...
    function handleClickOnDate(date){
        console.log("clicked date is ", date)
    }


    // open create event modal panel
    function clickOnCell(date, monthIndex){
        setNewEventData(prev=>({
            ...prev,
            isOpen: true,
            selectedDate: date,
            monthIndex: monthIndex
        }))
    }



    function handleClose(){
        setNewEventData(prev=>({
            ...prev,
            isOpen: false,
            selectedDate: 0,
            monthIndex: 0
        }))
    }

    return (
        <div>


            <AddEventModal isOpenAddEventModal={newEventData.isOpen} onClose={handleClose}  />

            <div className="mt-5 w-full p-2 rounded-xl big-calendar">

                <div>
                    <div className="grid grid-cols-7 day-row">
                        {weeks.map(week => (
                            <div className="big-date">
                                <span className="big-date-cell">{week}</span>
                            </div>
                        ))}
                    </div>

                    {/*** month view *****/}

                    <div className="grid grid-cols-7 grid-rows-6">

                        {/**** previous month date rest date */}
                        {Array.from({length: prevCalendarEnd().total}).map((_, i) => {
                            let date = prevCalendarEnd().dateStart + i
                            return (
                                <div onClick={()=>clickOnCell(date, monthIndex - 1)} className="big-date inactive py-1">
                                    <span onClick={()=>handleClickOnDate(date)} className="big-date-cell">{date}</span>
                                </div>
                            )
                        })}

                        {/**** current month date */}
                        {Array.from({length: todayDayInCurrentMonth}).map((_, i) => {
                            let date = i + 1
                            return (
                                <div onClick={()=>clickOnCell(date, monthIndex)} className={`big-date py-1 ${isToday2(date) ? "today" : ""}`}>
                                    <span onClick={()=>handleClickOnDate(date)} className="big-date-cell">{date}</span>
                                </div>
                            )
                        })}

                        {/**** next month rest date */}
                        {Array.from({length: nextCalendarStart().total}).map((_, i) => {
                            let date = nextCalendarStart().dateStart + i
                            return (
                                <div onClick={()=>clickOnCell(date, monthIndex + 1)} className="big-date inactive py-1">
                                    <span onClick={()=>handleClickOnDate(date)} className="big-date-cell">{date}</span>
                                </div>
                            )
                        })}


                    </div>


                </div>


            </div>
        </div>
    );
};
export default BigCalendar;
