import React, {useContext, useEffect, useState} from 'react';
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import getMonthDayMartix from "../../utils/getMonthDayMartix";
import Popup from "../Popup/Popup";
import statusColors from "../../utils/statusColors";
import withPreventDefault from "../../utils/withStopPropagation";
import withStopPropagation from "../../utils/withStopPropagation";
import {clickOnEventName} from "../../Calendar/Calendar";
import {useNavigate} from "react-router-dom";
import {colors} from "../ColorPicker/ColorPicker";
import {CgClose} from "react-icons/all";
import getDayClass from "../../utils/getDayClass.js";
import {toast} from "react-toastify";
import useAuthContext from "../../context/useAuthContext.js";


import "./big-calendar.scss"


const BigCalendar = (props) => {

    const {events} = props

    const {
        selectedDate,
        setNewEventData,
        currentDate,
        monthIndex,
        setCloseNewEventModal,
        addEvent,
        filterEvents
    } = useContext(CalendarContext)

    const [{auth}] = useAuthContext()


    let weeks = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ]

    const navigate = useNavigate()

    const [daysMatrix, setDaysMatrix] = useState(getMonthDayMartix(selectedDate))

    const [daySelected, setDaySelected] = useState(dayjs().month(monthIndex))

    const [isShowAllEventDate, setShowAllEventDate] = useState(null)


    // useEffect(() => {
    //     if(value) {
    //         let index = dayjs(new Date(value))
    //         setDaySelected(index)
    //         setMonthIndex(index.month())
    //     }
    // }, [value])


    useEffect(() => {
        setDaysMatrix(getMonthDayMartix(selectedDate))
    }, [selectedDate]);


    function handleSelectDate(day) {
        // onChange && onChange(day.toDate())
        setDaySelected(day)
    }


    // jump to day view...
    function handleClickOnDate(date) {
        let d = date.format("MM-DD-YYYY")
        navigate(`/day?date=` + d)
    }


    // open create event modal panel
    function clickOnCell(day, monthIndex) {
        setCloseNewEventModal()
        let startDateTime = day.toDate()
        let endDateTime = new Date(startDateTime)
        endDateTime.setMinutes(30)

        setNewEventData(prev => {
            let newEvent = {
                ...prev,
                title: "",
                isOpen: true,
                isEventCreateInitialize: true,
                startDateTime: startDateTime,
                start: new Date(startDateTime).toISOString(), // for instant preview
                end: new Date(endDateTime).toISOString(), // for instant preview
                endDateTime: endDateTime,
                monthIndex: monthIndex,
            }

            // add new event entry
            addEvent({
                _id: "000000000000000000000000", // fake mongodb id for client side render,
                createdBy: {
                    ...auth
                },
                ...newEvent,
                status: "pending"
            })

            return newEvent
        })

    }

    // open update event when click on event name
    function handleClickOnEventName(evt, monthIndex) {
        if (!auth) {
            return toast.error("To create an event, you need to login first.")
        }
        clickOnEventName(evt, monthIndex, events, setNewEventData)
    }

    function handleOpenEventDetailRoute(eventId) {
        let to = "/month?detail="
        if (eventId) {
            to += eventId
            setShowAllEventDate(null)
        }
        navigate(to)
    }

    function handleShowAllEvent(e, eventDate) {
        e.stopPropagation();
        setShowAllEventDate(prev => prev === eventDate ? null : eventDate)
    }


    function renderEvents(day, monthIndex) {

        const eventGroupByDate = {}
        events.filter(e => filterEvents.includes(e.status)).forEach(event => {
            let eventDate = dayjs(new Date(event.start)).format("DD/MM/YYYY")
            if (eventGroupByDate[eventDate]) {
                eventGroupByDate[eventDate].push(event)
            } else {
                eventGroupByDate[eventDate] = [event]
            }

            // if (eventDate === day.format("DD/MM/YYYY")) {
            //     return (
            //         <div
            //             className="event-name" style={{background: statusColors[event.status]}}>{event.title}
            //         </div>
            //     )
            // }
        })



        return Object.keys(eventGroupByDate).map(eventDate => {
            let more = 0
            if (eventGroupByDate[eventDate].length >= 4) {
                more = (eventGroupByDate[eventDate].length) - 4;
            }
            return (
                eventDate === day.format("DD/MM/YYYY") && (
                    <div key={eventDate}>
                        {
                            eventGroupByDate[eventDate].slice(0, 4).map(evt => (
                                <div
                                    key={evt._id}
                                    onClick={(e) => withPreventDefault(e, handleClickOnEventName(evt, monthIndex))}
                                    className="event-name"
                                    style={{background: colors[evt.eventColor] || statusColors[evt.status]}}
                                >
                                    {evt.title || "Untitled"}
                                </div>
                            ))
                        }
                        {more > 0 && (
                            <div className="relative">
                                <div onClick={(e) => handleShowAllEvent(e, eventDate)}
                                     className="event-name see-more-btn w-max"> {more} more...
                                </div>

                                {isShowAllEventDate && (
                                    <div>
                                        <Popup className="popup all-event-popup-modal py-2 px-1"
                                               onClose={(e) => handleShowAllEvent(e, eventDate)} isWithBackdrop={true}
                                               isOpen={!!isShowAllEventDate && isShowAllEventDate === eventDate}>
                                            <div onClick={(e) => handleShowAllEvent(e, eventDate)}
                                                 className="absolute right-4 top-3">
                                                <CgClose className="text-xs abslute right-0"/>
                                            </div>
                                            <div onClick={(e) => withStopPropagation(e, () => {
                                            })}>
                                                <div>
                                                    <div className="ml-2 m-auto text-center text-gray-500">
                                                        <p className="text-sm  font-normal">{day.format("dddd")}</p>
                                                        <h4 onClick={(e) => withStopPropagation(e, handleClickOnDate(day))}
                                                            className="btn-circle m-auto flex items-center justify-center w-10 h-10 text-center text-xl text-gray-700 ">{day.date()}</h4>
                                                    </div>
                                                </div>
                                                {eventGroupByDate[eventDate].map((eachEvt, i) => (
                                                    <li onClick={e => withStopPropagation(e, handleOpenEventDetailRoute(eachEvt._id))}
                                                        key={i}
                                                        style={{background: colors[eachEvt.eventColor]}}
                                                        className="py-1 popup-item text-xs text-gray-800">

                                                        {eachEvt.title}</li>
                                                ))}
                                            </div>
                                        </Popup>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            )
        })
    }


    let weekDay = {
        6: "rgba(255,77,77,0.15)",
        0: "rgba(90,163,255,0.15)",
    }

    return (
        <div>
            <div className="mt-5 w-full p-2 rounded-xl big-calendar">
                <div>
                    <div className="grid grid-cols-7 day-row">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} style={{background: weekDay[weekIndex]}} className="big-date">
                                <span className="big-date-cell">{week}</span>
                            </div>
                        ))}
                    </div>

                    {/*** month view *****/}
                    <div className="grid grid-cols-7 grid-rows-6">
                        {daysMatrix.map((row) => (
                            row.map((day, dayIndex) => (
                                <div style={{background: weekDay[dayIndex]}} key={day.date()}
                                     onClick={() => clickOnCell(day, monthIndex)}
                                     className={`big-date py-1 ${getDayClass(day, selectedDate)} `}>
                                    <span onClick={(e) => withStopPropagation(e, handleClickOnDate(day))}
                                          className="big-date-cell">{day.format("D")}
                                    </span>
                                    <div className="event-list">
                                        {renderEvents(day, monthIndex)}
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BigCalendar;
