import React from 'react';
import './EventItem.css';

const EventItem = ({id, time, title, color, desc, important, evComplete, evDelete}) =>{
    const formatTime = (time) =>{
        // console.log('[EventItem] time variable is',time,'and its type is',typeof time);
        time.toString();
        switch(time){
            default: return '06:00';
            case '0': return '06:00';
            case '1': return '07:00';
            case '2': return '08:00';
            case '3': return '09:00';
            case '4': return '10:00';
            case '5': return '11:00';
            case '6': return '12:00';
            case '7': return '13:00';
            case '8': return '14:00';
            case '9': return '15:00';
            case '10': return '16:00';
            case '11': return '17:00';
            case '12': return '18:00';
            case '13': return '19:00';
            case '14': return '20:00';
            case '15': return '21:00';
            case '16': return '22:00';
            case '17': return '23:00';
            case '18': return '00:00';
            case '19': return '01:00';
            case '20': return '02:00';
            case '21': return '03:00';
            case '22': return '04:00';
            case '23': return '05:00'; 
        }
    }

    const formatImportant = (id, bool) =>{
        switch(bool){
            default: {return null}
            case false: {return null}
            case true: {return( 
                <li key={id-4} className="eventImportant"><span role="img" aria-label="warning sign">⚠️</span> Important</li>
            )}
        }
    }

    return(
        <div className="eventContainer" >
            <ul>
                <li key={id-1} className="eventTime">{formatTime(time)}</li>
                <div className="colorBlock" style={{backgroundColor:color}}></div>
                <li key={id-2} className="eventTitle">{title}</li>
                <li key={id-3} className="eventDesc">{desc}</li>
                {formatImportant(id,important)}
                
                {/* <li key={id-4} className="eventImportant">{important}</li> */}
                {/* <li key={5} className="eventColor">{color}</li> */}
            </ul>
            <div className="buttonContainer" id={id}>
                <button onClick={evComplete} className="buttonComplete">Complete</button>
                <button onClick={evDelete}  className="buttonDelete">Delete</button>
            </div>
        </div>
    )      
}

export default EventItem;