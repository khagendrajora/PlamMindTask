import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../Config/config'
import { ToastContainer, toast } from 'react-toastify'

const EditUser = () => {
    const params = useParams()
    const id = params.user_id
    const [initialValues, setInitialValues] = useState({})
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')


    useEffect(() => {

        axios.get(`${API}/userdetail/${id}`)
            .then(res => {
                setInitialValues(res.data)
                setUserName(res.data.userName)
                setEmail(res.data.email)

                console.log(res.data)


            })
            .catch(err => console.log(err))


    }, [params.user_id])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData()
            formData.append('userName', userName)
            formData.append('email', email)


            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"

                }
            }

            const response = await axios.put(`${API}/userupdate/${id}`, formData, config)
            if (response) {
                toast.success("User Details Updated")
            }
            else {
                toast.error("Failed TO Update")
            }

        }
        catch (err) {
            console.error(err)
        }

    }
    return (
        <>


            <ToastContainer theme='colored' position='top-right' />
            <div className="container">

                <form className="shadow p-3">

                    <h3 className="text-ceter text-muted">Update User Form</h3>
                    <div className="mb-2">
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="form-control"
                            onChange={e => setUserName(e.target.value)}
                            value={userName}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Item Price:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>






                    <div className="mb-2">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default EditUser