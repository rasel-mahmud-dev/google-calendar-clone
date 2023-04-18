import React, {useEffect, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from "react-icons/all";
import dayjs from "dayjs";
import "./smallCalendar.scss"
import {compareAsc, isToday} from "date-fns";
import getMonthDayMartix from "../../utils/getMonthDayMartix";

const SmallCalendar = ({className = "", onChange, value}) => {

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

    const [daysMatrix, setDaysMatrix] = useState(getMonthDayMartix(monthIndex))

    const [daySelected, setDaySelected] = useState(dayjs().month(monthIndex))


    function jumpNextMonth(val) {
        setMonthIndex(val)
    }


    function jumpPrevMonth(val) {
        setMonthIndex(val)
    }

    useEffect(() => {
        if(value) {
            let index = dayjs(new Date(value))
            setDaySelected(index)
            setMonthIndex(index.month())
        }
    }, [value])



    useEffect(() => {
        setDaysMatrix(getMonthDayMartix(monthIndex))
    }, [monthIndex]);


    function handleSelectDate(day) {
        let d = day.toDate()
        onChange && onChange(d)
        setDaySelected(day)
    }

    function getDayClass(day) {
        const format = "DD-MM-YY";

        const nowDay = dayjs().format(format);
        const nowDate = dayjs().month(monthIndex)

        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "today";
        } else if (currDay === slcDay) {
            return "selected-date";
        } else if (nowDate.month() !== day.month()) {
            return "inactive";
        } else {
            return ""
        }
    }

    return (
        <div className={`${className} small-calendar`}>

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
                        <div className="date" key={week}>
                            <span className="date-cell">{week}</span>
                        </div>
                    ))}
                </div>

                {/*** month view *****/}

                <div className="grid grid-cols-7 grid-rows-6">

                    {daysMatrix.map((row) => (
                        row.map(day => (
                            <div key={day.date()} onClick={() => handleSelectDate(day, monthIndex - 1)}
                                 className={`date py-1 ${getDayClass(day)} `}>
                                <span className="date-cell">{day.format("D")}</span>
                            </div>
                        ))
                    ))}
                </div>
            </div>

        </div>
    );
};


export default SmallCalendar;