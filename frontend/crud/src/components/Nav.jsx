import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../Config/config'

export const Nav = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.post(`${API}/signout`)
            .then(navigate('/login'))
    }
    return (
        <>

            <nav className="navbar">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand ">User Management System</Link>
                    <form className="d-flex" role="search">
                        <button className='btn btn-primary me-3' onClick={handleLogout}>Logout</button>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </>
    )
}
