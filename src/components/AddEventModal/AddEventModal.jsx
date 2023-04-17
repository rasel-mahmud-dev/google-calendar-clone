import React, {useContext, useEffect, useState} from 'react';
import Input from "../Form/Input";
import Modal from "../Modal/Modal";
import {BsClock, BsDash, FiClock, FiUsers, HiBars3BottomLeft, TiTimes} from "react-icons/all";
import RichTextEditor from "../Form/RichTextEditor/RichTextEditor";
import CalendarContext from "../../context/CalendarContext";
import ClickExpand from "../Form/ClickExpand/ClickExpand";

import "./style.scss"
import TextArea from "../Form/TextArea";
import BasicInfo from "./BasicInfo";
import AddUser from "./AddUser";
import EventModalTitle from "./EventModalTitle";


const AddEventModal = ({isOpenAddEventModal, onClose}) => {


    const {newEventData, setNewEventData} = useContext(CalendarContext)

    const [tab, setTab] = useState("basic")
    const [tabPosition, setTabPosition] = useState(0)


    function handleClose() {
        onClose()
    }


    function handleChange(value, name) {
        setNewEventData({
            [name]: value
        })
    }

    useEffect(()=>{
        if(tab === "basic"){
            setTabPosition(0)
        } else if(tab === "addUsers") {
            setTabPosition(-500)
        }
    }, [tab])


    return (
        <div>
            <Modal isOpen={isOpenAddEventModal} onClose={handleClose} className="add-event-modal">

                <div className="close-btn">
                    <TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={onClose}/>
                </div>

               <div className="tab-root" style={{transform:  `translateX(${tabPosition}px`}}>
                   <div className={`tab tab-one ${tab === "basic" ? "open-tab" : "hide-tab"}`}>
                       <BasicInfo
                           handleChange={handleChange}
                           setTab={setTab}
                           newEventData={newEventData}
                       />
                   </div>

                   <div className={`tab  tab-two ${tab === "addUsers" ? "open-tab" : "hide-tab"}`}>
                       <AddUser
                           handleClose={handleClose}
                           handleChange={handleChange}
                           newEventData={newEventData}
                           setTab={setTab}
                       />
                   </div>
               </div>

            </Modal>
        </div>
    );
};

export default AddEventModal;