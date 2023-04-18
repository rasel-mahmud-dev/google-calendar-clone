import React, {useContext, useEffect, useState} from 'react';

import "./big-calendar.scss"
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import AddEventModal from "../AddEventModal/AddEventModal";
import getMonthDayMartix from "../../utils/getMonthDayMartix";

const statusColors = {
    accepted: "#4dbe33",
    pending: "#7480a6",
    rejected: "#ee4444",
    proposedTime: "#227fb6",
    denied: "#d4ec57",
    finished: "#735eff"
}


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

    const [daysMatrix, setDaysMatrix] = useState(getMonthDayMartix(monthIndex))

    const [daySelected, setDaySelected] = useState(dayjs().month(monthIndex))

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
        console.log("clicked date is ", date)
    }


    // open create event modal panel
    function clickOnCell(day, monthIndex) {
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


    function handleClose() {
        setCloseNewEventModal()
    }

    function renderEvents(day) {

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


        return Object.keys(eventGroupByDate).map(eventDate => (
            eventDate === day.format("DD/MM/YYYY") && (
                eventGroupByDate[eventDate].slice(0, 4).map(evt => (
                    <div className="event-name" style={{background: statusColors[evt.status]}}>
                        {evt.title}
                    </div>
                ))
            )
        ))


    }


    return (
        <div>

            <AddEventModal isOpenAddEventModal={newEventData.isOpen} onClose={handleClose}/>

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
                                    <span onClick={() => handleClickOnDate(day)}
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
