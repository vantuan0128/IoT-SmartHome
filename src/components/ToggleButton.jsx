import React from 'react';
import '../styles/ToggleButton.css';

const ToggleButton = ({ isOn, onToggle }) => {
    return (
        <div className={`slider-toggle-container ${isOn ? 'off' : 'on'}`} onClick={onToggle}>
            <div className={`toggle-button ${isOn ? 'off' : 'on'}`}></div>
        </div>
    );
};

export default ToggleButton;
