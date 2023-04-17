import React, {useEffect, useState} from 'react';

import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    console.log(daysMatrix)
    return daysMatrix;
}




const SmallCalendarV2 = () => {

    const [currentMonthIdx, setCurrentMonthIdx] = useState(
        dayjs().month()
    );

    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);



    const {
        monthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        daySelected,
    }  = {
        monthIndex: 3,
        setSmallCalendarMonth:  ()=>{},
        setDaySelected: ()=>{},
        daySelected: dayjs().date(20)
    }



    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);


    // function handlePrevMonth() {
    //     setCurrentMonthIdx(currentMonthIdx - 1);
    // }
    // function handleNextMonth() {
    //     setCurrentMonthIdx(currentMonthIdx + 1);
    // }


    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "bg-blue-500 rounded-full text-white";
        } else if (currDay === slcDay) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold";
        } else {
            return "";
        }
    }



    return (
        <div>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}

          </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                }}
                                className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className="text-sm">{day.format("D")}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SmallCalendarV2;