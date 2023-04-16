import React from 'react';
import Input from "../Form/Input";
import Modal from "../Modal/Modal";
import {BsClock, BsDash, FiClock, FiUsers, HiBars3BottomLeft, TiTimes} from "react-icons/all";


const AddEventModal = ({isOpenAddEventModal, onClose}) => {

    function handleClose(){
        onClose()
    }

    return (
        <div>
            <Modal isOpen={isOpenAddEventModal} onClose={handleClose}>

                <div className="flex items-center justify-between p-2">
                    <h4 className="text-sm font-semibold pl-3">Add Event</h4>
                    <TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={handleClose} />
                </div>

                <div className="p-5">

                    <div className="ml-12">
                        <Input className="" label="Add meeting title" />
                    </div>

                    <div className="flex items-center mt-6 ">
                        <div className="w-12">
                            <FiClock className="text-gray-600" />
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


                    <div className="flex items-center mt-3">
                        <div className="w-12">
                            <FiUsers className="text-gray-600" />
                        </div>

                        <div className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Add Invitation</span>
                        </div>

                    </div>


                    <div className="flex items-center mt-3">
                        <div className="w-12">
                            <img className="w-4" src="/icons/Google_Meet_icon.svg"  alt="meet"/>
                        </div>

                        <div className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Google meet or Zoom link </span>
                        </div>

                    </div>


                    <div className="flex items-center mt-3">
                        <div className="w-12">
                            <HiBars3BottomLeft  className="text-xl text-gray-600" />
                        </div>

                        <div className="hover:bg-gray-100 p-2 rounded-md">
                            <span className="text-sm text-gray-600">Description</span>
                        </div>

                    </div>


                    <div className="mt-20">
                        <button className="btn btn-primary">Add</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default AddEventModal;