import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datasensors.css';
import { GrCaretPrevious } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

const DataSensors = () => {

    const [sensorData, setSensorData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    const [selectedField, setSelectedField] = useState('all');
    const [searchField, setSearchField] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/getAllData?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}&field=${selectedField}&value=${searchField}`);
                const { totalCount, data } = response.data;
                const totalPages = Math.ceil(totalCount / pageSize);
                setTotalPages(totalPages);
                setSensorData(data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };
        fetchData();

        const interval = setInterval(() => {
            addDataSensor();
        }, 5000);

        return () => clearInterval(interval);

    }, [currentPage, sortBy, sortDirection, selectedField, searchField, pageSize]);

    const addDataSensor = async () => {
        try {
            await axios.post('http://localhost:3002/api/addDataSensor', {});
        } catch (error) {
            console.error('Error calling addDataSensor:', error);
        }
    };


    const handleSort = async (field) => {
        try {
            const direction = sortDirection === 'asc' ? 'desc' : 'asc';
            setSortBy(field);
            setSortDirection(direction);
        } catch (error) {
            console.error('Error sorting sensor data: ', error);
        }
    }

    const getHeaderStyle = (column) => {
        if (sortBy === column) {
            return {
                backgroundColor: sortDirection === 'asc' ? 'green' : 'red',
                color: 'white',
            };
        } else {
            return {
                backgroundColor: 'gray',
                color: 'white',
            }
        }
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChangeSelect = (e) => {
        setSearchField('');
        setSelectedField(e.target.value);
    }

    const handleChangeSearch = (e) => {
        setSearchField(e.target.value);
        setCurrentPage(1);
    }

    const handleChangePageSize = (e) => {
        setCurrentPage(1);
        setPageSize(parseInt(e.target.value));
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='container__data'>
            <div className="filter">
                <select value={selectedField} onChange={handleChangeSelect}>
                    <option value="all">All</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="brightness">Brightness</option>
                    <option value="createdAt">CreatedAt</option>
                </select>
                <input type="text" value={searchField} onChange={handleChangeSearch} />

                <div className="page-size">
                    <select value={pageSize} onChange={handleChangePageSize}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <table className='data-table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')} style={getHeaderStyle('id')}>
                            ID
                            {sortBy === 'id' && (
                                <span style={{ color: 'white', marginLeft: '5px' }}>
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        {selectedField === 'all' && (
                            <>
                                <th onClick={() => handleSort('temperature')} style={getHeaderStyle('temperature')}>
                                    Temperature
                                    {sortBy === 'temperature' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('humidity')} style={getHeaderStyle('humidity')}>
                                    Humidity
                                    {sortBy === 'humidity' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('brightness')} style={getHeaderStyle('brightness')}>
                                    Brightness
                                    {sortBy === 'brightness' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('createdAt')} style={getHeaderStyle('createdAt')}>
                                    Created At
                                    {sortBy === 'createdAt' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            </>
                        )}
                        {(selectedField !== 'all' && selectedField !== 'createdAt') && (
                            <>
                                <th onClick={() => handleSort(selectedField)} style={getHeaderStyle(selectedField)}>
                                    {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}
                                    {sortBy === selectedField && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                                <th onClick={() => handleSort('createdAt')} style={getHeaderStyle('createdAt')}>
                                    Created At
                                    {sortBy === 'createdAt' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            </>
                        )}
                        {selectedField === 'createdAt' && (
                            <>
                                <th onClick={() => handleSort('createdAt')} style={getHeaderStyle('createdAt')}>
                                    Created At
                                    {sortBy === 'createdAt' && (
                                        <span style={{ color: 'white', marginLeft: '5px' }}>
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sensorData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            {selectedField === 'all' && (
                                <>
                                    <td>{data.temperature}</td>
                                    <td>{data.humidity}</td>
                                    <td>{data.brightness}</td>
                                    <td>{formatDate(data.createdAt)}</td>
                                </>
                            )}
                            {(selectedField !== 'all' && selectedField !== 'createdAt') && (
                                <>
                                    <td>{data[selectedField]}</td>
                                    <td>{formatDate(data.createdAt)}</td>
                                </>
                            )}
                            {selectedField === 'createdAt' && (
                                <>
                                    <td>{formatDate(data.createdAt)}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => paginate(1)}><GrChapterPrevious /></button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><GrCaretPrevious /></button>
                {Array.from({ length: totalPages }, (_, index) => {
                    if (index + 1 === 1 || index + 1 === totalPages || (index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2)) {
                        return (
                            <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>{index + 1}</button>
                        );
                    } else if (index + 1 === currentPage - 3 || index + 1 === currentPage + 3) {
                        return <span key={index}>...</span>;
                    } else {
                        return null;
                    }
                })}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}><GrCaretNext /></button>
                <button onClick={() => paginate(totalPages)}><GrChapterNext /></button>
            </div>
        </div>
    )
}

export default DataSensors;



