import React from 'react';
import './Greeting.css';

const Greeting = () => {

    function greetUser(){
        let date = new Date();
        let hour = date.getHours();

        let greeting = '';

        if(hour >= 0 && hour < 5){
            greeting = "Hello!";
        }else if(hour >= 5 && hour < 12){
            greeting = "Good morning!";
        }else if(hour >= 12 && hour < 17){
            greeting = "Good afternoon!";
        }else if(hour >= 17 && hour <= 24){
            greeting = "Good evening!"
        }

        return(
            <div className="greeting">
                <p>{greeting}</p>
            </div>
        )
    }

    return(
        <div>
            {greetUser()}
        </div>
    )
}

export default Greeting;