import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';
import './login.css'
import toast, { Toaster } from 'react-hot-toast';


export const Login = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState({
        email: '',
        password: ''
    })


    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: ''
    })

    const detectChange = (e) => {
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
            ;
        if (e.target.name == 'email') {
            setUsers({ password: users.password, email: e.target.value })
            setErrors({ ...errors, emailError: (e.target.value.length == 0) ? "E-mail is required" : (emailRegex.test(e.target.value)) ? "" : 'invalid email' })
        }
        else if (e.target.name == 'password') {
            setUsers({ password: e.target.value, email: users.email })
            setErrors({ ...errors, passwordError: (e.target.value.length == 0) ? "password is required" : (e.target.value.length < 8) ? "password is less than 8" : '' })
        }
    }
    const login =async (e) => {
        e.preventDefault()
        if(!errors.emailError&& !errors.passwordError){
            try{
             await loginUser(users.email,users.password)
             navigate('/movies')

            }catch(error)
            {
                toast('Sign Up and create account', {icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
                    position: "bottom-center"
                  })
                toast.error('Your email and password not found',{position:"top-center"})

            }
        }
    }

    return <>
    <div className='container col-6 mt-5 border p-4 bg-dark  rounded-4 log'>
        <h1 className='text-light'>Login!</h1>
        <form onSubmit={(e) => { login(e) }}>
            <div className="form-group">
                <label  htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name='email'
                    onChange={(e) => { detectChange(e) }}
                    value={users.email}
                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <p className="text-danger">{errors.emailError}</p>

            <div className="form-group my-3">
                <label  htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name='password'
                    onChange={(e) => { detectChange(e) }}
                    value={users.password}
                    id="exampleInputPassword1" placeholder="Password" />
            </div>
            <p className="text-danger">{errors.passwordError}</p>

            <button type="submit" className="btn btn-primary me-5">Login</button>
            <button  className="btn btn-success " onClick={(e)=>{
                // e.preventDefault()
                    navigate('/register')
                }} > Sign Up</button>
        <Toaster  />
                

        </form>
        </div>
    </>
}