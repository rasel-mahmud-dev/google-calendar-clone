import React from 'react';
import {Outlet} from "react-router-dom";

const Main = () => {
    return (
        <div>
          <Outlet />
        </div>
    );
};

export default Main;