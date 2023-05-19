import {useRef, useState} from "react";

function useHttpLoading() {
    const [status, _setStatus] = useState({
        isLoading: false,
        message: "",
        isSuccess: false,
    })

    const popupTimeout = useRef(0)

    const objectStatus = {
        set isLoading(value) {
            _setStatus(prev => ({
                ...prev,
                isLoading: value

            }))
        },
        get isLoading() {
            return status.isLoading
        },
        set message(value) {
            _setStatus(prev => ({
                ...prev,
                message: value

            }))
        },
        get message() {
            return status.message
        },
        set isSuccess(value) {
            _setStatus(prev => ({
                ...prev,
                isSuccess: value
            }))
        },
        get isSuccess() {
            return status.isSuccess
        },
        reset() {
            _setStatus({
                isLoading: false,
                message: "",
                isSuccess: true
            })
        },
        openPopup(timeOut, cb){
            popupTimeout.current && clearTimeout(popupTimeout.current)
            popupTimeout.current = setTimeout(cb, timeOut)
        }
    }

    return objectStatus
}

export default useHttpLoading