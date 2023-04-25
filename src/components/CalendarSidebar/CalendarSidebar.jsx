import React, {useEffect, useState} from 'react';
import {plus} from "../../icons/plus";
import {BiCaretDown, BiChevronDown, BiChevronRight} from "react-icons/all";
import Popup from "../Popup/Popup";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import Accordion from "../Accordion/Accordion";
import statusColors from "../../utils/statusColors";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {colors} from "../ColorPicker/ColorPicker";


const CalendarSidebar = (props) => {

    const {
        openAddNewEventModal,
        isOpenChooseEventModal,
        setOpenChooseEventModal,
        events,
        setCalendar,
        setFilterEvent,
        filterEvents,
        auth,
    } = props

    const navigate = useNavigate()

    useEffect(() => {
        if (events.length > 0) {
            setMyCreatedEvent(events.filter(evt => evt.createdBy._id === auth._id))
            setInvitedMe(events.filter(evt => evt.invitations.includes(auth._id)))
        }
    }, [events])
    
    

    const [expandItems, setExpandItems] = useState([1, 2])
    
    const [invitedMe, setInvitedMe] = useState([])
    const [myCreatedEvent, setMyCreatedEvent] = useState([])

    const [accItemShowContentLen, setAccItemShowContentLen] = useState({
        1: 5,
        2: 10
    })


    function handleToggle(id) {
        if (expandItems.includes(id)) {
            setExpandItems(expandItems.filter(i => i !== id))
        } else {
            setExpandItems([...expandItems, id])
        }

        setAccItemShowContentLen(prev => ({
            ...prev,
            [id]: accItemShowContentLen[id]
        }))

    }

    function handleExpandAccContent(e, id, len) {
        e.stopPropagation();

        if (accItemShowContentLen[id] !== len) {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: len
            }))
        } else {
            setAccItemShowContentLen(prev => ({
                ...prev,
                [id]: 10
            }))
        }
    }

    function sortByStatusPending(arr) {
        return arr
    }
    
    function sortByDate(arr) {
        arr.sort((a, b)=>{
            let aDate = new Date(a.start)
            let bDate = new Date(b.start)
            return bDate - aDate
            if(aDate < bDate) {
                return 1
            } else if(aDate > bDate) {
                return  -1
            } else {
                return 0
            }
        })
        return arr
    }
    
    
    function handleChangeDateOnSmallCalendar(date){
        let d = dayjs(date)
        setCalendar({
            selectedDate: date
        })
        navigate(`/calendar/day?date=` + d.format("MM-DD-YYYY"))
    }
    
    function handleChangeFilterEvent(status){
        setFilterEvent(status)
    }
    
    function handleOpenEventDetailRoute(eventId){
        let to = "/calendar/month?detail="
        if(eventId){
            to += eventId
        }
        navigate(to)
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
                            {/*{sortByStatusPending(myCreatedEvent.slice(0, accItemShowContentLen[1])).map(evt => (*/}
                            {/*    <div className="accordion-li" key={evt._id}>*/}
                            {/*        <h4 className="flex items-center">*/}
                            {/*            <div className="col-span-1">*/}
                            {/*                <div style={{background:  colors[evt.eventColor] || statusColors[evt.status]}}*/}
                            {/*                     className="w-3 h-3 rounded-full block"></div>*/}
                            {/*            </div>*/}
                            {/*            <div className="ml-2">*/}
                            {/*                <span className="accordion-content-title">{evt.title}</span>*/}
                            {/*            </div>*/}
                            {/*        </h4>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                            
                            
                            {/*/!*** Toggle expand / Collapse button ****!/*/}
                            {/*{myCreatedEvent.length > 0 && <div*/}
                            {/*    className="accordion-li  hover:bg-blue-100 p-1 rounded"*/}
                            {/*    onClick={(e) => handleExpandAccContent(e, 1, myCreatedEvent.length)}>*/}
                            {/*    <div className="ml-4 flex items-center justify-between">*/}
                            {/*        <label htmlFor=""*/}
                            {/*               className="font-medium">*/}
                            {/*            {accItemShowContentLen[1] === 5 ? "Show more" : "Show less"}</label>*/}
                            {/*        <BiChevronDown/>*/}
                            {/*    </div>*/}
                            {/*</div>}*/}
                            
                            
                            {Object.keys(statusColors).map(status=>(
                                <div className="flex items-center gap-x-1 mb-1">
                                    <input onChange={()=>handleChangeFilterEvent(status)} checked={filterEvents.includes(status)} type="checkbox" id={status} name={status}/>
                                    <label className="text-sm font-normal px-2 rounded py-px text-gray-900 hover:bg-gray-100 " style={{color : statusColors[status]}} htmlFor={status}>{status.toUpperCase()}</label>
                                    {/*<label className="text-sm font-normal px-2 rounded py-px text-gray-100 " style={{background: statusColors[status]}} htmlFor={status}>{status}</label>*/}
                                </div>
                            ))}
                            
                        </div>
                    </Accordion.Item>


                    <Accordion.Item dataId={2}
                        header={(isOpen) => (
                            <div onClick={() => handleToggle(2)} className="accordion-header flex items-center justify-between">
                                <h4 className="">My Events</h4>
                                {isOpen
                                    ? <BiChevronDown className="text-xs text-gray-500"/>
                                    : <BiChevronRight className="text-xs text-gray-500"/>
                                }
                            </div>
                        )}>


                        <div className="accordion-content">
                            {sortByDate(events).slice(0, accItemShowContentLen[2]).map(evt => (
                                <div className="accordion-li mt-1 hover:bg-gray-100" key={evt._id} onClick={()=>handleOpenEventDetailRoute(evt._id)} >
                                    <h4 className="flex items-center">
                                        <div className="col-span-1">
                                            <div style={{background:  colors[evt.eventColor] || statusColors[evt.status]}}
                                                 className="w-3 h-3 rounded-full block"></div>
                                        </div>
                                        <div className="ml-2">
                                            <span className="accordion-content-title">{evt.title}</span>
                                        </div>
                                    </h4>
                                </div>
                            ))}
                            
                            {/*** Toggle expand / Collapse button ****/}
                            {events.length > 0 && (
                                <div className="accordion-li  hover:bg-blue-100 p-1 rounded"
                                     onClick={(e) => handleExpandAccContent(e, 2, events.length)}>
                                    <div className="ml-4 flex items-center justify-between">
                                        <label htmlFor=""
                                               className="font-medium">
                                            Show {accItemShowContentLen[2] !== events.length ? " more" : " less"}</label>
                                        <BiChevronDown/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default CalendarSidebar;