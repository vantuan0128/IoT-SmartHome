import React, { useState } from 'react'
import { RiLightbulbLine } from "react-icons/ri";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { LuFan } from "react-icons/lu";
import ToggleButton from './ToggleButton';
import '../styles/style.css';
import axios from 'axios';

const UtilityElement = () => {
  const storedIsBulbOn = localStorage.getItem('isBulbOn');
  const storedIsFanOn = localStorage.getItem('isFanOn');

  const [isBulbOn, setIsBulbOn] = useState(
    storedIsBulbOn ? storedIsBulbOn === 'true' : false
  );
  const [isFanOn, setIsFanOn] = useState(
    storedIsFanOn ? storedIsFanOn === 'true' : false
  );

  const sendToDevice = (device) => {
    const action = device === 'led' ? !isBulbOn : !isFanOn;
    axios.post('http://localhost:3002/api/devices', { device, action })
      .then(response => {
        const {device_id, status} = response.data;
        if (device_id === 'led') {
          setIsBulbOn(status === "1" ? true : false);
          localStorage.setItem('isBulbOn', action ? true : false);
        }
        else {
          setIsFanOn(status === "1" ? true : false);
          localStorage.setItem('isFanOn', action ? true : false);
        }
      })
      .catch(error => {
        console.error('Error sending state to backend: ', error);
      });
  }

  return (
    <div className='container__utility'>
      <div className="container__bulb">
        <div className="container__bulb--left">
          <h3 className='container__utility--title'>BULB</h3>
          <div className="container__bulb--btn">
            <span>OFF</span>
            <ToggleButton id="toggleButton1" isOn={isBulbOn} onToggle={() => sendToDevice('led')}></ToggleButton>
            <span>ON</span>
          </div>
        </div>
        <div className="container__bulb--right">
          {isBulbOn ? <RiLightbulbFlashLine className='icon' /> : <RiLightbulbLine className='icon' />}
        </div>
      </div>
      <div className="container__fan">
        <div className="container__fan--left">
          <h3 className='container__utility--title'>FAN</h3>
          <div className="container__fan--btn">
            <span>OFF</span>
            <ToggleButton id="toggleButton2" isOn={isFanOn} onToggle={() => sendToDevice('fan')}></ToggleButton>
            <span>ON</span>
          </div>
        </div>
        <div className="container__fan--right">
          {isFanOn ? <LuFan className='icon rotating' /> : <LuFan className='icon' />}
        </div>
      </div>

    </div>
  )
}

export default UtilityElement;

