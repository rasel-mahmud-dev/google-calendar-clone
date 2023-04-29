import React, {useEffect, useState} from 'react';
import {BiChevronDown, CgClose} from "react-icons/all";
import Select from "../Form/Select";

const AddNotification = ({onPress, onChange, values}) => {
	
	const [notifications, setNotifications] = useState([])
	
	const options = [
		// {value: 1, label: "1 minutes before"},
		// {value: 2, label: "2 minutes before"},
		// {value: 3, label: "3 minutes before"},
		// {value: 4, label: "4 minutes before"},
		{value: 10, label: "10 minutes before"},
		{value: 15, label: "15 minutes before"},
		{value: 20, label: "20 minutes before"},
		{value: 30, label: "30 minutes before"},
		{value: 45, label: "45 minutes before"},
		{value: 60, label: "1 hour before"},
		{value: 120, label: "2 hour before"}
	]
	
	
	
	function handleAdd() {
		setNotifications(prevState => {
			let updatedNotifications = [
				...prevState,
				{...options[0], type: "notification", id: Date.now().toString()}
			]
			onChange(updatedNotifications)
			return updatedNotifications
		})
		
	}
	
	function handleRemove(id){
		let updatedNotifications = notifications.filter(item=>item.id !== id)
		onChange(updatedNotifications)
		setNotifications(updatedNotifications)
	}
	
	function handleAddNewNotification() {
		handleAdd()
		onPress()
	}
	
	function handleSelectNotificationTime(id, val){
		let updatedNotifications = [...notifications]
		let updatedIndex = updatedNotifications.findIndex(n=>n.id === id)
		if(updatedIndex !== -1){
			updatedNotifications[updatedIndex] = {
				...updatedNotifications[updatedIndex],
				label: val.label,
				value: val.value
			}
		}
		onChange(updatedNotifications)
		setNotifications(updatedNotifications)
	}
	

	
	useEffect(()=>{
		setNotifications(values)
	}, [values])
	
	
	return (
		<div>
			
			<div className="mt-2">
				{notifications.map(notification=>(
					<div className="flex items-center gap-x-2 notifications relative">
						
						<Select
							dropdownClass="-top-14 w-[180px]"
							value={"r"}
							onChange={(val)=>handleSelectNotificationTime(notification.id, val)}
							className=""
							inputBg="px-1  rounded"
							withBg={false}
							render={(onChange) => (
								<>
									{ options.map(item=>(
										<li onClick={() => onChange(item)} className="mui-select-item !py-1.5 text-xs !text-gray-600">{item.label}</li>
									)) }
									
								</>
							)}
							renderPlaceholderValue={()=>(
								<div>
									<div className="hover:bg-gray-100 rounded-md w-max flex items-center justify-between gap-x-1" >
										<h4 className="text-xs text-gray-600">{notification.label}</h4>
										<BiChevronDown />
									</div>
								
								</div>
								)}
						>
						</Select>
						
						<div onClick={()=>handleRemove(notification.id)} className="hover:bg-gray-100 px-2 rounded-md w-max notification-close">
						<CgClose className="text-xs  " />
					</div>
					</div>
				))}
			</div>
			
			<div onClick={handleAddNewNotification} className="hover:bg-gray-100 p-2 rounded-md">
				<span className="text-sm text-gray-600">Add Notification</span>
			</div>
		</div>
	);
};

export default AddNotification;