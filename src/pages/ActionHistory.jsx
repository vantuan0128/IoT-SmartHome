import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datasensors.css';
import { GrCaretPrevious } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

const ActionHistory = () => {

    const [actionData, setActionData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    const [selectedField, setSelectedField] = useState('all');
    const [searchField, setSearchField] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/getAllHistory?page=${currentPage}&sortBy=${sortBy}&sortDirection=${sortDirection}&field=${selectedField}&value=${searchField}`);
                const { totalCount, data } = response.data;
                const totalPages = Math.ceil(totalCount / itemsPerPage);
                setTotalPages(totalPages);
                setActionData(data);
            } catch (error) {
                console.error('Error fetching action data:', error);
            }
        };
        fetchData();
    }, [currentPage, sortBy, sortDirection, selectedField, searchField]);

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
                    <option value="device_id">Device_Id</option>
                    <option value="action">Action</option>
                    <option value="time">Time</option>
                </select>
                <input type="text" value={searchField} onChange={handleChangeSearch} />
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
                        <th onClick={() => handleSort('device_id')} style={getHeaderStyle('device_id')}>
                            Device_Id
                            {sortBy === 'device_id' && (
                                <span style={{ color: 'white', marginLeft: '5px' }}>
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        <th onClick={() => handleSort('action')} style={getHeaderStyle('action')}>
                            Action
                            {sortBy === 'action' && (
                                <span style={{ color: 'white', marginLeft: '5px' }}>
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        <th onClick={() => handleSort('time')} style={getHeaderStyle('time')}>
                            Time
                            {sortBy === 'time' && (
                                <span style={{ color: 'white', marginLeft: '5px' }}>
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {actionData.map((data) => (

                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.device_id}</td>
                            <td>{data.action}</td>
                            <td>{formatDate(data.time)}</td>
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
                        return <span key={index}>...</span>
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

export default ActionHistory;
