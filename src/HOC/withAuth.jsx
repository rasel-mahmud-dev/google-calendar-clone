import React from 'react';
import {useDispatch, useSelector} from "react-redux";


import useAuthContext from "../context/useAuthContext.js";
import {useNavigate} from "react-router-dom";
import {RiseLoader} from "react-spinners";

const withAuth = (HocComponent) => {


    return function () {

        const {auth, isAuthLoaded} = useAuthContext()

        const dispatch = useDispatch()

        const navigate = useNavigate()


        if (!auth.isAuthLoaded) {
            return <RiseLoader size={60} color="#4461f9" className="loader-center"/>

        } else if (auth.isAuthLoaded && !auth) {
            navigate(`/auth/join`)
            return null
        }
        return <HocComponent/>

    }
};

export default withAuth;

