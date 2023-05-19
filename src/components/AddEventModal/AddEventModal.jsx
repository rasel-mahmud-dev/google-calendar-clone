import React, {useContext, useEffect, useState} from 'react';
import CalendarContext from "../../context/CalendarContext";

import * as yup from "yup"

import "./style.scss"
import BasicInfo from "./BasicInfo";
import AddUser from "./AddUser";
import axios from "axios";
import MultiStepModal from "../MultiStepModal/MultiStepModal.jsx";
import {CSSTransition} from "react-transition-group"
import {toast} from "react-toastify";
import useAuthContext from "../../context/useAuthContext.js";


export function handleAddUserInvitation(setNewEventData, user) {
    setNewEventData(prev => {
        let unique = [...prev.invitations]
        let index = unique.findIndex(un => un._id === user._id)
        if (index === -1) {
            unique.push(user)
        } else {
            unique.splice(index, 1)
        }

        return {
            ...prev,
            invitations: unique
        }
    })
}


const AddEventModal = () => {

    const {newEventData, setEvents, addEvent, setNewEventData, setCloseNewEventModal} = useContext(CalendarContext)

    const [tab, setTab] = useState("basic")

    const [{auth}] = useAuthContext()


    const [modalId, setModalId] = useState(1)


    function handleClose() {
        setCloseNewEventModal()
        setModalId(1)
    }


    function handleChange(value, name) {
        setNewEventData(prev => ({
            ...prev,
            [name]: value

        }))
    }

    // useEffect(() => {
    //     if (tab === "basic") {
    //         setTabPosition(0)
    //     } else if (tab === "addUsers") {
    //         setTabPosition(-600)
    //     }
    // }, [tab])


    // reset first tab when user close modal window
    useEffect(() => {
        if (!newEventData.isOpen) {
            setTab("basic")
        }
    }, [newEventData.isOpen]);

    useEffect(() => {
        if (newEventData.isEventCreateInitialize) {
            // console.log(newEventData)
            setEvents(prev => {
                let updateEvents = [...prev]
                let updateEventIndex = updateEvents.findIndex(evt => evt.isEventCreateInitialize)
                if (updateEventIndex !== -1) {
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


    // not implemented.
    const handleUpload = (files) => {
        // if (files) {
        //     setIsFileUploading(true)
        //     let formData = new FormData()
        //     formData.append("file", files)
        //     axios.post('/document/userdocumentfile', formData)
        //         .then(res => {
        //             setAttachments(prev => ([...prev, res.data.fileUrl]))
        //             setIsFileUploading(false)
        //             attachmentRef.current.value = null
        //         })
        //         .catch(err => {
        //             attachmentRef.current.value = null
        //             setIsFileUploading(false)
        //             console.log(err);
        //             message.error("Upload failed/Invalid file type")
        //         })
        // }
    }

    async function handleAddEvent(cb) {

        if(!auth){
            cb()
            return toast.error("To create meeting, you need to login first.")
        }

        let eventValidator = yup.object({
            title: yup.string().required("Meeting title required."),
            agenda: yup.string().required("Meeting agenda required."),
            invitations: yup.array()
        });


        try {
            const invitationUsers = newEventData.invitations.map(user => user._id) || []

            await eventValidator.validateSync({
                title: newEventData.title,
                agenda: newEventData.agenda,
                invitations: invitationUsers
            })


            let startDateTime = new Date(newEventData.startDateTime)
            let endDateTime = new Date(newEventData.endDateTime)

            if (newEventData.isAllDay) {
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
                description: newEventData.agenda,
                actionItems: newEventData.actionItems,
                followUp: newEventData.followUp,
                notifications: newEventData.notifications,
                meetingLink: newEventData.meetingLink,
                status: "pending",
                eventColor: newEventData.eventColor,
                attachments: null,
                invitations: invitationUsers
            }

            if (payload.start > payload.end) {
                cb()
                return toast.error("End time should be greater than Start time")
            }

            // if (payload.start < new Date()) {
            //     cb()
            //     return toast.error("Event start date only allow for current and future date")
            // }


            if (newEventData.updateEventId) {
                // devApi.put("/calendar/update/"+newEventData.updateEventId, payload).then(({data, status}) => {
                axios.patch("/api/calendar/edit/" + newEventData.updateEventId, payload).then(({data, status}) => {

                    toast.success("Event is successfully updated")

                    setCloseNewEventModal()
                    // addEvent(data.event)
                    setEvents(prev => {
                        let updateEvents = [...prev]
                        let updateEventIndex = updateEvents.findIndex(evt => evt._id === newEventData.updateEventId)
                        if (updateEventIndex !== -1) {
                            updateEvents[updateEventIndex] = {
                                ...updateEvents[updateEventIndex],
                                ...data.event
                            }
                            return updateEvents
                        } else {
                            return prev
                        }
                    })

                }).catch((ex) => {
                    toast.error(ex?.response?.data?.error)
                }).finally(() => {
                    cb()
                })

            } else {

                // devApi.post("/calendar/create", payload)
                axios.post("/api/calendar/create", payload)
                    .then(({data, status}) => {
                        setCloseNewEventModal()
                        toast.success("Event successfully created")
                        addEvent(data.event)

                    }).catch((ex) => {

                    toast.success(ex?.response?.data?.error)

                }).finally(() => {
                    cb()
                })
            }

        } catch (ex) {
            cb()
            return toast.error(ex.message)
        }
    }


    return (
        <div>
            <MultiStepModal isOpen={newEventData.isOpen} onClose={handleClose} className="add-event-multi-modal">
                <CSSTransition unmountOnExit={true} in={modalId === 1} timeout={400} classNames="modal-content">
                    <div className="modal-inner">
                        <BasicInfo
                            onClose={handleClose}
                            setModalId={setModalId}
                            handleAddEvent={handleAddEvent}
                            handleChange={handleChange}
                            setTab={setTab}
                            newEventData={newEventData}
                        />
                    </div>
                </CSSTransition>

                <CSSTransition unmountOnExit={true} in={modalId === 2} timeout={400} classNames="modal-content">
                    <div className="modal-inner">
                        <AddUser
                            setModalId={setModalId}
                            handleClose={handleClose}
                            handleChange={handleChange}
                            // setUserIdForTimeCheck={setUserIdForTimeCheck}
                            newEventData={newEventData}
                            setTab={setTab}
                        />
                    </div>

                </CSSTransition>


                <CSSTransition unmountOnExit={true} in={modalId === 3} timeout={400} classNames="modal-content">
                    <div className="modal-inner">
                        {/*<FindUserTime*/}
                        {/*    onClose={handleClose}*/}
                        {/*    setModalId={setModalId}*/}
                        {/*    handleClose={handleClose}*/}
                        {/*    handleChange={handleChange}*/}
                        {/*    newEventData={newEventData}*/}
                        {/*    userIdForTimeCheck={userIdForTimeCheck}*/}
                        {/*    // onChooseTimeRange={handleChooseTimeRange}*/}
                        {/*/>*/}
                    </div>
                </CSSTransition>

            </MultiStepModal>
        </div>
    );
};

export default AddEventModal;