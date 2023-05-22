import React, {useContext, useEffect, useState} from 'react';
import {BsFillTrash2Fill, FaAngleLeft} from "react-icons/all";
import EventModalTitle from "./EventModalTitle";
import CalendarContext from "../../context/CalendarContext";
import Input from "../Form/Input";
import axios from "axios";
import fullName from "../../utils/fullName.js";
import Avatar from "../Avatar/Avatar.jsx";
import useAuthContext from '../../context/useAuthContext';

const AddUser = ({handleClose, handleChange, setModalId}) => {

    const {newEventData, setNewEventData} = useContext(CalendarContext)
    const [{auth}]  = useAuthContext()

    const [usersList, setUsers] = useState([])

    const [userPayload, setUserPayload] = useState("")

    let [searchUsersList, setSearchUsersList] = useState([])

    useEffect(() => {
        axios.get("/api/auth/users").then(({data}) => {
            setUsers(data)
        }).catch(ex => {

        })
    }, [])

    useEffect(() => {
        findUsers(userPayload)
    }, [userPayload])

    function findUsers(email) {
        let users = usersList.filter(u => u?.email?.includes(email) || fullName(u).includes(email))
        setSearchUsersList(users)
    }

    function handleAddUser(user) {
        setNewEventData(prev => {
            let unique = [...prev.invitations]
            if (unique.findIndex(un => un._id === user._id) === -1) {
                unique.push(user)
            }

            return {
                ...prev,
                invitations: unique
            }
        })
    }

    function handleRemoveUser(user) {
        setNewEventData(prev => ({
            ...prev,
            invitations: prev.invitations.filter(inUser => inUser._id !== user._id)
        }))
    }


    function handleChangeProgram(program) {
        setNewEventData(prev => ({
            ...prev,
            program: program
        }))
    }

    function handleChangeSession(session) {
        setNewEventData(prev => ({
            ...prev,
            session: session
        }))
    }

    return (
        <div>

            <EventModalTitle onClose={handleClose} title="Add Users Invitation" backElement={() => (
                <div className="cursor-pointer" onClick={() => setModalId(1)}>
                    <FaAngleLeft className="text-gray-700"/>
                </div>
            )}/>
            <div className="p-2">

                <h4 className="text-base font-normal text-gray-600">Invitations</h4>

                <div className="users-list custom-scrollbar py-2">
                    
                    {/**** Creator user ****/}
                    <div>
                        <li className="flex items-center justify-between">
                            <p className="flex items-center ">
                                <img className="w-6  rounded-full mr-1" src={auth.avatar} alt=""/>
                                <span> {auth.email} (Organizer) </span>
                            </p>
                        </li>
                    </div>
                    
                    {newEventData.invitations.map(user => (
                        <div>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center gap-x-2">
                                    <Avatar username={fullName(user)} className="w-6 h-6 rounded-full" imgClass="w-6 h-6 rounded-full" src={user?.avatar} />
                                    <span>{user.email}</span>
                                </p>

                                <BsFillTrash2Fill
                                    onClick={() => handleRemoveUser(user)}
                                    className="text-base mr-2 hover:text-red-400"/>

                            </li>
                        </div>
                    ))}
                </div>


                <Input
                    onChange={(e) => setUserPayload(e.target.value)}
                    withBg={true}
                    dataList={usersList}
                    selectedDateList={newEventData.invitations}
                    inputBg="px-1 py-1 rounded"
                    onClickItem={handleAddUser}
                    showSuggestion={(onClick) => (
                        <div style={{maxHeight: "300px", overflowX: "auto"}} className="new-scrollbar">
                            {searchUsersList.map(user => (
                                <div>
                                    <p onClick={() => onClick(user)} className="suggestion-item">{user.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    label="Email"
                    type="email"
                />
                
                {/*<Select*/}
                {/*    value={newEventData.program}*/}
                {/*    onChange={handleChangeProgram}*/}
                {/*    label={newEventData.program ? newEventData.program : "Select Program"}*/}
                {/*    className="mt-2"*/}
                {/*    inputBg="px-1 py-1 rounded"*/}
                {/*    withBg={true}*/}
                {/*    render={(onChange) => (*/}
                {/*        <>*/}
                {/*            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>*/}
                {/*            <li onClick={() => onChange("All")} className="mui-select-item">All</li>*/}
                {/*            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>*/}
                {/*            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>*/}
                {/*            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>*/}
                {/*        </>*/}
                {/*    )}>*/}
                {/*</Select>*/}

                {/*<Select*/}
                {/*    value={newEventData.session}*/}
                {/*    onChange={handleChangeSession}*/}
                {/*    label={newEventData.session ? newEventData.session : "Select Session"}*/}
                {/*    className="mt-2"*/}
                {/*    inputBg="px-1 py-1 rounded"*/}
                {/*    withBg={true}*/}
                {/*    render={(onChange) => (*/}
                {/*        <>*/}
                {/*            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>*/}
                {/*            <li onClick={() => onChange("All")} className="mui-select-item">All</li>*/}
                {/*            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>*/}
                {/*            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>*/}
                {/*            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>*/}
                {/*        </>*/}
                {/*    )}>*/}

                {/*</Select>*/}

                {/*<Select className="mt-2" inputBg="px-1 py-1 rounded" withBg={true} render={() => (*/}
                {/*    <>*/}
                {/*        <option>All Sessions</option>*/}
                {/*        <option>All</option>*/}
                {/*        <option>All</option>*/}
                {/*        <option>All</option>*/}
                {/*        <option>All</option>*/}
                {/*        <option>All</option>*/}
                {/*        <option>All</option>*/}
                {/*    </>*/}
                {/*)}>*/}

                {/*</Select>*/}

                {/*<button onClick={findUsers} className="btn btn-primary mt-2">Search User</button>*/}


                <div className="mt-20">
                    <button className="btn btn-primary" onClick={() => setModalId(1)}>Continue</button>
                </div>

            </div>
        </div>
    );
};

export default AddUser;