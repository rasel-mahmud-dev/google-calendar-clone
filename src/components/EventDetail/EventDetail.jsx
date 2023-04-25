import React from 'react';
import {TiTimes} from "react-icons/all";
import Modal from "../Modal/Modal";
import dayjs from "dayjs";
import {colors} from "../ColorPicker/ColorPicker";
import statusColors from "../../utils/statusColors";

const EventDetail = ({event, auth, onClose}) => {

	return (
		<div>
			
			<Modal isOpen={!!event} onClose={onClose} className="event-detail-modal">
				
				<div className="close-btn">
					<TiTimes className="text-gray-500 cursor-pointer hover:text-red-500" onClick={onClose}/>
				</div>
				
				
				{event && (
					<div>
						<h2>{event.title}</h2>
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Start Time</label>
							<p className="desc-para">{dayjs(event.start).format("ddd, MMM D, YYYY h:mm A")}
							</p>
						</div>
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Organizer</label>
							<div
								className="flex flex-wrap items-center gap-x-0 users-avatar-list mt-1">
								
								<div className="user-avatar">
									<img src={auth.image} className="rounded-full" alt=""/>
								</div>
								
								<div className="text-xs text-gray-700">
									<h5>{auth.username}</h5>
									<h5>{auth.email}</h5>
								</div>
							
							</div>
						</div>
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Invited peoples</label>
							<div
								className="flex flex-wrap items-center gap-x-0 users-avatar-list mt-1">
								{event.invitations.map(user => (
									<div className="user-avatar">
										<img  src={user.image} className="text-xs rounded-full" alt={user.username}/>
									</div>
								))}
							</div>
							{!event.invitations || event.invitations.length === 0 && (
								<h2 className="desc-para">No users invited</h2>
							) }
						</div>
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Status</label>
							<p style={{color:  colors[event.eventColor]|| statusColors[event.status]}} className="desc-para uppercase"  >{event.status}</p>
						</div>
						
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Agenda</label>
							<p className="desc-para">{event.agenda}</p>
						</div>
						
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Action Items</label>
							<p className="desc-para">{event.actionItems}</p>
						</div>
						
						
						<div className="mt-4">
							<label className="text-sm text-gray-600" htmlFor="">Meeting Link</label>
							<p className="desc-para">{event.meetingLink}</p>
						</div>
						
					</div>
				)}
				
			</Modal>
		
		</div>
	);
};

export default EventDetail;