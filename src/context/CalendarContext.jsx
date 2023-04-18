import React, {useState} from "react";

const CalendarContext = React.createContext({})


export const CalendarProvider = (props) => {

    const [state, setState] = useState({
        selectedDate: new Date(),
        currentDate: new Date(),
        monthIndex: 3,
        smallCalendarMonth: 0,
        newEventData: {
            isOpen: false,
            type: "event", // or  task
            title: "",
            meetingLink: "",
            program: "",
            session: "",
            eventColor: "blue",
            startDateTime: new Date(),
            endDateTime: new Date(),
            date: 0,
            invitations: [],

            notifications: [{type: "notification", time: "10 minutes before"}, {
                type: "email",
                time: "20 minutes before"
            }, {type: "notification", time: "30 minutes before"},],

            timeRange: {
                disabledEditTimeRange: false, turnOn: false, repeatIteration: 1, repeatPeriod: "week", repeatDays: [],
            }
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
        setNewEventData: (cb) => {
            setState(prev => ({
                ...prev, newEventData: cb(prev.newEventData)
            }))
        },
        setTimeRange: (cb) => {
            setState(prev => ({
                ...prev, newEventData: {
                    ...prev.newEventData, timeRange: cb(prev.newEventData.timeRange)

                }
            }))
        },
        setCloseNewEventModal: () => {
            let now = new Date()
            setState(prev => ({
                ...prev, newEventData: {
                    isOpen: false,
                    type: "event", // or  task
                    title: "",
                    meetingLink: "",
                    program: "",
                    session: "",
                    startDateTime: new Date(),
                    endDateTime: new Date(),
                    date: now.getDate(),
                    invitations: [],
                    timeRange: {
                        disabledEditTimeRange: false, turnOn: false, repeatIteration: 1, repeatPeriod: "week", repeatDays: [],
                    }
                }
            }))
        }
    }


    return (<CalendarContext.Provider value={value}>
            {props.children}
        </CalendarContext.Provider>)

}

export default CalendarContext