import React from 'react';
import Calendar from 'react-calendar';
import Day from '../Day/Day';

import './MainContainer.css';
import EventsInMonth from '../EventsInMonth/EventsInMonth';

// let dayClicked = new Date();

class MainContainer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            daySelected: new Date(),
            modalOpen: false
        };

     //this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleModalOpen = () =>{
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose = () =>{
        this.setState({
            modalOpen: false
        })
    }
    
    handleDayClick = date => {
        // console.log("[MainContainer]: ",date);
        let dateproxy = date;
        this.setState({ 
            daySelected: dateproxy 
        })
    }

    updateState = () => {
        this.setState({
            daySelected: this.state.daySelected
        })
    }

    render(){
        return(
        <div className="mainContainer">
            <Day 
            daySelected={this.state.daySelected} 
            modalOpen={this.state.modalOpen}
            handleModalOpen={this.handleModalOpen}
            handleModalClose={this.handleModalClose}
            updateState={this.updateState}
            />
            <div className="mainContainer-right">
                <div className="calendar-container">
                    <Calendar 
                        onClickDay={this.handleDayClick}
                        //onClickDay={this.props.selectDate}
                        returnValue={"start"}
                    />
                </div>
                 <br />
                <EventsInMonth
                    daySelected={this.state.daySelected}
                />
            </div>
            {/* <br />
            {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(this.state.daySelected)} */}
        </div>)
    }
};

// const getClickedDate = date => {
//     console.log(date);
//     // dayClicked = date;
// }


export default MainContainer;