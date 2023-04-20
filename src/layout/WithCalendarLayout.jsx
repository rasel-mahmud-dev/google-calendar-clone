import React from 'react';
import Calendar from "../Calendar/Calendar";


const WithCalendarLayout = (HOC) => {

    return function (props) {
        return <Calendar pageContent={<HOC/>} {...props} />
    };
}


export default WithCalendarLayout;