import React, {useContext, useEffect, useRef, useState} from 'react';
import Input from "../Form/Input";

import ClickExpand from "../Form/ClickExpand/ClickExpand";
import TextArea from "../Form/TextArea";
import EventModalTitle from "./EventModalTitle";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";

import TimeRange from "../TimeRange";
import {FiUsers} from "react-icons/all";
import ColorPicker from "../ColorPicker/ColorPicker.jsx";
import AddNotification from "./AddNotification";


const BasicInfo = ({handleChange, setTab, handleAddEvent}) => {
    const {
        newEventData: {
            invitations,
            agenda,
            title,
            monthIndex,
            date: eventDate,
            notifications,
            followUp,
            meetingLink,
            actionItems,
            eventColor,
            startDate,
            endDate,
            updateEventId
        },
        setNewEventData
    } = useContext(CalendarContext)

    let date = dayjs(new Date(dayjs().year(), monthIndex, eventDate))

    const eventNameRef = useRef()


    let t = new Date()
    t.setDate(5)
    t.setMonth(4)

    useEffect(()=>{
        eventNameRef?.current?.focus()
    }, [])


    return (
        <div className="">

            <EventModalTitle title={updateEventId ? "Update Event" : "Add New Event"} onClose={() => {
            }}/>

            <div className="p-4">
                <div className="ml-12">
                    <Input ref={eventNameRef} className="" label="Add meeting title"
                           onChange={(e) => handleChange(e.target.value, "title")}
                           value={title}/>
                </div>

                <div className="event-input-field flex items-start mt-6 ">
                    <div className="event-label-icon w-12">

                        <img className="w-5" src="/icons/schedule.svg" alt="agenda"/>

                        {/*<FiClock className="text-gray-600"/>*/}
                    </div>

                    <div className="">
                        <TimeRange/>
                    </div>

                </div>

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-5" src="/icons/bell.svg" alt="bell"/>
                    </div>
                    <ColorPicker value={eventColor} onChange={(colorName)=>handleChange(colorName, "eventColor")} />
                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-5" src="/icons/users.svg" alt="agenda"/>
                        {/*<FiUsers className="text-gray-600"/>*/}
                    </div>

                    <div className="w-full">
                        <div onClick={() => setTab("addUsers")} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Add Invitation</span>
                        </div>

                        {/**** selected users ****/}
                        <div onClick={() => setTab("addUsers")}
                             className="flex flex-wrap items-center gap-x-0 users-avatar-list mt-1">
                            {invitations.map(user => (
                                <div className="user-avatar">
                                    <img src={user.image} className="rounded-full" alt=""/>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-4" src="/icons/agenda.svg" alt="agenda"/>
                    </div>


                    <ClickExpand initialOpen={!!agenda} label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Agenda</span>
                        </div>
                    )}>
                        <TextArea
                            onChange={(e) => handleChange(e.target.value, "agenda")}
                            value={agenda}/>
                    </ClickExpand>

                </div>

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <div className="w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="message">
                                <path fill="#595bd4"
                                      d="M14.939,0 C16.28,0 17.57,0.53 18.519,1.481 C19.469,2.43 20,3.71 20,5.05 L20,5.05 L20,12.95 C20,15.74 17.73,18 14.939,18 L14.939,18 L5.06,18 C2.269,18 0,15.74 0,12.95 L0,12.95 L0,5.05 C0,2.26 2.259,0 5.06,0 L5.06,0 Z M16.07,5.2 C15.86,5.189 15.66,5.26 15.509,5.4 L15.509,5.4 L11,9 C10.42,9.481 9.589,9.481 9,9 L9,9 L4.5,5.4 C4.189,5.17 3.759,5.2 3.5,5.47 C3.23,5.74 3.2,6.17 3.429,6.47 L3.429,6.47 L3.56,6.6 L8.11,10.15 C8.67,10.59 9.349,10.83 10.06,10.83 C10.769,10.83 11.46,10.59 12.019,10.15 L12.019,10.15 L16.53,6.54 L16.61,6.46 C16.849,6.17 16.849,5.75 16.599,5.46 C16.46,5.311 16.269,5.22 16.07,5.2 Z"
                                      transform="translate(2 3)" className="color200e32 svgShape"></path>
                            </svg>
                        </div>
                    </div>


                    <ClickExpand initialOpen={!!followUp} label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Follow Up message</span>
                        </div>
                    )}>
                        <TextArea
                            onChange={(e) => handleChange(e.target.value, "followUp")}
                            value={followUp}
                        />
                    </ClickExpand>

                </div>

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-4" src="/icons/action-item.svg" alt="meet"/>
                    </div>


                    <ClickExpand initialOpen={!!actionItems} label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Action Item</span>
                        </div>
                    )}>
                        <TextArea
                            onChange={(e) => handleChange(e.target.value, "actionItems")}
                            value={actionItems}/>
                    </ClickExpand>

                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-5" src="/icons/link.svg" alt="meet"/>
                    </div>


                    <ClickExpand initialOpen={!!meetingLink} label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Meeting link</span>
                        </div>
                    )}>
                        <TextArea
                            onChange={(e) => handleChange(e.target.value, "meetingLink")}
                            value={meetingLink}
                        />
                    </ClickExpand>

                </div>

                {/*<div className="event-input-field flex items-start mt-3">*/}
                {/*    <div className="event-label-icon w-12">*/}
                {/*        <HiBars3BottomLeft className="text-xl text-gray-600"/>*/}
                {/*    </div>*/}

                {/*    <ClickExpand label={({onPress}) => (*/}
                {/*        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">*/}
                {/*            <span className="text-sm text-gray-600">Description</span>*/}
                {/*        </div>*/}
                {/*    )}>*/}
                {/*        <RichTextEditor/>*/}
                {/*    </ClickExpand>*/}
                {/*</div>*/}

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-5" src="/icons/bell.svg" alt="bell"/>
                    </div>
                    
                    <ClickExpand initialOpen={!!meetingLink} label={({onPress}) => (
                        <AddNotification values={notifications}  onChange={(val)=>handleChange(val, "notifications")} onPress={onPress} />
                        
                    )}>
                    
                    
                    </ClickExpand>
                    
                    
                    {/*<div className="hover:bg-gray-100 p-2 rounded-md">*/}
                    {/*    <span className="text-sm text-gray-600">Add Notification</span>*/}
                    {/*</div>*/}
                </div>
                


                <div className="mt-4">
                    <button onClick={handleAddEvent} className="btn btn-primary">Add</button>
                </div>
            </div>

        </div>
    );
};

export default BasicInfo;