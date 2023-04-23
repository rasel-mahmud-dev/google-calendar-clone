import React, {useEffect, useState} from 'react';
import Select from "../Form/Select.jsx";
import {BiChevronDown} from "react-icons/all";

export const colors = {
    gray: "#7480a6",
    tomato: "#ff4d4d",
    banana: "#7adc2e",
    orange: "#ffae42",
    blue: "#5aa3ff",
    green: "#55c952",
    pink: "#ff5a94",
    salmon: "#5bd58b",
    //gray: "#959798",
    primary: "#8a6fff",
}

const ColorPicker = ({onChange, value}) => {

    const [color, setColor] = useState("gray")

    function handleChangecolor(color){
        setColor(color)
        onChange(color)
    }

    useEffect(()=>{
        if(value){
            setColor(value)
        }
    }, [value])

    return (
        <div className="flex items-center">
            
            <h4 className="mr-2 text-gray-600 text-sm ">Rasel Mahmud</h4>

            <Select
                value={color}
                onChange={handleChangecolor}
                className="mt-0"
                inputBg="py-1 rounded"
                dropdownClass={"color-picker-dropdown"}
                withBg={false}

                render={(onChange) => (
                    <div className="grid grid-cols-2 justify-between gap-2">
                        {Object.keys(colors).map(colorKey=>(
                            <span onClick={()=>onChange(colorKey)} className="w-4 h-4 block rounded-full" style={{background: colors[colorKey]}}>  </span>
                        ))}
                    </div>
                )}
                label={()=>(
                    <div>Rasel Mahmud</div>
                )}
                renderPlaceholderValue={(val)=>(
                    <div className="flex items-center">
                        <span className="w-4 h-4 block rounded-full mr-1" style={{background: colors[val]}}>  </span>
                        <BiChevronDown />
                    </div>
                )}
            >
            </Select>
        </div>
    );
};

export default ColorPicker;