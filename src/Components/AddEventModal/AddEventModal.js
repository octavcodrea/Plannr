import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { NativeSelect, InputLabel } from '@material-ui/core';
import './AddEventModal.css';
// import PropTypes from 'prop-types';
// import useState from 'react';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles(theme => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         position: 'absolute',
//         width: 450,
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

const AddEventModal = ({ formatDate, submitAddEvent, addEventTime, addEventTitle, addEventDescription, addEventImportant, addEventColor, time, title, description, color, important, rerender, modalOpen, handleModalOpen, handleModalClose }) => {

    // const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
        
    // };

    return (
        <div>
            <Button className="addEventButton" onClick={handleModalOpen}>
                + Add Event
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalOpen}
                onClose={handleModalClose}
            >
                {/* <div style={modalStyle} className={classes.paper}> */}
                <div className="addEventModal">
                    <div className="addEventModalHeader">
                        <h2>Add Event</h2>
                        <p>{formatDate}</p>
                    </div>

                    <form onSubmit={submitAddEvent} >

                        <InputLabel htmlFor="select" >Time</InputLabel>
                            <NativeSelect id="select" onChange={addEventTime} value={time}>
                            <option value={0}>6 AM</option>
                            <option value={1}>7 AM</option>
                            <option value={2}>8 AM</option>
                            <option value={3}>9 AM</option>
                            <option value={4}>10 AM</option>
                            <option value={5}>11 AM</option>
                            <option value={6}>12 AM</option>
                            <option value={7}>1 PM</option>
                            <option value={8}>2 PM</option>
                            <option value={9}>3 PM</option>
                            <option value={10}>4 PM</option>
                            <option value={11}>5 PM</option>
                            <option value={12}>6 PM</option>
                            <option value={13}>7 PM</option>
                            <option value={14}>8 PM</option>
                            <option value={15}>9 PM</option>
                            <option value={16}>10 PM</option>
                            <option value={17}>11 PM</option>
                            <option value={18}>12 PM</option>
                            <option value={19}>1 AM</option>
                            <option value={20}>2 AM</option>
                            <option value={21}>3 AM</option>
                            <option value={22}>4 AM</option>
                            <option value={23}>5 AM</option>
                            
                        </NativeSelect> <br />

                        <p>Title</p> 
                        <input onChange={addEventTitle} value={title} /> <br />
                        <p>Description (Optional)</p> 
                        <input onChange={addEventDescription} value={description} /> <br />
                        <p>Important  
                        <input onChange={addEventImportant} value={important} type="checkbox" id="addEvent" name="addEvent" /> </p> <br />

                        <div className="colorSelectContainer">
                            <input type="radio" id="red" name="color" value="#FF646C" onChange={addEventColor} defaultChecked={"#FF646C"} />
                            {/* <label for="red" className="colorRed" >red</label><br /> */}
                            <div className="colorBlock" id="colorRed"></div>
                            <input type="radio" id="blue" name="color" value="#65CBF6" onChange={addEventColor}/>
                            {/* <label for="blue">blue</label><br /> */}
                            <div className="colorBlock" id="colorBlue"></div>
                            <input type="radio" id="yellow" name="color" value="#FFE872" onChange={addEventColor}/>
                            {/* <label for="yellow">yellow</label> */}
                            <div className="colorBlock" id="colorYellow"></div>
                            <input type="radio" id="green" name="color" value="#72E3AB" onChange={addEventColor}/>
                            {/* <label for="green">green</label> */}
                            <div className="colorBlock" id="colorGreen"></div>
                        </div>

                        <button onClick={rerender}> Create</button>
                    </form>

                </div>
            </Modal>
        </div>
    );
}


export default AddEventModal;