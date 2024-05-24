import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../components/auth'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(
        {
            email: '',
            password: '',

        }
    )
    const { email, password } = values
    const handleChange = name => event => {

        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, error: false })
        //signin process
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {

                    setValues({ ...values })
                    navigate('/')

                }
            })
    }





    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    onChange={handleChange('email')} value={email} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    onChange={handleChange('password')} value={password} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            <div className="d-flex justify-content-between">
                                <Link to='/forgetpassword' className='text-decoration-none'>Forget Password</Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Login