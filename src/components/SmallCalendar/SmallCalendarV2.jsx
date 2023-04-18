import React, {useEffect, useState} from 'react';

import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {

    /*
    Month index = 3
    prev month March = 31
    April total days = 30
    next month May   = 31


    start April 1 from Saturday [6]


    * */

    month = 3

    const year = dayjs().year();


    // start on day index 0 - 6
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();


    let currentMonthCount = 0 - firstDayOfTheMonth;
    // 0 = sunday
    // 6 = sat

    // first week.
    // [Su] 1st loop pull date previous that -6 date from now ==> 26-3-2023
    // [Mo] 2nd loop pull date previous that -5 date from now ==> 27-3-2023
    // [Tu] 3rd loop pull date previous that -4 date from now ==> 28-3-2023
    // [We] 4th loop pull date previous that -3 date from now ==> 29-3-2023
    // [Th] 5th loop pull date previous that -2 date from now ==> 20-3-2023
    // [Fr] 6th loop pull date previous that -1 date from now ==> 31-3-2023
    // [Sa] 7th loop pull date previous that 0 date from now ==> 01-3-2023

    // second week.
    // [Su] 1st loop pull date previous that 1 date from now ==> 2-3-2023
    // [Mo] 2nd loop pull date previous that 2 date from now ==> 3-3-2023
    // [Tu] 3rd loop pull date previous that 3 date from now ==> 4-3-2023
    // [We] 4th loop pull date previous that 4 date from now ==> 5-3-2023
    // [Th] 5th loop pull date previous that 5 date from now ==> 6-3-2023
    // [Fr] 6th loop pull date previous that 6 date from now ==> 7-3-2023
    // [Sa] 7th loop pull date previous that 7 date from now ==> 8-3-2023

    // third week
    // ....


    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix
}



const SmallCalendarV2 = () => {

    const [currentMonthIdx, setCurrentMonthIdx] = useState(
        dayjs().month()
    );



    const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx));


    let cYear = dayjs().year()
    let cMonth = dayjs().month()
    let cDate = dayjs().date()

   let da  = dayjs(new Date(cYear, 5, -5))
    // console.log(da)

    const {
        monthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        daySelected,
    } = {
        monthIndex: 5,
        setSmallCalendarMonth: () => {
        },
        setDaySelected: () => {
        },
        daySelected: dayjs().date(20)
    }


    // useEffect(() => {
    //     // setCurrentMonthIdx(monthIndex);
    // }, [monthIndex]);



    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);



    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }


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

                {/****** day label ******/}
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format("dd")}
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