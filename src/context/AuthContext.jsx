import React, {useReducer, useState} from "react";


// auth context
const AuthContext = React.createContext({})


// auth content initial value
const initialState = {
    auth: null,
    isAuthLoaded: false
}

// auth reducer.
function authReducer(state, action){
    switch (action.type){
        case "LOGIN": {
            console.log(action.payload)
            return {
                ...state,
                auth: action.payload,
                isAuthLoaded: true
            }
        }

        default : {
            return state
        }

    }
}

export let dispatch;


// auth context provider
export const AuthProvider = (props) => {

    let [state, authDispatch] = useReducer(authReducer, initialState, initialState)

    dispatch = authDispatch

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext