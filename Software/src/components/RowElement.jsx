import React, { useEffect } from 'react'
import { GiStripedSun } from 'react-icons/gi';
import { LiaTemperatureHighSolid } from 'react-icons/lia';
import { WiHumidity } from 'react-icons/wi';
import '../styles/style.css';
import axios from 'axios';

const RowElement = ({ data }) => {

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

    const getHumidityColor = () => {
        if (data.humidity < 30) {
            return 'dry';
        }
        else if (data.humidity >= 30 && data.humidity <= 70) {
            return 'optimal';
        }
        else {
            return 'humid';
        }
    }

    const getBrightnessColor = () => {
        if (data.brightness < 40) {
            return 'dark';
        }
        else if (data.brightness >= 40 && data.brightness <= 80) {
            return 'normal';
        }
        else {
            return 'light';
        }
    }

    return (
        <div className="parent-container">
            <div className={`container ${getTemperatureColor()}`}>
                <div className='container__left'>
                    <h3 className='container__title'>TEMPERATURE (°C)</h3>
                    <h1 className='container__figures'>{data.temperature}</h1>
                </div>
                <div className='container__right'>
                    <LiaTemperatureHighSolid className='icon' />
                </div>
            </div>

            <div className={`container ${getHumidityColor()}`}>
                <div className="container__left">
                    <h3 className='container__title'>HUMIDITY (%)</h3>
                    <h1 className='container__figures'>{data.humidity}</h1>
                </div>
                <div className="container__right">
                    <WiHumidity className='icon' />
                </div>
            </div>

            <div className={`container ${getBrightnessColor()}`}>
                <div className="container__left">
                    <h3 className='container__title'>BRIGHTNESS (lux)</h3>
                    <h1 className='container__figures'>{data.brightness}</h1>
                </div>
                <div className="container__right">
                    <GiStripedSun className='icon' />
                </div>
            </div>

        </div>
    );
}

export default RowElement;
