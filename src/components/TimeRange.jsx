import React, {useContext, useEffect, useState} from 'react';
import {BiMinus} from "react-icons/bi";

import DatePicker from "../components/DatePicker/DatePicker";
import TimeChoose from "../components/TimeChoose/TimeChoose";
import CustomTime, {days} from "./CustomTime";
import {RxTriangleDown} from "react-icons/all";
import CalendarContext from "../context/CalendarContext";


const TimeRange = ({disableTimeLoop = false}) => {


        const [editFocus, setEditFocus] = useState("")




        const {
            newEventData: {timeRange},
            setTimeRange,
            setNewEventData

        } = useContext(CalendarContext)


        const [openDropDown, setOpenDropDown] = useState("")
        const [isOpenCustomTimeRepeat, openCustomTimeRepeat] = useState(false)

        const [timeEditAble, setTimeEditAble] = useState("h")
        const [whereTimeEditAble, setWhereTimeEditAble] = useState("")

        function handleSetAllDay(checked) {
            setTimeRange(prev => ({...prev, isAllDay: checked}))

        }

        let today = new Date()
        today.setDate(today.getDate() - 1)


        function dropdownClose() {
            setOpenDropDown("")
        }

        function handleSaveCustomTime(data) {
            setTimeRange(prev => ({
                ...prev,
                ...data,
            }))
        }


        function renderCustomIteration() {
            let out = ""
            let daysString = ""

            if (timeRange.repeatDays.length > 0) {
                timeRange.repeatDays.forEach(item => {
                    daysString += `${days[item]}, `
                })
                daysString = daysString.substring(0, daysString.length - 2)
            }

            if (timeRange.turnOn) {
                if (timeRange.repeatIteration === 1) {
                    out = `Every ${timeRange.repeatPeriod} on ${daysString}  `
                } else {
                    out = `Every ${timeRange.repeatIteration} ${timeRange.repeatPeriod} on ${daysString}  `
                }
                return out
            } else {
                return false
            }
        }

        function handleChangeDate(date, isStart = true){
            console.log(date)
        }

        function handleChangeTime(time, isStart = true){
            console.log(time)
        }


        return (
            <div className="relative">
                <div
                    className={`flex gap-x-4 items-center list-none text-gray-600 time_range ${timeRange.disabledEditTimeRange ? "read-only-timerange" : ""}`}>

                    {/******* start time ******/}

                    <div className="flex items-center list-none text-gray-600">

                        <div className="flex items-center">
                            {/******* start time ******/}
                            <DatePicker
                                isOpen={openDropDown === "start"}
                                tileDisabled={({date}) => date < today}
                                dateTime={timeRange.startDateTime}
                                setDateTime={(d) => handleChangeDate(d)}
                                onOpen={() => setOpenDropDown("start")}
                                onClose={dropdownClose}
                            />

                            {!timeRange.isAllDay &&
                             <TimeChoose
                                className=""
                                name="start"
                                editFocus={editFocus}
                                setEditFocus={setEditFocus}
                                isOpen={openDropDown === "startTime"}
                                dateTime={timeRange.startDateTime}
                                setDateTime={(d) => handleChangeTime(d)}
                                onOpen={() => setOpenDropDown("startTime")}
                                onClose={dropdownClose}
                            /> }
                        </div>

                        <span className="px-2"><BiMinus/></span>

                        {/******* end time ******/}
                        <div className="flex items-center">
                            <DatePicker
                                isOpen={openDropDown === "end"}
                                dropdownClass="left-auto -right-20"
                                dateTime={timeRange.endDateTime}
                                setDateTime={(d) => handleChangeDate(d, false)}
                                onOpen={() => setOpenDropDown("end")}
                                onClose={dropdownClose}
                            />

                            {!timeRange.isAllDay && <TimeChoose
                                isOpen={openDropDown === "endTime"}
                                dateTime={timeRange.endDateTime}
                                name="end"
                                editFocus={editFocus}
                                setEditFocus={setEditFocus}
                                setDateTime={(d) => handleChangeTime(d, false)}
                                onOpen={() => setOpenDropDown("endTime")}
                                onClose={dropdownClose}
                            /> }

                        </div>
                    </div>
                </div>


                {!disableTimeLoop && <div className=" mt-2 gap-x-6">

                    <div className="flex items-center  gap-x-2">
                        <div className="flex flex-row w-max gap-x-2 ml-2  ">

                            <input
                                checked={timeRange.isAllDay}
                                onChange={(e) => handleSetAllDay(e.target.checked)}
                                type="checkbox" className="cursor-pointer" name="allDay" id="allDay"/>
                            <label className="text-sm text-gray-500 cursor-pointer w-12" htmlFor="allDay">All
                                Day</label>
                        </div>

                        <div className="relative">
                            <button onClick={() => openCustomTimeRepeat(!isOpenCustomTimeRepeat)}
                                    className="flex items-center gap-x-1 !px-2 btn btn-mui text-sm text-gray-500">
                                <span> {renderCustomIteration() ? renderCustomIteration() : "Does not repeat"}</span>
                                <RxTriangleDown className="text-base text-gray-400"/>
                            </button>

                            <CustomTime
                                dropdownClass={"!absolute custom-repeat-time-modal"}
                                isOpen={isOpenCustomTimeRepeat}
                                initialCustomTimeRepeat={timeRange}
                                onClose={() => openCustomTimeRepeat(false)}
                                onSubmit={handleSaveCustomTime}
                            />

                        </div>
                    </div>

                    {/*<button onClick={() => openCustomTimeRepeat(true)} className="mui-btn">*/}
                    {/*    {renderCustomIteration() ? renderCustomIteration() : "No Repeat"}*/}
                    {/*</button>*/}

                </div>
                }


            </div>
        );
    }
;


export default TimeRange;