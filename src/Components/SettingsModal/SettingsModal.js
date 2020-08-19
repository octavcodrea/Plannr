import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
// import useState from 'react';
import './SettingsModal.css';
import cog from '../../images/cog.svg';
import trash from '../../images/delete.svg';


const SettingsModal = ({clearLocalStorage}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <Button id="settingsButton" onClick={handleOpen}>
                <img src={cog} alt="settings button"/>
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >

                <div className="settingsModal">
                    <div className="settingsModalHeader">
                        <h2>Settings</h2>
                    </div>

                    <h4>Clear local storage</h4>
                    <p>Pressing this button will delete all events stored on this computer's memory.</p>
                    <button id="settingsButton" onClick={clearLocalStorage}>
                        <img src={trash} alt="settings button"/>
                    </button>
                    <br />
                    <button className="closePanel" onClick={handleClose}>
                        Close Settings Panel
                    </button>

                </div>
            </Modal>
        </div>
    )
    
}

export default SettingsModal;