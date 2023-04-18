import React, {useContext, useState} from 'react';
import Input from "../Form/Input";
import {
    BsBell,
    BsDash,
    FaAngleLeft,
    FiClock,
    FiUsers,
    HiBars3BottomLeft,
    RxTriangleDown,
    TfiAngleDown
} from "react-icons/all";
import ClickExpand from "../Form/ClickExpand/ClickExpand";
import TextArea from "../Form/TextArea";
import RichTextEditor from "../Form/RichTextEditor/RichTextEditor";
import EventModalTitle from "./EventModalTitle";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";

import TimeRange from "../TimeRange";


const BasicInfo = ({handleChange, newEventData, setTab, handleAddEvent}) => {
    const {
        newEventData: {invitations, startDate, endDate},
        setNewEventData
    } = useContext(CalendarContext)

    let date = dayjs(new Date(dayjs().year(), newEventData.monthIndex, newEventData.date))

    const [openDatePickerForm, setOpenDatePickerForm] = useState("")

    function renderDate(date) {
        return dayjs(date).format("MMMM D, YYYY")
    }

    let t = new Date()
    t.setDate(5)
    t.setMonth(4)


    const [defaultCustomTimeRepeat, setDefaultCustomTimeRepeat] = useState(null)

    const [timeRange, setTimeRange] = useState({
        startDateTime: new Date(),
        endDateTime: new Date(),
        tz: "est",
        isAllDay: false,  // every day this time.
        customTimeRepeat: null, // { iteration: 1,  period: "day", repeatDays: [] }
        repeatType: "no-repeat", // daily, weekly, monthly, yearly
    })

    const [disableEndDate, setDisableEndDate] = useState(false)


    /***** Toggle  24hours Meeting time *****/
    function handleSelectAllDay(val) {
        let _startDateTime = timeRange.startDateTime

        let now = new Date()


        // setup start date time
        if (val) {
            _startDateTime.setHours(12)
            _startDateTime.setMinutes(0)
        } else {
            _startDateTime.setHours(now.getHours())
            _startDateTime.setMinutes(now.getMinutes())
        }

        // setup end date time
        let _endDateTime = timeRange.endDateTime
        if (val) {
            _endDateTime.setHours(0)
            _endDateTime.setMinutes(0)
        } else {
            _endDateTime.setHours(now.getHours())
            _endDateTime.setMinutes(now.getMinutes())
        }

        setTimeRange(prev => ({
            ...prev,
            startDateTime: _startDateTime,
            endDateTime: _endDateTime,
            isAllDay: val
        }))
    }


    return (
        <div className="">


            <EventModalTitle onClose={() => {
            }}/>


            <div className="p-4">
                <div className="ml-12">
                    <Input className="" label="Add meeting title"
                           onChange={(e) => handleChange(e.target.value, "title")}
                           value={newEventData.title}/>
                </div>

                <div className="event-input-field flex items-start mt-6 ">
                    <div className="event-label-icon w-12">
                        <FiClock className="text-gray-600"/>
                    </div>

                    <div className="">
                        <TimeRange />
                    </div>

                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <FiUsers className="text-gray-600"/>
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
                        <img className="w-4" src="/icons/Google_Meet_icon.svg" alt="meet"/>
                    </div>


                    <ClickExpand label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Google meet or Zoom link </span>
                        </div>
                    )}>
                        <TextArea/>
                    </ClickExpand>

                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <HiBars3BottomLeft className="text-xl text-gray-600"/>
                    </div>

                    <ClickExpand label={({onPress}) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Description</span>
                        </div>
                    )}>
                        <RichTextEditor/>
                    </ClickExpand>

                </div>

                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-10">
                        <BsBell className="text-xl text-gray-600"/>
                    </div>

                    <div className="hover:bg-gray-100 p-2 rounded-md">
                        <span className="text-sm text-gray-600">Add Notification</span>
                    </div>


                </div>


                <div className="mt-20">
                    <button onClick={handleAddEvent} className="btn btn-primary">Add</button>
                </div>

            </div>


        </div>
    );
};

export default BasicInfo;