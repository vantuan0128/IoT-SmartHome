import React, { useEffect, useState } from 'react'
import GraphElement from '../components/GraphElement';
import UtilityElement from '../components/UtilityElement';
import '../styles/dashboard.css'
import RowElement from '../components/RowElement';
import axios from 'axios';

const DashBoard = () => {

    const [data, setSensorData] = useState({
        temperature: 0,
        humidity: 0,
        brightness: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/getAllData?page=1&pageSize=10&sortBy=id&sortDirection=desc');
                const { totalCount, data } = response.data;
                setSensorData(data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <div className='row1'>
                <RowElement data={data}/>
            </div>
            <div className='row2'>
                <GraphElement data={data}/>
                <UtilityElement />
            </div>
        </div>
    )
}

export default DashBoard;
