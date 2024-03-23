import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'

const NavBarElement = () => {
    return (
        <div className='container__nav'>
            <ul className='container__nav--list'>
                <li>
                    <Link to='/dashboard'>DashBoard</Link>
                </li>
                <li>
                    <Link to='/data-sensors'>Data Sensors</Link>
                </li>
                <li>
                    <Link to='/action-history'>Action History</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBarElement;


