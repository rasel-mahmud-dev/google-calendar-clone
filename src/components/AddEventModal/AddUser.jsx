import React, {useContext, useEffect, useState} from 'react';
import {BsFillTrash2Fill, FaAngleLeft} from "react-icons/all";
import EventModalTitle from "./EventModalTitle";
import Select from "../Form/Select";
import CalendarContext from "../../context/CalendarContext";
import Input from "../Form/Input";

const AddUser = ({handleClose, handleChange, setTab}) => {

    const {newEventData, setNewEventData} = useContext(CalendarContext)

    const usersList = [
        {
            email: "rasel.mahmud.dev@gmail.com",
            _id: "6422af5d9153de6adce3b085",
            username: "Rasel Mahmud",
            image: "https://randomuser.me/api/portraits/men/85.jpg"
        },
        {
            email: "test.mail@gmail.com",
            _id: "6422b274931c811dcb9badad",
            username: "Test",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {email: "alex@gmail.com", _id: "642aa550c881866e268f1464", username: "Alex", image: "https://randomuser.me/api/portraits/men/32.jpg"},
        {
            email: "mahmud.dev@gmail.com",
            _id: "642aa4a9f5218b533a337fc6",
            username: "Mahmud",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
            email: "simul.dev@gmail.com",
            _id: "642aa105f09c166b07f2e3d2",
            username: "Simul",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            email: "khan.dev@gmail.com",
            _id: "642aa123f09c166b07f2e3d5",
            username: "Khan",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
    ]

    const [userPayload, setUserPayload] = useState({
        email: "",
    })

    let [searchUsersList, setSearchUsersList] = useState([])

    useEffect(() => {
        findUsers(userPayload.email)
    }, [userPayload.email])

    function findUsers(email) {
        let users = usersList.filter(u => u.email.includes(email) || u.username.includes(email))
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
                <div className="cursor-pointer" onClick={() => setTab("basic")}>
                    <FaAngleLeft className="text-gray-700 mr-2"/>
                </div>
            )}/>
            <div className="p-5">

                <h4 className="text-base font-normal text-gray-600">Invitations</h4>

                <div className="users-list custom-scrollbar py-2">
                    {newEventData.invitations.map(user => (
                        <div>
                            <li className="flex items-center justify-between">
                                <p className="flex items-center ">
                                    <img className="w-6  rounded-full mr-1" src={user.image} alt=""/>
                                    <span> {user.email}</span>
                                </p>

                                <BsFillTrash2Fill onClick={() => handleRemoveUser(user)}
                                                  className="text-base mr-2 hover:text-red-400"/>

                            </li>
                        </div>
                    ))}
                </div>


                <Input
                    onChange={(e) => setUserPayload(prev => ({...prev, email: e.target.value}))}
                    withBg={true}
                    dataList={usersList}
                    selectedDateList={newEventData.invitations}
                    inputBg="px-1 py-1 rounded"
                    onClickItem={handleAddUser}
                    showSuggestion={(onClick) => (
                        <div>
                            {searchUsersList.map(user => (
                                <div>
                                    <p onClick={() => onClick(user)} className="suggestion-item">{user.username}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    label="Email"
                    type="email"
                />




                <Select
                    value={newEventData.program}
                    onChange={handleChangeProgram}
                    label={newEventData.program ? newEventData.program : "Select Program"}
                    className="mt-2"
                    inputBg="px-1 py-1 rounded"
                    withBg={true}
                    render={(onChange) => (
                        <>
                            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>
                            <li onClick={() => onChange("All")} className="mui-select-item">All</li>
                            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>
                            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>
                            <li onClick={() => onChange("All Program")} className="mui-select-item">All Program</li>
                        </>
                    )}>
                </Select>

                <Select
                    value={newEventData.session}
                    onChange={handleChangeSession}
                    label={newEventData.session ? newEventData.session : "Select Session"}
                    className="mt-2"
                    inputBg="px-1 py-1 rounded"
                    withBg={true}
                    render={(onChange) => (
                        <>
                            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>
                            <li onClick={() => onChange("All")} className="mui-select-item">All</li>
                            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>
                            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>
                            <li onClick={() => onChange("All Sessions")} className="mui-select-item">All Sessions</li>
                        </>
                    )}>

                </Select>

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
                    <button className="btn btn-primary" onClick={() => setTab("basic")}>Continue</button>
                </div>

            </div>
        </div>
    );
};

export default AddUser;