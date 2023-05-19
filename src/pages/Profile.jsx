import React, {useEffect, useState} from 'react';
import useAuthContext from "../context/useAuthContext.js";
import {toast} from "react-toastify";
import axios from "axios";
import fullName from "../utils/fullName.js";
import {HiOutlinePencilSquare} from "react-icons/hi2";
import Avatar from "../components/Avatar/Avatar.jsx";
import Header from "../components/Header/Header.jsx";


const Index = () => {

    const [{auth}, dispatch] = useAuthContext()

    const [updateData, setUpdateData] = useState({
        firstName: "",
        lastName: "",
        avatar: "",
        avatarBlob: null
    })

    const [currentEditField, setCurrentEditField] = useState('')

    function handleSetUpdateDate(name, value) {
        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    function handleChooseImage() {
        const input = document.createElement("input")
        input.type = "file"
        input.setAttribute("accept", "image/*")
        input.click()
        input.onchange = handleChangeImage
    }

    function handleChangeImage(e) {
        let file = e.target.files[0]

        if (file.size > 207347) {
            return toast.error("Image size should be under 200kb")
        }

        handleSetUpdateDate("avatarBlob", file)
        let reader = new FileReader()

        reader.onload = function (e) {
            handleSetUpdateDate("avatar", e.target.result)
        }

        reader.onerror = function (e) {

        }

        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (updateData.avatarBlob) {
            updateProfile(updateData)
        }
    }, [updateData.avatarBlob])

    async function updateProfile(updateData) {
        if (!auth) return toast.error("Please login first")
        let formData = new FormData()

        formData.append("_id", auth._id)
        formData.append("avatar", updateData.avatarBlob, auth.firstName + "-profile")
        let [isDone, data] = await updateProfileApiRequest(formData)
        if (isDone) {
            dispatch({
                type: "UPDATE_USER",
                payload: {
                    ...data
                }
            })
            if (data.avatar) {
                handleSetUpdateDate("avatar", "")
            }
        }
    }

    function updateProfileApiRequest(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                let {data, status} = await axios.post("/api/auth/users/profile-update", formData)
                if (status === 201) {
                    toast.success("Profile updated.")
                    resolve([true, data])
                }

            } catch (ex) {
                let msg = ex?.response?.data?.message
                toast.error(msg || "Profile update fail.")
                resolve([false, {}])
            }
        })
    }

    function handleMakeEditAble(name, value) {
        setCurrentEditField(name)

        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleChangeInfo(name, value) {
        handleSetUpdateDate(name, value)
    }

    async function handleSaveInfo(e) {
        if (e.keyCode === 13) {
            // save data in server
            const {name, value} = e.target
            const formData = new FormData()
            formData.append("_id", auth._id)
            formData.append(name, value)
            let [isSuccess] = await updateProfileApiRequest(formData)
            if (isSuccess) {
                setCurrentEditField("")
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        [name]: value
                    }
                })
                console.log("updated user", name, value)
            }
        }
    }


    return (
        <div className="my-container">
            <Header/>

            <div className="profile-info_wrapper">
                <div className="mt-0">
                    <h2 className="text-lg font-semibold text-neutral-800">Profile Information</h2>

                    {auth && <div className="profile-info  mt-4">

                        <div>

                            <Avatar className="w-32 h-32" imgClass="shadow-xs w-32 h-32"
                                    src={updateData?.avatar || auth?.avatar} username={fullName(auth)}/>

                            <div onClick={handleChooseImage}
                                 className="cursor-pointer group  edit-icon flex items-center gap-x-1 mt-2  mb-6">
                                <span className="text-sm group-hover:text-primary text-semibold text-neutral-900">Update Photo</span>
                                <HiOutlinePencilSquare className="text-sm group-hover:text-primary"/></div>
                        </div>

                        <li>
                            <span className="label">First Name</span>
                            <div className="info_value">
                                {currentEditField === "firstName" ? (
                                    <input name="firstName" onKeyDown={handleSaveInfo}
                                           onChange={(e) => handleChangeInfo("firstName", e.target.value)}
                                           className="inline-text-input" placeholder="Enter First Name"
                                           value={updateData.firstName}/>
                                ) : (
                                    <>
                                        <span>{auth?.firstName}</span>
                                        <div onClick={() => handleMakeEditAble("firstName", auth?.firstName)}
                                             className="edit-icon"><HiOutlinePencilSquare/></div>
                                    </>
                                )}

                            </div>

                        </li>
                        <li>
                            <span className="label">Last Name</span>
                            <div className="info_value">
                                {currentEditField === "lastName" ? (
                                    <input
                                        name="lastName"
                                        onKeyDown={handleSaveInfo}
                                        onChange={(e) => handleChangeInfo("lastName", e.target.value)}
                                        className="inline-text-input"
                                        placeholder="Enter Last Name"
                                        value={updateData.lastName}/>
                                ) : (
                                    <>
                                        <span>{auth.lastName}</span>
                                        <div
                                            onClick={() => handleMakeEditAble("lastName", user.lastName)}
                                            className="edit-icon">
                                            <HiOutlinePencilSquare/>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                        <li>
                            <span className="label">Full Name</span>
                            <div className="info_value">
                                <span>{fullName(auth)}</span>
                                {/*<div className="edit-icon"><HiOutlinePencilSquare/></div>*/}
                            </div>
                        </li>
                        <li>
                            <span className="label">Email Name</span>
                            <div className="info_value">
                                <span>{auth.email}</span>
                                {/*<div className="edit-icon invisible"><HiOutlinePencilSquare/></div>*/}
                            </div>
                        </li>
                        <li>
                            <span className="label">Role</span>
                            <div className="info_value">
                                <span>{auth.role}</span>
                                {/*<div className="edit-icon invisible"><HiOutlinePencilSquare/></div>*/}
                            </div>
                        </li>

                    </div>
                    }
                </div>
            </div>
        </div>
    );
};


export default (Index)