import React, {useContext, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import {TiTimes} from "react-icons/all";
import CalendarContext from "../../context/CalendarContext";

import "./style.scss"
import BasicInfo from "./BasicInfo";
import AddUser from "./AddUser";


const AddEventModal = ({isOpenAddEventModal, onClose}) => {


    const {newEventData, setNewEventData, setCloseNewEventModal} = useContext(CalendarContext)

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


    return (
        <div>
            <Modal isOpen={newEventData.isOpen} onClose={handleClose} className="add-event-modal">

                <div className="close-btn">
                    <TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={handleClose}/>
                </div>

                <div className="tab-root" style={{transform: `translateX(${tabPosition}px`}}>
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