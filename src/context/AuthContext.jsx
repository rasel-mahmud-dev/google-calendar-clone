import React, {useReducer} from "react";


// auth context
const AuthContext = React.createContext({})


// auth content initial value
const initialState = {
    auth: null,
    isAuthLoaded: false
}

// auth reducer.
function authReducer(state, action) {
    switch (action.type) {

        case "LOGIN": {
            if (action.payload && action.payload["token"]) {
                localStorage.setItem("token", action.payload["token"])
            }
            return {
                ...state,
                auth: action.payload,
                isAuthLoaded: true
            }
        }

        case "UPDATE_USER":
            return {
                ...state,
                auth: {
                    ...state.auth,
                    ...action.payload
                },
            }

        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                auth: null,
            }

        default : {
            return state
        }

    }
}

export let dispatch;


// auth context provider
export const AuthProvider = (props) => {

    let [state, authDispatch] = useReducer(authReducer, initialState)

    dispatch = authDispatch

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext