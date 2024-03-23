import React from 'react';
import { LiaTemperatureHighSolid } from 'react-icons/lia';
import { useData } from '../context/DataContext';
import '../styles/style.css';

const WeatherElement = () => {
  const { data } = useData();

  const getTemperatureColor = () => {
    if (data.temperature < 20) {
      return 'cold';
    }
    else if (data.temperature >= 20 && data.temperature <= 30) {
      return 'warm';
    }
    else {
      return 'hot';
    }
  }

  return (
    <div className={`container ${getTemperatureColor()}`}>
      <div className='container__left'>
        <h3 className='container__title'>TEMPERATURE (°C)</h3>
        <h1 className='container__figures'>{data.temperature}</h1>
      </div>
      <div className='container__right'>
        <LiaTemperatureHighSolid className='icon' />
      </div>
    </div>
  );
};

export default WeatherElement;
