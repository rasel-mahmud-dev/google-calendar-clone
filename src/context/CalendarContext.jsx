import React, {useState} from "react";

const CalendarContext = React.createContext({})


export const CalendarProvider = (props) => {

    const [state, setState] = useState({
        selectedDate: new Date(),
        currentDate: new Date(),
        monthIndex: 3,
        smallCalendarMonth: 0,
        newEventData: {
            title: "",
            meetingLink: "",
            program: "",
            session: "",
            startDateTime: new Date(),
            endDateTime: new Date(),
            invitations: []
        },
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

        newEventData: state.newEventData,

        setNewEventData: (cb)=>{
            setState(prev=>({
                ...prev,
                newEventData: cb(prev.newEventData)
            }))
        }

    }



    return (
        <CalendarContext.Provider value={value}>
            {props.children}
        </CalendarContext.Provider>
    )

}

export default CalendarContext