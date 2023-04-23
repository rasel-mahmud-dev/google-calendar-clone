import React, {useContext} from 'react';
import {BiChevronLeft, BiChevronRight, BiInfoCircle, BiSearch, BsGear} from "react-icons/all";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";
import Select from "../Form/Select";
import {useNavigate, useParams} from "react-router-dom";


const Header = () => {

    const {monthIndex,  selectedDate, setMonthIndex, date, setCalendar, setCalendarView, calendarView} = useContext(CalendarContext)

    const navigate = useNavigate()

    function jumpNextMonth() {
        let updateSelectedDate = new Date(selectedDate)
        if (view === "day") {
            updateSelectedDate.setDate(selectedDate.getDate() + 1)
            let dd= dayjs(updateSelectedDate).format("MM-DD-YYYY")


            navigate(`/calendar/day?date=` + dd)

        } else {
            updateSelectedDate.setMonth(updateSelectedDate.getMonth() + 1)
        }

        setCalendar({
            selectedDate: updateSelectedDate
        })
    }


    function jumpPrevMonth() {
        let updateSelectedDate = new Date(selectedDate)
        if (view === "day") {
            updateSelectedDate.setDate(selectedDate.getDate()-1)
            let dd= dayjs(updateSelectedDate).format("MM-DD-YYYY")

            setCalendar({
                selectedDate: updateSelectedDate
            })
            navigate(`/calendar/day?date=` + dd)

        } else {
            updateSelectedDate.setMonth(updateSelectedDate.getMonth() - 1)
        }

        setCalendar({
            selectedDate: updateSelectedDate
        })
    }


    function resetDate() {
        let now = new Date()
        setCalendar({
            selectedDate: now
        })
        if (view === "day") {
            let dd= dayjs(now ).format("MM-DD-YYYY")
            navigate(`/calendar/day?date=` + dd)
        }
    }

    function handleChangeCalendarView(componentName){
        setCalendarView(componentName)
        navigate("/calendar/" + componentName)
    }

    const params = useParams()
    let view = params.view || "month"

    return (
        <header className="flex justify-between py-3 px-3 border-b">
            <div className="flex items-center gap-x-1">
                <div className="flex items-center gap-x-1 ">
                    <img className="w-10"
                         src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_16_2x.png"
                         alt=""/>
                    <h4 className="text-sm font-bold">Calendar</h4>
                </div>

                <div className="col-span-10 flex items-center ml-10 gap-x-4">
                    <button className="btn" onClick={resetDate}>Today</button>

                    <div className="flex items-center gap-x-2">
                        <li className="btn btn-circle list-none text-2xl" onClick={jumpPrevMonth}>
                            <BiChevronLeft/>
                        </li>
                        <li className="btn btn-circle list-none text-2xl" onClick={jumpNextMonth}>
                            <BiChevronRight/>
                        </li>
                    </div>


                    {/***** selected date *****/}
                    <div>
                        <h4 className="font-semibold">
                            {dayjs(new Date(selectedDate)).format(
                                view === "day" ? "MMMM DD YYYY" : "MMMM YYYY"
                            )}
                        </h4>
                    </div>


                </div>
            </div>

            <div className="flex items-center gap-x-8 col-span-6">
                <div className="flex items-center gap-x-4 col-span-6">
                    <li className="list-none text-2xl">
                        <BiSearch/>
                    </li>

                    <li className="list-none text-xl">
                        <BiInfoCircle/>
                    </li>
                    <li className="list-none text-xl">
                        <BsGear/>
                    </li>
                </div>

                <Select
                    withBg={true}
                    value={calendarView}
                    dropdownClass=""
                    onChange={handleChangeCalendarView}
                    renderPlaceholderValue=""
                    placeholderClass=""
                    render={(click) => (
                        <div>
                            <li onClick={()=>click("day")} className="mui-select-item">Day</li>
                            <li onClick={()=>click("week")} className="mui-select-item">Week</li>
                            <li onClick={()=>click("month")} className="mui-select-item">Month</li>
                        </div>
                    )}>

                </Select>
            </div>
        </header>
    )
};

export default Header;