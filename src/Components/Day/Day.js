import React from 'react';

import './Day.css';
import AddEventModal from '../AddEventModal/AddEventModal';
import EventItem from '../EventItem/EventItem';
import WithClass from '../../hoc/WithClass';

class Day extends React.Component{
    constructor(props){
        super(props);

        this.state={
            dateSelected: this.props.dateSelected,
            addEventTime: 0,
            addEventTitle: '',
            addEventDescription: '',
            addEventImportant: false,
            addEventColor: '#ff6666',

            eventsInDay: [
                {date: '2020-01-01', count: '0'}, 
                {date: '2020-01-02', count: '0'}
            ]
        }

        // this.setAddEventColor = this.setAddEventColor.bind(this);
        // this.formatDate = this.formatDate.bind(this);
    }

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

    setAddEventTime = (event) =>{
        this.setState({
            addEventTime: event.target.value
        })
    }

    setAddEventTitle = (event) =>{
        this.setState({
            addEventTitle: event.target.value
        })
    }

    setAddEventDescription = (event) =>{
        this.setState({
            addEventDescription: event.target.value
        })
    }

    setAddEventImportant = (event) =>{
        this.setState({
            addEventImportant: event.target.checked
        })
    }

    setAddEventColor = (event) =>{
        this.setState({
            addEventColor: event.target.value
        })
    }

    submitAddEvent = (event) => {
        event.preventDefault();
        let eventDate = this.formatDate(this.props.daySelected);

        console.log('[Day]: eventsInDay: ', this.state.eventsInDay);
        this.state.eventsInDay.forEach(pair => console.log(pair));
        if (eventDate){}

        var eventAdded = { 
            // 'id': eventDate,
            'time': this.state.addEventTime,
            'title': this.state.addEventTitle,
            'description': this.state.addEventDescription,
            'color': this.state.addEventColor,
            'important': this.state.addEventImportant,
            'completed': false
        };

        if (eventAdded.title === ''){
            eventAdded.title = "Event";
        }

        let i = 0;
        while (localStorage.getItem(`${eventDate}-${i}`)){
            i++;
        }

        if(i>0){
            let n = 1;
            let eventCreated = false;
            for(n = 1; n <= i; n++){
                let previousEvent = JSON.parse(localStorage.getItem(`${eventDate}-${n-1}`));

                if (previousEvent !== null){
                    if(eventAdded.time < previousEvent.time && (eventCreated === false)){
                        for(let m = i+1; m >= n; m--){
                            localStorage.setItem(`${eventDate}-${m}`, localStorage.getItem(`${eventDate}-${m-1}`));
                            
                        }
                        localStorage.setItem(`${eventDate}-${n-1}`, JSON.stringify(eventAdded));
                        eventCreated = true;
                        // console.log(`[Day.js] local storage item created at ${eventDate}-${n-1}`);
                    }
                }
            }
            if(eventCreated === false){
                localStorage.setItem(`${eventDate}-${i}`, JSON.stringify(eventAdded));
            }
        }else{
            localStorage.setItem(`${eventDate}-${i}`, JSON.stringify(eventAdded));
            // console.log(`[Day.js] local storage item created at ${eventDate}-${i}`);
        }
        
        this.setState({
            addEventTime: 0,
            addEventTitle: '',
            addEventDescription: '',
            addEventColor: '#FF646C',
            addEventImportant: false
        });

        this.props.handleModalClose();
    };

