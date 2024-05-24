import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { API } from '../Config/config'

const AddUser = () => {
    const [userData, setData] = useState({
        userName: '',
        email: '',
        password: ''
    })
    const {
        userName,
        email,
        password


    } = userData

    const handleChange = (name) => (event) => {
        setData({
            ...userData,
            error: false,
            [name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                userName: userData.userName,
                email: userData.email,
                password: userData.password
            };

            const Config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            // try {
            //     const formData = new FormData();
            //     formData.append('userName', userData.userName);
            //     formData.append('email', userData.email);
            //     formData.append('password', userData.password);

            //     const Config = {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         }

            //     }


            const response = await axios.post(`${API}/userRegister`, data, Config);
            if (response) {
                toast.success("USer added successfully")
            }
            setData({
                userName: '',
                email: '',
                password: ''

            })

        }
        catch (err) {
            toast.error('Failed to add user', err)
        }

    }

    return (
        <>
            {/* <ToastContainer theme='colored' position='top-right' /> */}
            <div className='uploaduser-container'>
                <form className='upload-userForm' encType="multipart/form-data" method="post" >
                    <h1 className='page-name'>Add New User</h1>
                    <div className="upload-userform">
                        <label htmlFor="userName">Name</label>
                        <input type="text" className="form-control" name='userName' id="userName" placeholder="Name of the user"
                            onChange={handleChange('userName')}
                            value={userName} />
                    </div>

                    <div className="upload-userform">
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' className="form-control" id="email" placeholder="Email"
                            onChange={handleChange('email')}
                            value={email} />
                    </div>


                    <div className="upload-userform">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' className="form-control" id="password" placeholder="password"
                            onChange={handleChange('password')}
                            value={password} />
                    </div>

                    <button className="btn btn-primary" onClick={handleSubmit}>Add User</button>
                </form>
            </div>

        </>
    )
}

export default AddUser