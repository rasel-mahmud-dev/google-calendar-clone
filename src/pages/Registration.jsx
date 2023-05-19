import Input from "../components/Form/Input.jsx";
import React, {useState} from "react";
import Avatar from "../components/Avatar/Avatar.jsx";
import {sendAuthApiRequest} from "../context/actions.js";

import * as yup from "yup"
import useHttpLoading from "../hooks/useHttpLoading.jsx";
import {RiseLoader} from "react-spinners";
import useAuthContext from "../context/useAuthContext.js";
import {useNavigate} from "react-router-dom";


const Registration = ({setTab}) => {

    let status = useHttpLoading()

    const [
        data,
        setState
    ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState({})

    const [avatar, setAvatar] = useState({blob: "", base64: ""})

    const [_, dispatch] = useAuthContext()
    const navigate = useNavigate()

    function handleChangeValue(e) {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    async function onSubmit(e) {
        e.preventDefault && e.preventDefault();

        const schema = yup.object({
            firstName: yup.string().required("First Name required").max(100).label("FirstName"),
            lastName: yup.string().max(100).label("LastName"),
            email: yup.string().email().required("email required").max(100).label("Email"),
            password: yup.string().required("password required").max(100).label("Password"),
        })

        status.message = ""
        status.isLoading = true


        try {
            await schema.validate({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })
            let newFormData = new FormData()
            newFormData.append("firstName", data.firstName)
            newFormData.append("lastName", data.lastName)
            newFormData.append("email", data.email)
            newFormData.append("password", data.password)
            newFormData.append("avatar", avatar.blob, "avatar")

            let result = await sendAuthApiRequest(newFormData, "/api/auth/registration")
            if(result[0]){
                dispatch({
                    type: "LOGIN",
                    payload: result[1]
                })
                navigate("/")
            }

        } catch (ex) {
            status.message = ex?.response?.data?.message || ex?.message || "Internal error"

        } finally {
            status.isLoading = false
        }
    }


    function handleChooseImage() {
        const input = document.createElement("input")
        input.type = "file"
        input.click()
        input.onchange = handleChangeImage
    }

    function handleChangeImage(e) {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.onload = function (e) {
            let base = e.target.result
            setAvatar({
                base64: base,
                blob: file
            })
        }

        reader.onerror = function (e) {

        }

        reader.readAsDataURL(file)
    }

    return (

        <div className="login-form">

            <h2 className="text-3xl font-semibold text-gray-900">Registration</h2>
            <p className="text-sm text-gray-600 my-4">Create new event and sync you account, you need to login or
                registration</p>


            {status.isLoading ?
                <div className="flex justify-center py-4"><RiseLoader color="#595bd4"/></div>
                : status.message
                    ? (
                        <div className="bg-red-500/20 p-4 text-red-500 rounded text-xs">
                            {status.message}
                        </div>
                    ) : ""}


            <form onSubmit={onSubmit} className="">

                <Input
                    label="Frist Name"
                    onChange={handleChangeValue}
                    value={data.firstName}
                    type="text"
                    error={errors["firstName"]?.message}
                    name="firstName"
                />


                <Input
                    label="Last Name"
                    onChange={handleChangeValue}
                    value={data.lastName}
                    type="text"
                    error={errors["lastName"]?.message}
                    name="lastName"
                />


                <Input
                    label="Email"
                    onChange={handleChangeValue}
                    value={data.email}
                    type="email"
                    error={errors["email"]?.message}
                    name="email"
                />

                <Input
                    label="Password"
                    onChange={handleChangeValue}
                    value={data.password}
                    type="password"
                    error={errors["password"]?.message}
                    name="password"
                />

                <div className="mt-4">


                    <label className="text-sm text-gray-400" htmlFor="">Avatar</label>
                    <Avatar onClick={handleChooseImage}
                            className={` w-32 h-32 mt-1 ${avatar?.base64 ? "!bg-transparent !shadow-xs" : ""}`}
                            imgClass="shadow-xs w-32 h-32 text-xs text-gray-600"
                            src={avatar?.base64} isFullName username="Upload"/>
                </div>


                <div className="mt-4">
                    <button onClick={onSubmit} className="btn btn-primary px-4">Register</button>
                </div>

                <div className="flex items-center gap-x-1 text-gray-600 text-sm mt-4">
                    <p className="">Already have an account?</p>
                    <a href="#" onClick={() => setTab(1)} className="text-blue-500">Login</a>
                </div>

            </form>
        </div>
    );
};

export default Registration