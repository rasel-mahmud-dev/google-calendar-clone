import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

const AppHome = () => {
	return (
		<div className="px-6">
			
			<Link to="/calendar/month">Go to Calendar</Link>

		</div>
	);
};

export default AppHome;