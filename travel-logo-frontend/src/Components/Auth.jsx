import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Button, Col, Row, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { loginAPI, registerAPI } from '../services/allAPI'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

function Auth({ register }) {
    const registerform = register ? true : false
    // for navigating to login 
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        place: "",
        password: ""
    })
    console.log(userData);
    // register function
    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, place, password } = userData
        let today = new Date()
        let joined = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today)

        if (!userData.username || !userData.place || !userData.email || !userData.password) {
            // alert("Please fill all field")
            toast.error("Please fill all field")

        }
        else {
            const result = await registerAPI({ username, email, place, joined, password })
            if (result.status == 200) {
                // alert(`${result.data.username} has been registered`)
                toast.warning(`${result.data.username} has been registered`)
                navigate('/login')
            }
            else {
                // alert("email alrady exist")
                toast.error("mail already exists")
            }
        }
    }
    // login function

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!userData.email || !userData.password) {
            // alert("Please fill all field")
            toast.error("Please fill all field")
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);
            if (result.status == 200) {
                // alert("Login Successfull")
                // toast.info('Login Successfull')
                // to set user details in sessionStorage
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                setUserData({
                    email: "",
                    password: ""
                })
                navigate('/')
            }
            else {
                // alert("login Failed")
                toast.error("login Failed")
            }
        }


    }

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center text-center p-5">
                <div className="container px-5 ">
                    <div className="card shadow rounded ">
                        <div className="row ">
                            {
                                <div className="col d-flex justify-content-center">
                                    <img className='p-2 ' style={{ width: '100%', borderRadius: '20px' }} src="https://img.freepik.com/premium-vector/login-concept-with-security-username-password-people-standing-access-with-isometric_197170-126.jpg?w=360" alt="" />

                                </div>
                            }
                            <div className="col mt-5 ">
                                <div className="d-flex justify-content-center flex-column">
                                    <h2 className='text-warning mt-5'>{registerform ? 'REGISTER' : 'LOGIN'}</h2>
                                    <h5 className='mt-2 text-slate-500'>{
                                        registerform ? 'Sign Up to Your Account' : 'Sign In to Your Account'}</h5>
                                    <form className='px-5' >
                                        {

                                            <div className='px-5'>
                                                {registerform &&
                                                    // <MDBInput color='warning' className='my-4 ' onChange={(e) => setUserData({ ...userData, username: e.target.value })} label='Username' id='form1' type='text' />
                                                    <input onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" className="form-control my-4  rounded-3" placeholder='Enter your Name' />

                                                }
                                                {
                                                    registerform &&
                                                    <input onChange={(e) => setUserData({ ...userData, place: e.target.value })} type="text" className="form-control my-4  rounded-3" placeholder='Enter your Location' />

                                                }
                                                <input onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="text" className="form-control my-4 rounded-3" placeholder='Enter your Email' />
                                                <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="text" className="form-control my-4 rounded-3" placeholder='Enter your Password' />

                                                {
                                                    !registerform &&
                                                    <Link to={'/login/fogotpassword'} style={{ textDecoration: 'none' }} className='mt-5 text-slate-500'>Forgot Password</Link>

                                                }
                                                {
                                                    registerform ? <div>
                                                        <MDBBtn onClick={handleRegister} className='mt-2 btn-warning  rounded-pill' style={{ width: '150px' }} >Register</MDBBtn>
                                                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                                            <p className='mt-4 mb-4 text-slate-500'>Already have an account? Pleae Login Here</p></Link>

                                                    </div> :
                                                        <div>
                                                            <MDBBtn onClick={handleLogin} className='mt-2 btn-warning  rounded-pill' style={{ width: '150px' }}  >Login</MDBBtn>
                                                            <Link to={'/register'} style={{ textDecoration: 'none' }}><p className='mt-4 text-slate-500'>Don't have an account? Pleae Register Here</p></Link>

                                                        </div>
                                                }
                                            </div>
                                        }
                                    </form>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="light"

                                    />


                                </div>
                            </div>
                        </div>

                    </div>
                    <Link to={'/'} style={{ textDecoration: 'none' }} className='mb-5 pt-5 text-warning'><i class="fa-solid fa-arrow-left fa-fade text-warning"></i> Back To Home</Link>

                </div>

            </div>

        </>
    )
}

export default Auth