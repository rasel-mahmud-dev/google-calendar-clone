import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import CalendarContext from "../context/CalendarContext";
import axios from "axios";
import Modal from "../components/Modal/Modal";
import {TiTimes} from "react-icons/all";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Main = () => {
    
    const sound=  useRef(new Audio("/short-success-sound-glockenspiel-treasure-video-game-6346.mp3"))
    
  
    
    
    const {events, newEventData, auth, setCalendar, setCloseNewEventModal, setEvents, setMonthIndex, setNewEventData} = useContext(CalendarContext)
    
    const [activeEvents, setActiveEvents] = useState([])
    const [popupNotification, setPopupNotification] = useState(null)
    
    
    useEffect(() => {
        axios.get("http://localhost:4000/api/calendar/events").then(({data}) => {
            setEvents(data)
            
            let updatedActiveEvents = []
            
            data.forEach(evt=>{
                let startDateTime = new Date(evt.start)
                
                let mili = startDateTime.getTime()
                let currentMili = new Date().getTime()
                
                // future event and future start date less than 2 hour
                let remain = mili - currentMili
                let observeMax = ((1000 * 60) * 3600 ) * 2 // two hour
                let restMinEvent = (remain / 1000) / 60
                
                
                if(remain >= 0 && remain <= observeMax){
                    
                    // console.log(remain, evt.title, evt.start)
                    
                    // notification subscriptions
                    evt.notifications.map(not=>{
                        if(not.type === "notification"){
                            let futureMin =  Number(not.value)
                    
                            // only register setTimeout if future time less than notification time.
                            if(restMinEvent > futureMin){
                                let playTimeMin = restMinEvent - futureMin
                                callFuture( (playTimeMin * 60) * 1000, evt, not)
                            }
                        }
                    })
                }
            })
          
        }).catch(ex => {
        
        })
        
        
        
    }, [])
    
    let min30 = "2023-04-24T15:18:34.352Z"
    
    useEffect(()=>{
        activeEvents.map(item=>{
           
            
            
            // item.notifications.map(not=>{
            //     if(not.type === "notification"){
            //         let futureDate =  new Date(not.start)
            //         let fMili = futureDate.getTime() / 1000
            //         let nMili = new Date().getTime() / 1000
            //
            //         let sec = fMili - nMili
            //         console.log(sec )
            //
            //         if(fMili > nMili){
            //
            //             callFuture(Math.floor(sec * 1000), event)
            //         }
            //         callFuture(Math.floor(1000), {title: "Notification called "})
            //     }
            // })
        })
        // console.log(new Date().toISOString())
        
        
        
        
        
    }, [activeEvents])
    
    
    function callFuture(delay, event, not){
        console.log("notification popup after", delay, event.title, not.label)
        setTimeout(()=>{
            fireNotification(event, not)
        }, delay)
    }
    
    
    async function fireNotification(event, not){
        
        let t = toast.info(<div>
            <p className="text-sm text-gray-800">{event.title}</p>
            <p className="text-xs text-gray-600">{not.label}</p>
            
            <span className="text-xs text-primary">
                <Link to={generateLink(event)}>See Detail</Link>
            </span>
            
        </div>, {autoClose: false})
        try{
            playAudio()
            
        } catch(ex){
            console.log(ex)
        }
        
        // auto clear notification
        setTimeout(()=>{
            // setPopupNotification(null)
        }, 2000)
    }
    
    
    function playAudio(){
        const audio = new Audio("/harp-motif2-36586.mp3")

        console.log("play audio")
        
        audio.play()
        // if(sound.current){
        //     sound.current.play()
        // }
    }
    
    function handleClose(){
        setPopupNotification(null)
    }
    
    
    function generateLink(event){
        let to = "/calendar/month?detail="
        if(event){
            // let startDateTime  = new Date(event.start)
            // console.log(startDateTime)
            // let dateTime = startDateTime.toDateString()
            to += event._id
        }
        return to
    }
    
    generateLink(events[0])
    
    
    return (
        <div>
          <Outlet />
            
            
            <button className='btn mui-btn' onClick={playAudio}>Play</button>
            
            
            <ToastContainer
                position="top-right"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            
        </div>
    );
};

export default Main;