import React, {useEffect, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from "react-icons/all";
import dayjs from "dayjs";
import "./smallCalendar.scss"
import {compareAsc, isToday} from "date-fns";

const SmallCalendar = ({onChange, value}) => {

    let weeks = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ]

    const [monthIndex, setMonthIndex] = useState(dayjs().month())

    const [selectDate, setSelectDate] = useState(new Date())


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
        setMonthIndex(val)
    }

    function jumpPrevMonth(val) {
        setMonthIndex(val)
    }

    useEffect(() => {
        setSelectDate(new Date(value))
    }, [value])

    useEffect(() => {
        // let selectedDate = dayjs().month(monthIndex || dayjs().month()).toDate()
        // setSelectDate(selectedDate)
        // onChange && onChange(selectedDate)
    }, [monthIndex]);


    function handleSelectDate(date, monthIndex) {
        // let selectedDate = dayjs().month(monthIndex || dayjs().month()).date(date).hour(0).minute(0).second(0).millisecond(0)
        // setSelectDate(selectedDate.toDate())
        // onChange && onChange(selectedDate.toDate())
    }

    function isSelectedDate(date, monthIndex) {

        let sDate = dayjs(new Date(selectDate))

        let isSame = monthIndex === sDate.month() && date === sDate.date()
        console.log(isSame, date, monthIndex)

        return isSame
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
                            <div onClick={() => handleSelectDate(date, monthIndex - 1)}
                                 className={`date inactive py-1 ${isSelectedDate(date, monthIndex - 1) ? "selected-date" : ""} `}>
                                <span className="date-cell">{date}</span>
                            </div>
                        )
                    })}

                    {/**** current month date */}
                    {Array.from({length: todayDayInCurrentMonth}).map((_, i) => {
                        let date = i + 1
                        return (
                            <div onClick={() => handleSelectDate(date, monthIndex)}
                                 className={`date py-1 ${isSelectedDate(date, monthIndex) ? "selected-date" : ""} ${isToday2(date) ? "today" : ""}`}>
                                <span className="date-cell">{date}</span>
                            </div>
                        )
                    })}

                    {/**** next month rest date */}
                    {new Array(nextCalendarStart().total).fill(0).map((_, i) => {
                        let date = nextCalendarStart().dateStart + i
                        let isSe  = isSelectedDat(date, monthIndex + 1)
                        function isSelectedDat(date, monthIndex) {

                            let sDate = dayjs(new Date(selectDate))

                            let isSame = monthIndex === sDate.month() && date === sDate.date()
                            console.log(isSame, date, monthIndex)

                            return isSame
                        }
                        return  (
                            <div onClick={() => handleSelectDate(date, monthIndex + 1)}
                                 className={`date inactive py-1 ${isSelectedDat(date, monthIndex + 1) ? "selected-date" : ""} `}>
                                <span className="date-cell">{date}
                                    {isSe ? "y" : "n"}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};


export default SmallCalendar;