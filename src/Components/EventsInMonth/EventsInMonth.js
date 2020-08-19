import React from 'react';
import './EventsInMonth.css';

class EventsInMonth extends React.Component{
    
    formatDate = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    };

    listEventsInMonth = (dateId) =>{
        let eventsInMonth = [];
        let eventsInMonthImportant = [];
        let i = 1;
        let j = 0;

        let dateMonthYear = dateId.slice(0, dateId.length-2);

        // Checks every day if there are any events present.
        // Sets the value in an array of the number of events in each day.
        // Sets the value in another array if there are any important events in a certain day.
        for(i=1; i<=31; i++){
            eventsInMonthImportant[i] = 0;

            for(j=0; j<10; j++){
                if (localStorage.getItem(`${dateMonthYear}${i}-${j}`) !== null && localStorage.getItem(`${dateMonthYear}${i}-${j}`) !== "null"){
                    eventsInMonth[i] = j;
                    
                    let checkImportant = JSON.parse(localStorage.getItem(`${dateMonthYear}${i}-${j}`));
                    if (checkImportant.important === true){
                        eventsInMonthImportant[i] ++;
                    }
                }
            }
        }

        let month = (this.props.daySelected.getMonth() + 1);

        switch(month){
            default: month = "January"; break;
            case 1: month = "January"; break;
            case 2: month = "February"; break;
            case 3: month = "March"; break;
            case 4: month = "April"; break;
            case 5: month = "May"; break;
            case 6: month = "June"; break;
            case 7: month = "July"; break;
            case 8: month = "August"; break;
            case 9: month = "September"; break;
            case 10: month = "October"; break;
            case 11: month = "November"; break;
            case 12: month = "December"; break;
        }

        // Formats the [events in the month] data

        // eslint-disable-next-line array-callback-return
        const listItems = eventsInMonth.map((item, index) =>{
                if(eventsInMonthImportant[index] === 0){
                    if (item === 0){
                        return( <li key={index} >{month} {index}: {item+1} event scheduled.</li>)
                    }else{
                        return( <li key={index} >{month} {index}: {item+1} events scheduled.</li>)
                    }
                }else if (eventsInMonthImportant[index] === 1){
                    if (item === 0){
                        return( <li key={index} >{month} {index}: {item+1} event scheduled. <span className="importantHighlight">The event is important.</span> </li>)
                    }else{
                        return( <li key={index} >{month} {index}: {item+1} events scheduled. <span className="importantHighlight">{eventsInMonthImportant[index]} important event.</span></li> )
                    }
                }else if (eventsInMonthImportant[index] > 1){
                    return( <li key={index} >{month} {index}: {item+1} events scheduled. <span className="importantHighlight">{eventsInMonthImportant[index]} important events.</span></li> )
                }
            }
        );

        return listItems;
    }
       
    render(){
        let date = this.formatDate(this.props.daySelected);

        return(
            <div className="eventsInMonth">
                <ul className="eventsInMonthList">
                    {this.listEventsInMonth(date)}
                </ul>
            </div>
        )
    }
}

export default EventsInMonth;