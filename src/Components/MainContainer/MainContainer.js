import React from 'react';
import Calendar from 'react-calendar';
import Day from '../Day/Day';
import Navbar from '../Navbar/Navbar';
import Greeting from '../Greeting/Greeting';
import './MainContainer.css';
import EventsInMonth from '../EventsInMonth/EventsInMonth';


class MainContainer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            daySelected: new Date(),
            modalOpen: false
        };
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

    clearLocalStorage = () =>{
        localStorage.clear();

        this.setState({
            state: this.state
        })
    };

    render(){
        return(
        <div>
            <Navbar 
                clearLocalStorage={this.clearLocalStorage}
            />

            <Greeting/>

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
                        returnValue={"start"}
                    />
                </div>
                 <br />
                <EventsInMonth
                    daySelected={this.state.daySelected}
                />
            </div>
        </div>
        </div>)
    }
};


export default MainContainer;