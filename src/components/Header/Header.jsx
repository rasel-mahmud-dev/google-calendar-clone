import React, {useContext} from 'react';
import {BiChevronLeft, BiChevronRight, BiInfoCircle, BiSearch, BsGear} from "react-icons/all";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";


const Header = () => {

    const {monthIndex, setMonthIndex, setCalendar} = useContext(CalendarContext)

    function jumpNextMonth() {
        setMonthIndex(monthIndex  + 1)
    }

    function jumpPrevMonth() {
        setMonthIndex(monthIndex - 1)
    }

    function resetDate() {
        setMonthIndex(dayjs().month())
    }

    console.log(monthIndex)


    return (
        <div>
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
                                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                                    "MMMM YYYY"
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

                    <button className="btn">Month</button>

                </div>


            </header>

        </div>
    );
};

export default Header;