import React, {useContext, useEffect, useState} from 'react';
import CalendarContext from "../context/CalendarContext";
import dayjs from "dayjs";
import axios from "axios";
import CalendarSidebar from "../components/CalendarSidebar/CalendarSidebar";
import Header from "../components/Header/Header";
import AddEventModal from "../components/AddEventModal/AddEventModal";


// open update event when click on event name
export function clickOnEventName(evt, monthIndex, events, setNewEventData) {

    let updatedEvent = events.find(event => event._id === evt._id)


    if (updatedEvent) {
        setNewEventData(prev => ({
            ...prev,
            title: updatedEvent.title,
            isOpen: true,
            updateEventId: evt._id,
            date: new Date(),
            selectedDate: updatedEvent.date ? new Date(updatedEvent.date) : new Date(),
            startDateTime: updatedEvent.end ? new Date(updatedEvent.end) : new Date(),
            endDateTime: updatedEvent.date ? new Date(updatedEvent.date) : new Date(),
            monthIndex: monthIndex,
            status: updatedEvent.status,
            meetingLink: updatedEvent.meetingLink,
            agenda: updatedEvent.agenda,
            followUp: updatedEvent.followUp,
            actionItems: updatedEvent.actionItems,
            program: updatedEvent.program,
            session: updatedEvent.session,
            invitations: updatedEvent.invitations,
        }))
    } else {
        alert("not found updated event item")
    }
}

const Calendar = ({pageContent}) => {

    const {events, newEventData, setCloseNewEventModal, setEvents, setMonthIndex, setNewEventData} = useContext(CalendarContext)

    useEffect(() => {
        let currentMonthIndex = dayjs().month()
        setMonthIndex(currentMonthIndex)

        axios.get("http://localhost:4000/api/calendar/events").then(({data}) => {
            setEvents(data)
        }).catch(ex => {

        })
    }, [])


    const [isOpenChooseEventModal, setOpenChooseEventModal] = useState(false)

    function openAddNewEventModal(eventType) {
        let now = dayjs()
        setNewEventData(prev => ({
            ...prev,
            isOpen: true,
            type: eventType,
            date: now.date(),
            monthIndex: now.month()
        }))
        setOpenChooseEventModal(false)
    }

    function handleClose() {
        setCloseNewEventModal()
    }
    // function handleSetCalendarView(){
    //
    // }

    return (
        <div className="my-container">
            <Header/>
            
            <AddEventModal isOpenAddEventModal={newEventData.isOpen} onClose={handleClose}/>

            <div className="flex ">
                <CalendarSidebar
                    events={events}
                    openAddNewEventModal={openAddNewEventModal}
                    isOpenChooseEventModal={isOpenChooseEventModal}
                    setOpenChooseEventModal={setOpenChooseEventModal}
                />
                <div className="w-full">
                    {pageContent}
                </div>
            </div>

        </div>
    );
};

export default Calendar;