    listEvents = (date) => {
        let eventDate = this.formatDate(this.props.daySelected);

        let ix = 0;
        let eventList = [];
        let eventListCompleted = [];

        let eventItem = localStorage.getItem(`${eventDate}-${ix}`);
        while (eventItem){
            eventItem = JSON.parse(localStorage.getItem(`${eventDate}-${ix}`));
            // console.log('[Day.js], JSON for',`${eventDate}-${ix}`,':', eventItem);
            if (eventItem){
                if (eventItem.completed){
                    eventListCompleted.push (
                        <WithClass classes={'eventItemCompleted'}>
                            <EventItem
                                id={`${eventDate}-${ix}`}
                                time={eventItem.time}
                                title={eventItem.title}
                                color={eventItem.color}
                                desc={eventItem.description}
                                important={eventItem.important}
                                evComplete={this.eventComplete}
                                evDelete={this.eventDelete}
                            />
                        </WithClass>
                    );
                }else{
                    eventList.push (
                        <WithClass classes={'eventItemRegular'}>
                            <EventItem
                                id={`${eventDate}-${ix}`}
                                time={eventItem.time}
                                title={eventItem.title}
                                color={eventItem.color}
                                desc={eventItem.description}
                                important={eventItem.important}
                                evComplete={this.eventComplete}
                                evDelete={this.eventDelete}
                            />
                        </WithClass>
                    );
                }
            }
            ix++;
            eventItem = localStorage.getItem(`${eventDate}-${ix}`);
        }
        let eventListCombined = eventList.concat(eventListCompleted);
        return eventListCombined.map(element => (
            <div>
                {element}
            </div>
        ))
    }

    eventComplete = (e) => {
        let id = e.target.parentNode.id;
        // let eventDate = id.slice(0, id.length-1);


        console.log('[Day.js][eventComplete], eventID is:',id)
        localStorage.setItem(id.completed, true);

        let eventToComplete = JSON.parse(localStorage.getItem(id));
        eventToComplete.completed = true;

        localStorage.setItem(id, JSON.stringify(eventToComplete));
        console.log('[Day.js], item:',JSON.parse(localStorage.getItem(id)));

        this.setState({ state: this.state });
    }

    eventDelete = (e) => {
        let deleteId = e.target.parentNode.id;
        console.log('[Day.js][eventDelete], eventID is:',deleteId);
        
        localStorage.removeItem(deleteId);
        // setTimeout(function(){ localStorage.removeItem(deleteId); }, 1000);

        //check if there are any events in the day following this one
        //if yes, move them up the queue so the list goes 1 by 1

        let n = parseInt(deleteId.slice(deleteId.length-1));
        let deleteIdDate = deleteId.slice(0, deleteId.length-2);
        // console.log('[Day.js], d1 deleteId:',deleteIdDate,'n:',n);

        let nextEventInDay = localStorage.getItem(`${deleteIdDate}-${n+1}`);
        // console.log('[Day.js], d2a nextEventInDay:', `${deleteIdDate}-${n+1}`);
        // console.log('[Day.js], d2b nextEventInDay:', nextEventInDay);
        while (nextEventInDay !== null){
            localStorage.setItem(`${deleteIdDate}-${n}`, localStorage.getItem(`${deleteIdDate}-${n+1}`));
            console.log('[Day.js], d3 :',`${deleteIdDate}-${n+1}`,'copied to',`${deleteIdDate}-${n}`);
            n++;
            nextEventInDay = localStorage.getItem(`${deleteIdDate}-${n+1}`);
        }

        localStorage.removeItem(`${deleteIdDate}-${n}`);
        // console.log('[Day.js], d4, removed also:',`${deleteIdDate}-${n}`)

        this.props.updateState();
    }

    reRender = () =>{
        this.setState({
            state: this.state
        })
    }

    render(){
        let formatDate = this.formatDate(this.props.daySelected);
        // console.log("[Day] formatDate: ",formatDate);

        return(
        <div className="dayContainer">
            <div className="dayCardHeader">
                {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(this.props.daySelected)}
                </div>
            <div className="dayCard" >

            {this.listEvents(this.state.dateSelected)}

            </div>
            <div className="addEvent">
                    <AddEventModal 
                        formatDate={formatDate}
                        submitAddEvent={this.submitAddEvent}
                        addEventTime={this.setAddEventTime}
                        addEventTitle={this.setAddEventTitle}
                        addEventDescription={this.setAddEventDescription}
                        addEventImportant={this.setAddEventImportant}

                        addEventColor={this.setAddEventColor}

                        time={this.state.addEventTime}
                        title={this.state.addEventTitle}
                        description={this.state.addEventDescription}
                        important={this.state.addEventImportant}
                        color={this.state.addEventColor}
                        rerender={this.reRender}

                        modalOpen={this.props.modalOpen}
                        handleModalOpen={this.props.handleModalOpen}
                        handleModalClose={this.props.handleModalClose}

                    />
                </div>
        </div>)
    }
}


export default Day;