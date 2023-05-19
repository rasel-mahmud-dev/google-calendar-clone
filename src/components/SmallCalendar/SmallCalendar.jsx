import React, {useEffect, useState} from 'react';
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import dayjs from "dayjs";
import getMonthDayMartix from "../../utils/getMonthDayMartix.js";
import getDayClass from "../../utils/getDayClass.js";

import "./smallCalendar.scss"


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

    const [currentDate, setCurrentDate] = useState(new Date())

    const [daysMatrix, setDaysMatrix] = useState(getMonthDayMartix(currentDate))

    const [daySelected, setDaySelected] = useState(currentDate)


    function jumpNextMonth() {
        let updatedCurrentDate = new Date(currentDate)
        updatedCurrentDate.setMonth(updatedCurrentDate.getMonth() + 1)
        setCurrentDate(updatedCurrentDate)
    }


    function jumpPrevMonth() {
        let updatedCurrentDate = new Date(currentDate)
        updatedCurrentDate.setMonth(updatedCurrentDate.getMonth() - 1)
        setCurrentDate(updatedCurrentDate)
    }

    useEffect(() => {
        if(value) {
            // let index = dayjs(new Date(value))
            // setDaySelected(index)
            // setCurrentDate(index.month())
        }
    }, [value])



    useEffect(() => {
        setDaysMatrix(getMonthDayMartix(currentDate))
    }, [currentDate]);


    function handleSelectDate(day) {
        let d = day.toDate()
        onChange && onChange(d)
        setDaySelected(day)
    }



    return (
        <div className={`${className} small-calendar`}>

            <div className="flex justify-between px-1 mb-2 mt-3">
                <p className="text-sm text-gray-700 font-medium">{
                    dayjs(new Date(currentDate)).format(
                        "MMMM YYYY"
                    )}</p>

                <div className="flex items-center gap-x-1">
                    <li className="date list-none text-2xl"
                        onClick={() => jumpPrevMonth( )}>
                        <div className="date-cell">
                            <BiChevronLeft className="text-sm"/>
                        </div>
                    </li>
                    <li className="date list-none text-2xl mr-3"
                        onClick={() => jumpNextMonth()}>
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
                            <div key={day.date()} onClick={() => handleSelectDate(day)}
                                 className={`date py-1 ${getDayClass(day, daySelected)} `}>
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