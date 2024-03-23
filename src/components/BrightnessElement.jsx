import React from 'react';
import { useData } from '../context/DataContext';
import '../styles/style.css'
import { GiStripedSun } from "react-icons/gi";

const BrightnessElement = () => {
  const { data } = useData();

  const getBrightnessColor = () => {
    if(data.brightness < 40) {
      return 'dark';
    }
    else if(data.brightness >= 40 && data.brightness <= 80) {
      return 'normal';
    } 
    else {
      return 'light';
    }

  }

  return (
    <div className={`container ${getBrightnessColor()}`}>
      <div className="container__left">
        <h3 className='container__title'>BRIGHTNESS (lux)</h3>
        <h1 className='container__figures'>{data.brightness}</h1>
      </div>
      <div className="container__right">
        <GiStripedSun className='icon' />
      </div>
    </div>
  );
};

export default BrightnessElement;
