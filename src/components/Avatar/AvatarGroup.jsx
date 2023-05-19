import React, {FC} from 'react';


import "./avatar.scss"
import Avatar from "./Avatar.jsx";
import fullName from "../../utils/fullName.js";


const AvatarGroup = ({data, imgClass="", render = {src: "avatar", name: "username"}}) => {
    return (
        <div>
            <div
                 className="flex flex-wrap items-center gap-x-0 users-avatar-list mt-1">
                {data.map((item) => (
                    <Avatar src={item.avatar} username={fullName(item)} className="w-8 h-8" imgClass={imgClass} />
                ))}

            </div>
        </div>
    );
};

export default AvatarGroup;