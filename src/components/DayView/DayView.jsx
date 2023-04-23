import React, {useContext, useEffect, useState} from 'react';

import "./dayView.scss"
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import statusColors from "../../utils/statusColors";
import {clickOnEventName} from "../../Calendar/Calendar";
import withStopPropagation from "../../utils/withStopPropagation";
import {useParams, useSearchParams} from "react-router-dom";
import {colors} from "../ColorPicker/ColorPicker.jsx";


const DayView = ({events, date = null}) => {

    const {monthIndex, auth, setMonthIndex, addEvent, setCloseNewEventModal, setNewEventData} = useContext(CalendarContext)

    const [currentDay, setCurrentDay] = useState(
        dayjs(new Date(dayjs().year(), monthIndex))
    )

    const [currentDayEvents, setCurrentDayEvents] = useState([])

    const [searchParams] = useSearchParams()

    const dateParams = searchParams.get("date")


    useEffect(() => {
        if (events && events.length > 0) {
            let currentEvts = events.filter(event => {
                let startDate = new Date(event.start)
                // console.log(startDate.getDate(), currentDay.date())
                if (startDate.getDate() === currentDay.date()) {
                    return event;
                }
            })
            setCurrentDayEvents(currentEvts)
        }
    }, [events, currentDay])


    useEffect(() => {
        let isValidDate = dayjs(dateParams).isValid()
        if(isValidDate && dateParams){
            let d = dayjs(dateParams)
            setCurrentDay(d)
        } else {
            let now = dayjs()
            let currentDate = date || now.date()
            setCurrentDay(dayjs(new Date(now.year(), monthIndex, currentDate)))
        }
    }, [monthIndex, dateParams])
    

    // open update event when click on event name
    function handleClickOnEventName(evt, monthIndex) {
        setCloseNewEventModal()
        clickOnEventName(evt, monthIndex, events, setNewEventData)
    }

    // create meeting with time && date
    function createMeetingWithTime(hour) {
        // console.log(currentDay, hour, monthIndex)
        setCloseNewEventModal()
        let date = currentDay.toDate()
        let startDateTime = new Date(date)
        startDateTime.setHours(hour)
        startDateTime.setMinutes(0)
        let endDateTime = new Date(date)
        endDateTime.setMinutes(30)
        endDateTime.setHours(hour)

        setNewEventData(prev => {
            let newEvent = {
                ...prev,
                isOpen: true,
                isEventCreateInitialize: true,
                startDateTime: startDateTime,
                start: new Date(startDateTime).toISOString(), // for instant preview
                end: new Date(endDateTime).toISOString(), // for instant preview
                endDateTime: endDateTime,
                monthIndex: monthIndex
            }

            // add new event entry
            addEvent({
                _id: "000000000000000000000000", // fake mongo db id for client side render,
                createdBy: {
                    ...auth
                },
                ...newEvent
            })

            return newEvent
        })
    }


    function getStatus(hour) {
        if (hour === 0) {
            return "AM"
        } else if (hour > 12) {
            return "PM"
        } else {
            return "AM"
        }
    }


    function renderHour(hour) {
        return hour > 12 ? Math.floor(hour - 12) : hour
    }


    function jumpNextMonth() {
        setMonthIndex(monthIndex + 1)
    }

    function jumpPrevMonth() {
        setMonthIndex(monthIndex - 1)
    }

    function resetDate() {
        setMonthIndex(dayjs().month())
    }


    function renderEvent(hour) {
        
        return currentDayEvents.map(event => {
            const startDateTime = new Date(event.start)
            return (
                <div className={`day-events ${event.isEventCreateInitialize ? "focus": ""}`}>
                    {startDateTime.getHours() === hour && (
                        <div className="px-2 day-event ">
                            <div onClick={(e) => withStopPropagation(e, handleClickOnEventName(event, monthIndex))}
                                 className="ml-6 day-event-item " style={{background:  colors[event.eventColor]|| statusColors[event.status]}}>
                                <h4>{event.title || "Untitled"}</h4>
                            </div>
                        </div>
                    )}
                </div>
            )
        })
    }


    return (
        <div>

            <div className="col-span-10 flex items-center ml-10 gap-x-4">

                {/***** selected date *****/}
                <div className="ml-12 relative top-0 my-4 flex flex-col items-center ">
                    <span className="font-normal text-sm text-primary">
                        {currentDay.format(
                            "dddd"
                        )}
                    </span>
                    <h4 className="font-medium text-xl p-6 text-white rounded-full day-circle bg-primary">
                        {currentDay.format(
                            "DD"
                        )}
                    </h4>
                </div>
            </div>


            {/*<div className="each-hour">*/}
            {/*    <h4 className="hour-label">000</h4>*/}
            {/*    <div className="row">GMT</div>*/}
            {/*</div>*/}

            {/*<div className="hour-list">*/}
            
            {/*    <div className="each-hour">*/}
            {/*        <h4 className="hour-label"> GMT+ 0</h4>*/}
            {/*        <div className="row">*/}
            {/*            <div>*/}
            {/*                {renderEvent(0)}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="hour-list-wrapper">
                <div className="hour-list">
                    {Array.from({length: 24}).map((ele, index) => {

                        let hour = index

                        return (
                            <div className="each-hour"
                                 onClick={(e) => withStopPropagation(e, createMeetingWithTime(hour))}>

                                {hour >= 0 && (
                                    <>
                                        <h4 className="hour-label">{renderHour(hour)}
                                            <span className=" ml-1">{getStatus(hour)}</span>
                                        </h4>
                                        <div className="row ">
                                            <div>
                                                {renderEvent(hour)}
                                            </div>

                                        </div>
                                    </>
                                )}

                            </div>
                        )

                    })}
                </div>

            </div>


        </div>
    );
};

export default DayView;