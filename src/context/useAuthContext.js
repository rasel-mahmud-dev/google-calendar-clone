import React, {useContext} from 'react';

import AuthContext, {dispatch} from "./AuthContext.jsx";

const useAuthContext = () => {
    const auth = useContext(AuthContext)
    return [auth, dispatch]
};

export default useAuthContext;