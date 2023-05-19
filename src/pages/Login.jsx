import React, {useState} from 'react';
import Input from "../components/Form/Input.jsx";
import {useForm} from "react-hook-form";
import {sendAuthApiRequest} from "../context/actions.js";
import useHttpLoading from "../hooks/useHttpLoading.jsx";
import * as yup from "yup";
import useAuthContext from "../context/useAuthContext.js";
import {useNavigate} from "react-router-dom";


const Login = ({setTab}) => {

    let status = useHttpLoading()

    const navigate = useNavigate()

    const [authState, dispatch] = useAuthContext()

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


    function handleChangeValue(e) {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    async function onSubmit(e) {
        e.preventDefault && e.preventDefault();

        const schema = yup.object({
            email: yup.string().email().required("email required").max(100).label("Email"),
            password: yup.string().required("password required").max(100).label("Password"),
        })

        status.message = ""
        status.isLoading = true

        try {
            await schema.validate({
                email: data.email,
                password: data.password
            })

            let result = await sendAuthApiRequest({
                email: data.email,
                password: data.password
            }, "/api/auth/login")


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



    return (

        <div className="login-form">

            <h2 className="text-3xl font-semibold text-gray-900">Login</h2>
            <p className="text-sm text-gray-600 my-4">Preserve your event and get notification, you need to login </p>

            <form onSubmit={onSubmit} className="">

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    error={errors["email"]?.message}
                    onChange={handleChangeValue}
                    value={data.email}
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    error={errors["password"]?.message}
                    onChange={handleChangeValue}
                    value={data.password}
                />
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary px-4">Login</button>
                </div>


                <div className="flex items-center gap-x-1 text-gray-600 text-sm mt-4">
                    <p className="">Didn't have account?</p>
                    <a href="#" onClick={()=>setTab(2)} className="text-blue-500">Registration</a>
                </div>




            </form>

        </div>
    );
};


export default Login;