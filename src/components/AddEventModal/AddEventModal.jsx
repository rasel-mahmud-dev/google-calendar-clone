import React, {useContext, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import {TiTimes} from "react-icons/all";
import CalendarContext from "../../context/CalendarContext";

import * as yup from "yup"

import "./style.scss"
import BasicInfo from "./BasicInfo";
import AddUser from "./AddUser";
import axios from "axios";


const AddEventModal = ({isOpenAddEventModal, onClose}) => {


    const {newEventData, setEvents, addEvent, setNewEventData, setCloseNewEventModal} = useContext(CalendarContext)

    const [tab, setTab] = useState("basic")
    const [tabPosition, setTabPosition] = useState(0)


    function handleClose() {
        setCloseNewEventModal()
    }


    function handleChange(value, name) {
        setNewEventData(prev => ({
            ...prev,
            [name]: value

        }))
    }

    useEffect(() => {
        if (tab === "basic") {
            setTabPosition(0)
        } else if (tab === "addUsers") {
            setTabPosition(-500)
        }
    }, [tab])


    // reset first tab when user close modal window
    useEffect(() => {
        if (!newEventData.isOpen) {
            setTab("basic")
        }
    }, [newEventData.isOpen]);

    useEffect(()=>{
        if(newEventData.isEventCreateInitialize){
            // console.log(newEventData)
            setEvents(prev=>{
                let updateEvents = [...prev]
                let updateEventIndex = updateEvents.findIndex(evt=>evt.isEventCreateInitialize)
                if(updateEventIndex !== -1){
                    updateEvents[updateEventIndex] = {
                        ...updateEvents[updateEventIndex],
                        ...newEventData
                    }
                    return updateEvents
                } else {
                    return prev
                }
            })
        }
    }, [newEventData.isEventCreateInitialize, newEventData.title, newEventData.eventColor])


    async function handleAddEvent() {

        try {
            let eventValidator = yup.object({
                title: yup.string().required("Meeting title required."),
                agenda: yup.string().required("Meeting agenda required."),
                invitations: yup.array()
            });


            const invitationUsers = newEventData.invitations.map(user => user._id) || []

            await eventValidator.validateSync({
                title: newEventData.title,
                agenda: newEventData.agenda,
                invitations: invitationUsers
            })


            let startDateTime = new Date(newEventData.startDateTime)
            let endDateTime = new Date(newEventData.endDateTime)

            if(newEventData.isAllDay){
                startDateTime.setHours(0)
                startDateTime.setMinutes(0)
                startDateTime.setSeconds(0)

                endDateTime.setHours(23)
                endDateTime.setMinutes(59)
                endDateTime.setSeconds(59)
            }

            let payload = {
                title: newEventData.title,
                start: startDateTime,
                end: endDateTime,
                agenda: newEventData.agenda,
                actionItems: newEventData.actionItems,
                followUp: newEventData.followUp,
                notifications: newEventData.notifications,
                meetingLink: newEventData.meetingLink,
                status: "pending",
                eventColor: newEventData.eventColor,
                attachments: null,
                invitations: invitationUsers
            }

            if(newEventData.updateEventId){
                axios.put("http://localhost:4000/api/calendar/update/"+newEventData.updateEventId, payload).then(({data, status}) => {
                    setCloseNewEventModal()
                   // addEvent(data.event)
                    setEvents(prev=>{
                        let updateEvents = [...prev]
                        let updateEventIndex = updateEvents.findIndex(evt=> evt._id === newEventData.updateEventId)
                        if(updateEventIndex !== -1){
                            updateEvents[updateEventIndex] = {
                                ...updateEvents[updateEventIndex],
                                ...data.event
                            }
                            return updateEvents
                        } else {
                            return prev
                        }
                    })

                }).catch((ex) => {})

            } else {
                
                axios.post("http://localhost:4000/api/calendar/create", payload)
                    .then(({data, status}) => {
                    setCloseNewEventModal()
                    addEvent(data.event)

                }).catch((ex) => {})
            }

        } catch (ex) {
            alert(ex.message)

        }
    }


    return (
        <div>
            <Modal isOpen={newEventData.isOpen} onClose={handleClose} className="add-event-modal">

                <div className="close-btn">
                    <TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={handleClose}/>
                </div>

                <div className="tab-root" style={{transform: `translateX(${tabPosition}px`}}>
                    <div className={`tab tab-one ${tab === "basic" ? "open-tab" : "hide-tab"}`}>
                        {tab === "basic" && (
                            <BasicInfo
                                handleAddEvent={handleAddEvent}
                                handleChange={handleChange}
                                setTab={setTab}
                                newEventData={newEventData}
                            />
                        )}
                    </div>

                    <div className={`tab  tab-two ${tab === "addUsers" ? "open-tab" : "hide-tab"}`}>
                        {tab === "addUsers" && (
                            <AddUser
                                handleClose={handleClose}
                                handleChange={handleChange}
                                newEventData={newEventData}
                                setTab={setTab}
                            />
                        )}
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default AddEventModal;