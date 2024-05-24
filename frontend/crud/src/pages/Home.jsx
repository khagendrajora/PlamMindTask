import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'
import { API } from '../Config/config'
import { FaTrash, FaPenAlt, FaBook } from 'react-icons/fa';

export const Home = () => {
    const [user, setUser] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`${API}/userlist`)
            .then(res => {
                setUser(res.data)
            }).catch(err => console.log(err))
    })

    const Delete = id => {
        const confirmed = window.confirm('Are you sur you want to delete this food item')
        if (confirmed) {
            axios.delete(`${API}/userdelete/${id}`)
                .then(res => {
                    toast.success('user deleted')
                    setUser(user.filter(i => i._id !== id))
                }).catch(err => {
                    toast.error('failed to delete')
                })
        }
    }
    const Edit = id => {
        navigate(`/edituser/${id}`)

    }
    const Read = id => {
        navigate(`/userdetail/${id}`)

    }
    const Add = () => {
        navigate('/adduser')
    }
    const handleLogout = () => {
        axios.post(`${API}/signout`)
            .then(navigate('/login'))
    }

    return (
        <>
            <ToastContainer theme='colored' position='top-center' />

            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand">User Management System</Link>
                    <form className="d-flex" role="search">
                        <button className='btn btn-outline-primary me-3' onClick={handleLogout}>Logout</button>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            <div className='item-list'>
                <div className='data'>
                    <button className='btn-create' onClick={() => Add()} >Add User</button>
                    <table className='table  table-bordered table-striped'>
                        <thead className=''>
                            <tr className=''>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.map((user, i) =>
                                <tr key={i}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className='action'>
                                            <button className='btn btn-primary' onClick={() => Read(user._id)}><FaBook /></button>
                                            <button className='btn btn-success' onClick={() => Edit(user._id)}><FaPenAlt /></button>
                                            <button className='btn btn-danger' onClick={() => Delete(user._id)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            )

                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
