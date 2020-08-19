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
    }

    // Turns the date into a YYYY-MM-DD format that can be used as for the id in localStorage.
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

        var eventAdded = { 
            'time': this.state.addEventTime,
            'title': this.state.addEventTitle,
            'description': this.state.addEventDescription,
            'color': this.state.addEventColor,
            'important': this.state.addEventImportant,
            'completed': false
        };

        // If title is missing, set 'Event' as title.
        if (eventAdded.title === ''){
            eventAdded.title = "Event";
        }

        // Checks to see how many events already exist for the date.
        let i = 0;
        while ((localStorage.getItem(`${eventDate}-${i}`) !== null) && (localStorage.getItem(`${eventDate}-${i}`) !== "null")){
            i++;
        }

        // If events already exist:
        if(i>0){
            let n = 1;
            let eventCreated = false;
            for(n = 1; n <= i; n++){
                let previousEvent = JSON.parse(localStorage.getItem(`${eventDate}-${n-1}`));

                if (previousEvent !== null && previousEvent !== "null"){
                    // If the new event has its time earlier than the already present event.
                    if(parseInt(eventAdded.time) < parseInt(previousEvent.time) && (eventCreated === false)){

                        for(let m = i+1; m >= n; m--){
                            localStorage.setItem(`${eventDate}-${m}`, localStorage.getItem(`${eventDate}-${m-1}`));
                        }

                        localStorage.setItem(`${eventDate}-${n-1}`, JSON.stringify(eventAdded));
                        eventCreated = true;
                    }
                }
            }

            // If eventCreated is false => there are no events with earlier time.
            // If there's no event with an earlier time, create it normally at the end of the day.
            if(eventCreated === false){
                localStorage.setItem(`${eventDate}-${i}`, JSON.stringify(eventAdded));
            }
        }else{
            localStorage.setItem(`${eventDate}-${i}`, JSON.stringify(eventAdded));
        }
        
        // Reset the state and close the modal.
        this.setState({
            addEventTime: 0,
            addEventTitle: '',
            addEventDescription: '',
            addEventColor: '#FF646C',
            addEventImportant: false
        });

        this.props.handleModalClose();
    };

    // List events. Does so without sorting.
    listEvents = (date) => {
        let eventDate = this.formatDate(this.props.daySelected);

        let ix = 0;
        let eventList = [];
        let eventListCompleted = [];

        let eventItem = localStorage.getItem(`${eventDate}-${ix}`);
        while (eventItem){
            eventItem = JSON.parse(localStorage.getItem(`${eventDate}-${ix}`));
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

    // Called when the complete button on an event is clicked.
    // Sets it as completed and updates the state for the UI to update as well.
    eventComplete = (e) => {
        let id = e.target.parentNode.id;
        localStorage.setItem(id.completed, true);

        let eventToComplete = JSON.parse(localStorage.getItem(id));
        eventToComplete.completed = true;

        localStorage.setItem(id, JSON.stringify(eventToComplete));

        this.setState({ state: this.state });
    }

    // Called when the delete button on an event is clicked.
    eventDelete = (e) => {
        let deleteId = e.target.parentNode.id;
        
        localStorage.removeItem(deleteId);

        // Check if there are any events in the day following this one.
        // If yes, moves them up the queue so the list goes 1 by 1.

        let n = parseInt(deleteId.slice(deleteId.length-1));
        let deleteIdDate = deleteId.slice(0, deleteId.length-2);

        let nextEventInDay = localStorage.getItem(`${deleteIdDate}-${n+1}`);

        while (nextEventInDay !== null){
            localStorage.setItem(`${deleteIdDate}-${n}`, localStorage.getItem(`${deleteIdDate}-${n+1}`));
            n++;
            nextEventInDay = localStorage.getItem(`${deleteIdDate}-${n+1}`);
        }

        localStorage.removeItem(`${deleteIdDate}-${n}`);

        this.props.updateState();
    }

    reRender = () =>{
        this.setState({
            state: this.state
        })
    }

    render(){
        let formatDate = this.formatDate(this.props.daySelected);

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