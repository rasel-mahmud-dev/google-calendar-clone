import React, {useEffect, useRef, useState} from 'react';
import Dropdown from "../Dropdown/Dropdown";


const render = {
    renderMinutes(min) {
        return min < 10 ? "0" + min : min
    },
    renderStatus(h) {
        let status = h === 12 ? "PM" : "AM"
        if (h >= 13) {
            status = "PM"
        }
        return status
    },
    renderHours(h) {
        let hour = h === 0 ? 12 : h
        if (h >= 13) {
            hour = h - 12
        }

        return hour < 10 ? "0" + hour : hour
    },
    renderMinutesFromDate(dateTime) {
        let min = dateTime.getMinutes()
        return this.renderMinutes(min)
    },
    renderStatusFromDate(dateTime) {
        let hour = dateTime.getHours()
        return this.renderStatus(hour)
    },

    renderHoursFromDate(dateTime) {
        let hour = dateTime.getHours()
        return this.renderHours(hour)
    }
}


let timeValue = []
let isStart = true

const TimeChoose = (props) => {

    const {
        className = "",
        dropdownClass = "",
        name,
        editFocus,
        setEditFocus,
        isOpen,
        onOpen,
        onClose,
        dateTime = new Date(),
        setDateTime
    } = props

    const [active, setActive] = useState(false)

    const [status, setStatus] = useState("AM")

    const [startHoursOption, setHoursOption] = useState([])

    const timeEditAbleRef = useRef("")
    const timeStateRef = useRef("")

    useEffect(() => {
        setActive(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (dateTime) {
            let h = dateTime.getHours()
            if (h >= 12) {
                setStatus("PM")
            } else {
                setStatus("AM")
            }
        }
    }, [dateTime])

    useEffect(() => {
        setHoursOption(getHoursForFullDay())
    }, [])


    function handleToggle() {
        setEditFocus(name)
        if (isOpen) {
            onClose()
        } else {
            onOpen()
        }
    }

    function handleBlur() {
        // onClose()
    }

    function getHoursForFullDay() {
        let hours = []

        let allMinutes = [0, 15, 30, 45]

        for (let i = 0; i <= 23; i++) {
            let h = i

            for (let j = 0; j < allMinutes.length; j++) {
                let minPart = allMinutes[j]
                let mm = {h24: i, h: h, min: minPart}
                hours.push(mm)
            }
        }
        return hours
    }

    const [timeEditAble, setTimeEditAble] = useState("h")


    function onChangeTimeEditAble(where) {

        setTimeEditAble(where)
        timeEditAbleRef.current = where
    }

    // useEffect(() => {
    // 	window.addEventListener("keydown", handleKeyChange)
    // 	// REMOVE LISTENER FUNCTION WHEN OUR COMPONENT IS UNMOUNTED
    // 	return () => window.removeEventListener("keydown", handleKeyChange)
    // }, [])

    useEffect(() => {
    }, [])

    function changeTimeNumber(key) {

        if (timeEditAbleRef.current === "m") {
            if (isStart) {
                if (key < 6) {
                    timeValue[0] = key
                    isStart = false

                } else {
                    timeValue[1] = key
                    isStart = true
                }
            } else {
                timeValue[1] = key
                isStart = true
            }

        } else {
            if (isStart) {
                if (key === 1) {
                    timeValue[0] = 1
                    isStart = false
                } else if (key === 0) {
                    timeValue[0] = 0
                    isStart = false
                } else {
                    timeValue[1] = key
                    isStart = true
                }
            } else {
                timeValue[1] = key
                isStart = true
            }
        }
    }


    function handleChangeType(type, dateTime) {
        let backupDate = dateTime.getDate()
        let h = dateTime.getHours()
        if (type === "PM") {
            setStatus("PM")
            dateTime.setHours(h + 12)
        } else {
            setStatus("AM")
            dateTime.setHours(h - 12)
        }
        
        dateTime.setDate(backupDate)
        setDateTime(dateTime)
    }


    function handleKeyChange(e) {

        if (editFocus === name) {


            let key = Number(e.key)

            if (!isNaN(key)) {
                let cpDateTime = new Date(dateTime)

                changeTimeNumber(key)

                let count = ""
                timeValue.forEach(item => {
                    count += String(item)
                })


                if (timeEditAbleRef.current === "h") {
                    cpDateTime.setHours(count)
                }

                if (timeEditAbleRef.current === "m") {
                    cpDateTime.setMinutes(count)
                    cpDateTime.setHours(dateTime.getHours())
                }

                if (timeEditAbleRef.current === "s") {

                    // cpDateTime.setHours(count)
                }

                setDateTime(cpDateTime)

            } else {

                let alpha = e.key.toUpperCase()

                if (alpha === "A") {
                    timeStateRef.current = "AM"
                    handleChangeType("AM", dateTime)

                } else if (alpha === "P") {
                    timeStateRef.current = "PM"
                    handleChangeType("PM", dateTime)
                }


                if (e.keyCode === 39) {
                    if (timeEditAbleRef.current === "h") {
                        timeEditAbleRef.current = "m"
                    } else if (timeEditAbleRef.current === "m") {
                        timeEditAbleRef.current = "s"
                    } else if (timeEditAbleRef.current === "s") {
                        timeEditAbleRef.current = "h"
                    }
                }

                if (e.keyCode === 37) {
                    if (timeEditAbleRef.current === "h") {
                        timeEditAbleRef.current = "s"
                    } else if (timeEditAbleRef.current === "m") {
                        timeEditAbleRef.current = "h"
                    } else if (timeEditAbleRef.current === "s") {
                        timeEditAbleRef.current = "m"
                    }
                }

                setTimeEditAble(timeEditAbleRef.current)
            }

        }
    }

    function handleBlurTimeWriter() {
        setEditFocus("")
    }

    function handleOnTimeChange(time) {
        const {h24, min} = time
        let cpDate = new Date(dateTime)

        cpDate.setHours(h24)
        cpDate.setMinutes(min)
        cpDate.setDate(dateTime.getDate())
        setDateTime(cpDate)

        onClose && onClose()
    }




    return (
        <div className={className}>
            <li className="relative cursor-pointer mui-select"  tabIndex="-1" aria-hidden={true}>
                <Dropdown className={dropdownClass} onChange={handleOnTimeChange} isOpen={isOpen} render={(onChange) => (
                    <ul className="text-center">

                        {startHoursOption.map((hour, index) => (
                            <li key={index} onClick={() => onChange(hour)}
                                className="hover:bg-blue-400 py-1 px-2 cursor-pointer hover:text-white mui-select-item">

                                {render.renderHours(hour.h)}:
                                {render.renderMinutes(hour.min)}
                                <span className="ml-1">{render.renderStatus(hour.h).toUpperCase()}</span>
                            </li>
                        ))}
                    </ul>
                )}/>
                <div tabIndex={-1} onKeyDown={handleKeyChange} onBlur={handleBlurTimeWriter}
                     className="font-medium text-gray-600 hover:bg-gray-100 cursor-pointer py-2 rounded relative  "
                     onClick={handleToggle}>
                    <span className="px-2 mui-select-placeholder">
                        <span className={`${editFocus === name && timeEditAble === "h" ? "editable-time" : ""}`}
                              onClick={() => onChangeTimeEditAble("h")}>{render.renderHoursFromDate(dateTime)}</span>
                        :
                        <span className={`${editFocus === name && timeEditAble === "m" ? "editable-time" : ""}`}
                              onClick={() => onChangeTimeEditAble("m")}>{render.renderMinutesFromDate(dateTime)}</span>
                        <span className={`${editFocus === name && timeEditAble === "s" ? "editable-time" : ""} ml-1`}
                              onClick={() => onChangeTimeEditAble("s")}>{render.renderStatusFromDate(dateTime)}</span>
                    </span>
                    <div className={`input-border ${active ? "input-border-active" : "input-border-inactive"} `}></div>
                </div>
            </li>
        </div>
    );
};


export default TimeChoose;
