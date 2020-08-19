import React from 'react';
// import SearchField from '../SearchField/SearchField';
import './Navbar.css';
import SettingsModal from '../SettingsModal/SettingsModal';

class Navbar extends React.Component{

    render(){
        return(
        <div className="navbar">
            <div>
                <h1>Plannr.</h1>
            </div>

            <div>
                <SettingsModal
                    clearLocalStorage={this.props.clearLocalStorage}
                />
            </div>
        </div>)
    }
}

export default Navbar;