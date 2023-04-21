import React, {useContext, useEffect, useState} from 'react';

import "./big-calendar.scss"
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import AddEventModal from "../AddEventModal/AddEventModal";
import getMonthDayMartix from "../../utils/getMonthDayMartix";
import Popup from "../Popup/Popup";
import statusColors from "../../utils/statusColors";
import withPreventDefault from "../../utils/withStopPropagation";
import {clickOnEventName} from "../../Calendar/Calendar";
import withStopPropagation from "../../utils/withStopPropagation";
import {useNavigate} from "react-router-dom";


const BigCalendar = (props) => {

    const {events} = props

    const {
        selectedDate,
        setNewEventData,
        currentDate,
        monthIndex,
        setMonthIndex,
        newEventData,
        setCloseNewEventModal

    } = useContext(CalendarContext)


    let weeks = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ]

    const navigate  = useNavigate()

    const [daysMatrix, setDaysMatrix] = useState(getMonthDayMartix(monthIndex))

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
        setDaysMatrix(getMonthDayMartix(monthIndex))
    }, [monthIndex]);


    function handleSelectDate(day) {
        // onChange && onChange(day.toDate())
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


    // jump to day view...
    function handleClickOnDate(date) {
        let d = date.format("MM-DD-YYYY")
        navigate(`/calendar/day?date=` + d)
    }
 
    
    // open create event modal panel
    function clickOnCell(day, monthIndex) {
        setCloseNewEventModal()
        let date = day.toDate()
        let endDateTime = new Date(date)
        endDateTime.setMinutes(30)
        setNewEventData(prev => ({
            ...prev,
            isOpen: true,
            date: date,
            selectedDate: date,
            startDateTime: date,
            endDateTime: endDateTime,
            monthIndex: monthIndex
        }))
    }


    // open update event when click on event name
    function handleClickOnEventName(evt, monthIndex) {
        clickOnEventName(evt, monthIndex, events, setNewEventData)
    }




    function handleShowAllEvent(e, eventDate) {
        e.stopPropagation();

        setShowAllEventDate(prev => prev === eventDate ? null : eventDate)
    }

    function renderEvents(day, monthIndex) {

        const eventGroupByDate = {}
        events.forEach(event => {

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
                    <div>
                        {
                            eventGroupByDate[eventDate].slice(0, 4).map(evt => (
                                <div
                                    onClick={(e) => withPreventDefault(e, handleClickOnEventName(evt, monthIndex))}
                                    className="event-name"
                                    style={{background: statusColors[evt.status]}}
                                >
                                    {evt.title}
                                </div>
                            ))
                        }
                        {more > 0 && (
                            <div>
                                <div onClick={(e) => handleShowAllEvent(e, eventDate)}
                                     className="event-name see-more-btn"> {more} more
                                </div>

                                {isShowAllEventDate && (
                                    <div>
                                        <Popup className="popup all-event-popup-modal py-2 px-1"
                                               onClose={(e) => handleShowAllEvent(e, eventDate)} isWithBackdrop={true}
                                               isOpen={isShowAllEventDate}>
                                            <div>
                                                <div>
                                                    <div className="ml-2 m-auto text-center text-gray-500">
                                                        <p className="text-sm  font-normal">{day.format("dddd")}</p>
                                                        <h4 className="btn-circle m-auto flex items-center justify-center w-12 h-12 text-center text-xl text-gray-700 ">{day.date()}</h4>
                                                    </div>
                                                </div>
                                                {eventGroupByDate[eventDate].map(eachEvt => (
                                                    <li style={{background: statusColors[eachEvt.status]}}
                                                        className="py-1 popup-item text-xs text-gray-100">{eachEvt.title}</li>
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


    return (
        <div>



            <div className="mt-5 w-full p-2 rounded-xl big-calendar">

                <div>
                    <div className="grid grid-cols-7 day-row">
                        {weeks.map(week => (
                            <div className="big-date">
                                <span className="big-date-cell">{week}</span>
                            </div>
                        ))}
                    </div>

                    {/*** month view *****/}
                    <div className="grid grid-cols-7 grid-rows-6">

                        {daysMatrix.map((row) => (
                            row.map(day => (
                                <div key={day.date()} onClick={() => clickOnCell(day, monthIndex)}
                                     className={`big-date py-1 ${getDayClass(day)} `}>
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
