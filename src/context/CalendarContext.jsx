import React, {useState} from "react";

const CalendarContext = React.createContext({})


export const CalendarProvider = (props) => {

    const [state, setState] = useState({
        selectedDate: new Date(),
        currentDate: new Date(),
        monthIndex: 3,
        smallCalendarMonth: 0,
    })

    const value = {
        selectedDate: state.selectedDate,
        currentDate: state.currentDate,
        monthIndex: state.monthIndex,
        smallCalendarMonth: state.smallCalendarMonth,
        setSmallCalendarMonth: function (val) {
            setState(prev => ({...prev, smallCalendarMonth: val}))
        },
        setCalendar: function (val) {
            setState(prev => ({...prev, ...val}))
        },
        setMonthIndex: function (val) {
            setState(prev => ({...prev, monthIndex: val}))
        },
    }



    return (
        <CalendarContext.Provider value={value}>
            {props.children}
        </CalendarContext.Provider>
    )

}

export default CalendarContext