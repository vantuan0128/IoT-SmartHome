// import React, { useState, useEffect } from 'react'
// import '../styles/style.css'
// import { WiHumidity } from "react-icons/wi";

// const HumidityElement = () => {

//   const [humidity, setHumidity] = useState(120);

//   const updateHumidity = (newHumidity) => {
//     setHumidity(newHumidity);
//   }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const newHumidity = Math.floor(Math.random() * 100) + 1;
//       updateHumidity(newHumidity);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   // const getHumidityColor = () => {
//   //   if(humidity <= 45) {
//   //     return 'dry';
//   //   }
//   //   else if(humidity > 45 && humidity <= 80) {
//   //     return 'optimal';
//   //   }
//   //   else {
//   //     return 'humid';
//   //   }
//   // }

//   return (
//     <div className='container'>
//       <div className="container__left">
//         <h3 className='container__title'>HUMIDITY (%)</h3>
//         <h1 className={'container__figures'}>{humidity}</h1>
//       </div>
//       <div className="container__right">
//         <WiHumidity className='icon' />
//       </div>
//     </div>
//   )
// }

// export default HumidityElement;

import React from 'react';
import { useData } from '../context/DataContext';
import { WiHumidity } from "react-icons/wi";
import '../styles/style.css'

const HumidityElement = () => {
  const { data } = useData();

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


  return (
    <div className={`container ${getHumidityColor()}`}>
      <div className="container__left">
        <h3 className='container__title'>HUMIDITY (%)</h3>
        <h1 className='container__figures'>{data.humidity}</h1>
      </div>
      <div className="container__right">
        <WiHumidity className='icon' />
      </div>
    </div>
  );
};

export default HumidityElement;

