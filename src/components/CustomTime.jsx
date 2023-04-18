import React, {useEffect, useState} from 'react';
import Select from "./Form/Select";
import Dropdown from "./Dropdown/Dropdown";


export const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

const CustomTime = (props) => {

    const {isOpen, dropdownClass = "", onClose, onSubmit, initialCustomTimeRepeat} = props

    const [repeatIteration, setRepeatIteration] = useState(1)
    const [repeatPeriod, setRepeatPeriod] = useState("week")
    const [repeatDays, setRepeatDays] = useState([4, 1])

    useEffect(() => {
        if (initialCustomTimeRepeat) {
            setRepeatDays(initialCustomTimeRepeat.repeatDays)
        }
    }, [initialCustomTimeRepeat])


    const repeatTimes = [
        "day",
        "week",
        "month",
    ]

    function chooseRepeatDays(dayIndex) {
        let updatedRepeatDays = [...repeatDays]
        let index = updatedRepeatDays.indexOf(Number(dayIndex))
        if (index === -1) {
            updatedRepeatDays.push(Number(dayIndex))
        } else {
            updatedRepeatDays.splice(index, 1)
        }
        setRepeatDays(updatedRepeatDays)
    }

    function handleSave() {
        onSubmit({
            turnOn: true,
            repeatIteration: isNaN(Number(repeatIteration)) ? 1 : Number(repeatIteration),
            repeatPeriod: repeatPeriod,
            repeatDays: repeatPeriod === "day" ? [] : repeatDays,
        })

        onClose(false)
    }


    function handleClear() {
        onSubmit({
            turnOn: false,
            repeatIteration: 1,
            repeatPeriod: "week",
            repeatDays: []
        })

        onClose(false)
    }

    console.log(timeRange)


    return (


        <Dropdown isOpen={isOpen} className={`${dropdownClass} modal-border-b relative`} width={350} centered={true}
                  closable={false} render={() => (
            <div className="p-3">
                <h3 className="text-md text-gray-900 font-normal ">Repeat</h3>


                <div className="flex flex-row  mb-4 mt-4 gap-x-4 items-center">
                    <label className="text-sm text-gray-600 font-normal whitespace-nowrap " htmlFor="repeatIteration"
                           style={{minWidth: "auto", marginBottom: "0"}}>Repeat every</label>

                    <Select
                        className="w-full"
                        withBg={true}
                        onChange={setRepeatPeriod}
                        value={repeatPeriod}
                        render={(change) => (
                            <>
                                {repeatTimes.map((rp) => (
                                    <p className="mui-select-item"
                                       onClick={() => change(rp)}>{rp}</p>
                                ))}
                            </>
                        )}
                    />
                </div>


                {repeatPeriod !== "day" && (
                    <div className="input-group mt-2">
                        <label htmlFor="" className="text-sm text-gray-600 font-normal">Repeat on days</label>
                        <div className="days flex mt-2 gap-x-2">
                            {Object.keys(days).map((dayIndex) => (
                                <p onClick={() => chooseRepeatDays(dayIndex)}
                                   className={`day-circle hover:bg-blue-400 py-1 px-2 cursor-pointer hover:text-white ${repeatDays.includes(Number(dayIndex)) ? "day-active" : ""}`}>
                                    <span>{days[dayIndex].substring(0, 2)}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pb-20"></div>


                <div className="text-sm flex right-2 mr-auto absolute bottom-2 justify-between w-full">
                    <button className="btn btn-mui ml-5" onClick={() => handleClear()}>Reset</button>
                    <div className="flex justify-between items-center gap-x-2 ">
                        <button className="btn btn-mui" onClick={() => onClose()}>Cancel</button>
                        <button className="btn btn-mui" onClick={handleSave}>Done</button>
                    </div>

                </div>


            </div>
        )}>


        </Dropdown>

    );
};

export default CustomTime;