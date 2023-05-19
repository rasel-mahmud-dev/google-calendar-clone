import React from 'react';

import "./avatar.scss"

function chooseUserNameLetter(username) {
    if (!username) {
        return "";
    }
    const letterOne = username[0];
    let letterTwo = "";
    const splitName = username.split(" ");
    if (splitName.length > 1) {
        letterTwo = splitName[1][0];
    }
    return letterOne + letterTwo;
}


const Avatar = ({className = "", imgClass = "", username, isFullName = false, src, children, ...attr}) => {

    const userNameLetter = isFullName ? username : chooseUserNameLetter(username || "")


    function handleErrorImage(e) {
        const avatarRoot = e.target.parentElement
        if (avatarRoot) {
            avatarRoot.innerHTML = `
			<span class="img rounded-full w-9 h-9 flex items-center text-sm font-medium justify-center uppercase ${imgClass}">${userNameLetter}</span>
		`
        }
    }

    return (
        <div className={`avatar ${className}`} {...attr}>
            {!children ? src
                    ?
                    <img onError={handleErrorImage} src={src}
                         className={`img rounded-full ${imgClass}`}/>

                    : <div
                        className={`img rounded-full h-full w-full flex text-sm font-semibold items-center justify-center uppercase ${imgClass}`}>{userNameLetter}</div>
                : (children)}
        </div>
    );
};

export default Avatar;