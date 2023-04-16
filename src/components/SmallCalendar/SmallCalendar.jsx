import React, {useContext, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from "react-icons/all";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import "./smallCalendar.scss"
import {isToday} from "date-fns";

const SmallCalendar = () => {

    const {smallCalendarMonth, monthIndex, setSmallCalendarMonth} = useContext(CalendarContext)

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


    function jumpNextMonth(val) {
        setCurrentMonthIdx(val)
    }

    function jumpPrevMonth(val) {
        setCurrentMonthIdx(val)
    }

    function isToday2(date) {
        let r = dayjs(new Date(dayjs().year(), monthIndex, date))
        return isToday(r.toDate())
    }

    return (
        <div className="mt-5 w-full p-2 rounded-xl small-calendar">

            <div className="flex justify-between px-1">
                <p className="text-sm text-gray-700 font-medium">{
                    dayjs(new Date(dayjs().year(), monthIndex)).format(
                        "MMMM YYYY"
                    )}</p>

                <div className="flex items-center gap-x-1">
                    <li className="date list-none text-2xl"
                        onClick={() => jumpPrevMonth(monthIndex - 1)}>
                        <div className="date-cell">
                            <BiChevronLeft className="text-sm"/>
                        </div>
                    </li>
                    <li className="date list-none text-2xl mr-3"
                        onClick={() => jumpNextMonth(monthIndex + 1)}>
                        <div className="date-cell">
                            <BiChevronRight className="text-sm"/>
                        </div>
                    </li>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-7">
                    {weeks.map(week => (
                        <div className="date">
                            <span className="date-cell">{week}</span>
                        </div>
                    ))}
                </div>

                {/*** month view *****/}

                <div className="grid grid-cols-7 grid-rows-6">

                    {/**** previous month date rest date */}
                    {Array.from({length: prevCalendarEnd().total}).map((_, i) => {
                        let date = prevCalendarEnd().dateStart + i
                        return (
                            <div className="date inactive py-1">
                                <span className="date-cell">{date}</span>
                            </div>
                        )
                    })}

                    {/**** current month date */}
                    {Array.from({length: todayDayInCurrentMonth}).map((_, i) => {
                        let date = i + 1
                        return (
                            <div className={`date py-1 ${isToday2(date) ? "today" : ""}`}>
                                <span className="date-cell">{date}</span>
                            </div>
                        )
                    })}

                    {/**** next month rest date */}
                    {Array.from({length: nextCalendarStart().total}).map((_, i) => {
                        let date = nextCalendarStart().dateStart + i
                        return (
                            <div className="date inactive py-1">
                                <span className="date-cell">{date}</span>
                            </div>
                        )
                    })}


                </div>

                <div>

                </div>


            </div>


        </div>
    );
};

export default SmallCalendar;