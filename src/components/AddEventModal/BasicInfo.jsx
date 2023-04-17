import React from 'react';
import Input from "../Form/Input";
import {BsDash, FaAngleLeft, FiClock, FiUsers, HiBars3BottomLeft} from "react-icons/all";
import ClickExpand from "../Form/ClickExpand/ClickExpand";
import TextArea from "../Form/TextArea";
import RichTextEditor from "../Form/RichTextEditor/RichTextEditor";
import EventModalTitle from "./EventModalTitle";

const BasicInfo = ({handleChange, newEventData, setTab}) => {
    return (
        <div className="">


            <EventModalTitle onClose={() => {
            }}/>
            <div className="p-4">

                <div className="ml-12">
                    <Input className="" label="Add meeting title" onChange={(e) => handleChange(e.target.value)}
                           value={newEventData.title}/>
                </div>

                <div className="event-input-field flex items-start mt-6 ">
                    <div className="event-label-icon w-12">
                        <FiClock className="text-gray-600"/>
                    </div>

                    <div className="hover:bg-gray-100 p-2 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <span className="text-sm text-gray-600">Tuesday, November 21</span>
                            <BsDash/>
                            <span className="text-sm text-gray-600">Tuesday, November 21</span>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500">Does not repeat</span>
                        </div>
                    </div>

                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <FiUsers className="text-gray-600"/>
                    </div>

                    <div onClick={()=>setTab("addUsers")} className="hover:bg-gray-100 p-2 rounded-md">
                        <span className="text-sm text-gray-600">Add Invitation</span>
                    </div>
                </div>


                <div className="event-input-field flex items-start mt-3">
                    <div className="event-label-icon w-12">
                        <img className="w-4" src="/icons/Google_Meet_icon.svg" alt="meet"/>
                    </div>


                    <ClickExpand label={(onPress) => (
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

                    <ClickExpand label={(onPress) => (
                        <div onClick={onPress} className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Description</span>
                        </div>
                    )}>
                        <RichTextEditor/>
                    </ClickExpand>

                </div>


                <div className="mt-20">
                    <button className="btn btn-primary">Add</button>
                </div>

            </div>
        </div>
    );
};

export default BasicInfo;