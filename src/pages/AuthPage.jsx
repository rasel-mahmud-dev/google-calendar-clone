import React, {useEffect, useState} from 'react';
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import {CSSTransition} from "react-transition-group"
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const AuthPage = () => {

    const [tab, setTab] = useState(1)

    const {page} = useParams()

    useEffect(() => {

        if (page !== "login") {
            setTab(2)
        } else {
            setTab(1)
        }

    }, [page]);


    return (
        <div>
            <div className="my-container">
                <div className="flex justify-between py-3 px-3 border-b">

                    <Link to="/">
                        <div className="flex items-center gap-x-1 ">
                            <img className="w-10"
                                 src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_16_2x.png"
                                 alt=""/>
                            <h4 className="text-sm font-bold">Calendar</h4>
                        </div>
                    </Link>
                </div>
                <div className="multi-step-modal-root">
                    <div className="auth-page-multi-modal">
                        <CSSTransition unmountOnExit={true} in={tab === 1} timeout={400} classNames="modal-content">
                            <div className="modal-inner">
                                <Login
                                    setTab={setTab}
                                />
                            </div>
                        </CSSTransition>

                        <CSSTransition unmountOnExit={true} in={tab === 2} timeout={400} classNames="modal-content">
                            <div className="modal-inner">
                                <Registration
                                    setTab={setTab}
                                />
                            </div>

                        </CSSTransition>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage