import React, {useState} from "react";
import dayjs from "dayjs";

const CalendarContext = React.createContext({})


export const CalendarProvider = (props) => {

    const [state, setState] = useState({
        selectedDate: new Date(),
        currentDate: new Date(),
        monthIndex: 3,
        date: new Date().getDate(),
        events: [],
        smallCalendarMonth: 0,
        newEventData: {
            isOpen: false,
            isEventCreateInitialize: false,
            type: "event", // or  task
            title: "",
            meetingLink: "",
            agenda: "",
            followUp: "",
            actionItems: "",
            program: "",
            session: "",
            eventColor: "gray",
            startDateTime: new Date(),
            endDateTime: new Date(),
            date: 0,
            invitations: [],
            notifications: [
                {type: "notification", time: "10 minutes before"},
                {type: "email", time: "20 minutes before"},
                {type: "notification", time: "30 minutes before"},
            ],
            timeRange: {
                disabledEditTimeRange: false, turnOn: false, repeatIteration: 1, repeatPeriod: "week", repeatDays: [],
            }
        },
        calendarView: "month" // or day
    })

    const value = {
        selectedDate: state.selectedDate,
        currentDate: state.currentDate,
        monthIndex: state.monthIndex,
        events: state.events,
        date: state.date,
        smallCalendarMonth: state.smallCalendarMonth,
        calendarView: state.calendarView,
        auth: {
            username: "Rasel Mahmud",
            firstName: "Rasel",
            email: "rasel.mahmud.dev@gmail.com",
            _id: "6422af5d9153de6adce3b085"
        },
        setEvents: function (cb) {
            setState(prev => ({
                ...prev,
                events: typeof cb === "function"
                    ? cb(prev.events)
                    : cb
            }))
        },

        addEvent: function (newEvent) {
            setState(prev => ({...prev, events: [...prev.events, newEvent]}))
        },

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
            setState(prev=>({
                ...prev,
                events: prev.events.filter(evt=> !evt.isEventCreateInitialize)
            }))
            setState(prev => ({
                ...prev, newEventData: {
                    isOpen: false,
                    type: "event", // or  task
                    title: "",
                    meetingLink: "",
                    eventColor: "gray",
                    agenda: "",
                    isEventCreateInitialize: false,
                    followUp: "",
                    actionItems: "",
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
        },



        setCalendarView(componentName, query){
            setState(prev => ({
                ...prev,
               calendarView: componentName
            }))
        }


    }


    return (<CalendarContext.Provider value={value}>
            {props.children}
        </CalendarContext.Provider>)

}

export default CalendarContext