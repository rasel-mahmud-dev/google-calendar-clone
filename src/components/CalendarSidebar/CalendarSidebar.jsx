import React, {useEffect, useState} from 'react';
import {plus} from "../../icons/plus";
import {BiCaretDown, BiChevronDown, BiChevronRight, TfiAngleDown, TfiAngleRight} from "react-icons/all";
import Popup from "../Popup/Popup";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import Accordion from "../Accordion/Accordion";
import statusColors from "../../utils/statusColors";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

const CalendarSidebar = (props) => {

    const MYID = "6422af5d9153de6adce3b085"

    const {
        openAddNewEventModal,
        isOpenChooseEventModal,
        setOpenChooseEventModal,
        events,
    } = props

    const navigate = useNavigate()
    useEffect(() => {
        if (events.length > 0) {
            setMyCreatedEvent(events.filter(evt => evt.createdBy._id === MYID))
            setInvitedMe(events.filter(evt => evt.invitations.includes(MYID)))
        }
    }, [events])


    const [expandItems, setExpandItems] = useState([1])


    const [invitedMe, setInvitedMe] = useState([])
    const [myCreatedEvent, setMyCreatedEvent] = useState([])

    const [accItemShowContentLen, setAccItemShowContentLen] = useState({
        1: 5,
        2: 5
    })


    function handleToggle(id) {
        if (expandItems.includes(id)) {
            setExpandItems(expandItems.filter(i => i !== id))
        } else {
            setExpandItems([...expandItems, id])
        }

        setAccItemShowContentLen(prev => ({
            ...prev,
            [id]: 5
        }))

    }

    function handleExpandAccContent(e, id, len) {
        e.stopPropagation();

        if (accItemShowContentLen[id] === 5) {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: len
            }))
        } else {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: 5
            }))
        }
    }

    function sortByStatusPending(arr) {
        return arr
    }
    
    
    
    function handleChangeDateOnSmallCalendar(date){
        let d = dayjs(date).format("MM-DD-YYYY")
        navigate(`/calendar/day?date=` + d)
    }
    


    return (
        <div className="sidebar">
            <div className="calendar-page relative">
                <button className="btn flex items-center rounded-full shadow-lg mt-4 add-new-btn"
                        onClick={() => setOpenChooseEventModal(true)}>
                    <div dangerouslySetInnerHTML={{__html: plus}}></div>
                    <span className="mr-4 font-medium text-sm">Create</span>
                    <BiCaretDown/>
                </button>

                <Popup className="rounded-lg px-0 py-1 absloute w-40 left-0 top-14"
                       onClose={() => setOpenChooseEventModal(false)}
                       isOpen={isOpenChooseEventModal}>
                    <div>
                        <li onClick={() => openAddNewEventModal("event")}
                            className="text-sm cursor-pointer list-none hover:bg-gray-100 py-2 px-2">Event
                        </li>
                        <li onClick={() => openAddNewEventModal("task")}
                            className="text-sm cursor-pointer list-none hover:bg-gray-100 py-2 px-2">Task
                        </li>
                    </div>
                </Popup>
            </div>

            <div className="sidebar-scroll">

                <SmallCalendar onChange={handleChangeDateOnSmallCalendar}/>

                <br/>
                <br/>
                <br/>


                <Accordion openIds={expandItems}>
                    <Accordion.Item
                        dataId={1}
                        header={(isOpen) => (
                            <div
                                className="accordion-header flex items-center justify-between"
                                onClick={() => handleToggle(1)}>

                                <h4 className="">My Calendar</h4>
                                {isOpen
                                    ? <BiChevronDown className="text-xs text-gray-500"/>
                                    : <BiChevronRight className="text-xs text-gray-500"/>
                                }
                            </div>
                        )}
                    >

                        <div className="accordion-content">
                            {sortByStatusPending(myCreatedEvent.slice(0, accItemShowContentLen[1])).map(evt => (
                                <div className="accordion-li">
                                    <h4 className="flex items-center">
                                        <div className="col-span-1">
                                            <div style={{background: statusColors[evt.status]}}
                                                 className="w-3 h-3 rounded-full block"></div>
                                        </div>
                                        <div className="ml-2">
                                            <span className="accordion-content-title">{evt.title}</span>
                                        </div>
                                    </h4>
                                </div>
                            ))}


                            {/*** Toggle expand / Collapse button ****/}
                            {myCreatedEvent.length > 0 && <div className="accordion-li  hover:bg-blue-100 p-1 rounded"
                                                               onClick={(e) => handleExpandAccContent(e, 1, myCreatedEvent.length)}>
                                <div className="ml-4 flex items-center justify-between">
                                    <label htmlFor=""
                                           className="font-medium">
                                        {accItemShowContentLen[1] === 5 ? "Show more" : "Show less"}</label>
                                    <BiChevronDown/>
                                </div>
                            </div>}


                        </div>

                    </Accordion.Item>


                    <Accordion.Item dataId={2} onClick={() => handleToggle(2)}
                                    header={(isOpen) => (
                                        <div className="accordion-header flex items-center justify-between">
                                            <h4 className="">My Invitations</h4>
                                            {isOpen
                                                ? <BiChevronDown className="text-xs text-gray-500"/>
                                                : <BiChevronRight className="text-xs text-gray-500"/>
                                            }
                                        </div>
                                    )}>


                        <div className="accordion-content">

                            {invitedMe.slice(0, accItemShowContentLen[2]).map(evt => (
                                <div className="accordion-li">
                                    <h4 className="flex items-center">
                                        <div className="col-span-1">
                                            <div style={{background: statusColors[evt.status]}}
                                                 className="w-3 h-3 rounded-full block"></div>
                                        </div>
                                        <div className="ml-2">
                                            <span className="accordion-content-title">{evt.title}</span>
                                        </div>
                                    </h4>
                                </div>
                            ))}


                            {/*** Toggle expand / Collapse button ****/}
                            {invitedMe.length > 0 && <div className="accordion-li  hover:bg-blue-100 p-1 rounded"
                                                          onClick={(e) => handleExpandAccContent(e, 2, invitedMe.length)}>
                                <div className="ml-4 flex items-center justify-between">
                                    <label htmlFor=""
                                           className="font-medium">
                                        {accItemShowContentLen[2] === 5 ? "Show more" : "Show less"}</label>
                                    <BiChevronDown/>
                                </div>
                            </div>}


                        </div>
                    </Accordion.Item>

                </Accordion>
            </div>

            {/*<SmallCalendarV2/>*/}
        </div>

    );
};

export default CalendarSidebar;