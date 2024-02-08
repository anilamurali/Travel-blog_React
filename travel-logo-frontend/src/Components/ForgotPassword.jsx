import React, { useState } from 'react'
import Header from './Header'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { getProfileAPI, resetPasswordAPI } from '../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [resetStatus, setResetStatus] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const getProfile = async () => {
        if (!email) {
            toast.error("Please fill all field")
        }
        else {
            const result = await getProfileAPI(email)
            // console.log(result);
            if (result.data) {
                setResetStatus(true)

            }
            else {
                toast.error("This email is not registered")
                // setResetStatus(false)
            }
        }

    }
    const restPassword = async (e) => {
        e.preventDefault()

        if (!password) {
            toast.warning("Enter Password")
        }
        else if (!confirmPassword) {
            alert("Enter Confirm Password")
        }
        else if (!email || !confirmPassword) {
            alert("Enter  all feild")
        }
        else if (password != confirmPassword) {
            alert("Password and Confirm Password does'nt match")
        }
        else {
            const reqBody = { password }
            const result = await resetPasswordAPI(email, reqBody)
            console.log(result);

            if (result.status == 200) {
                setResetStatus(true)
                navigate('/login')
            }
            else {
                toast.error("Could't reset your password ")
            }
        }
    }
   

    return (
        <>
            <Header />
            <div className="container flex justify-center">
                <div className="card text-center p-5 m-5">
                    <h4 className='mx-5 my-5 text-warning'>Reset Password</h4>
                    <form>
                       
                        <MDBInput onChange={(e) => setEmail(e.target.value)} className='mb-2' type='email' label='Email address' />
                        <Link onClick={getProfile} style={{ textDecoration: 'none', paddingBottom: '20px' }} className='text-warning  '>Reset Password</Link>
                        {
                            resetStatus&&
                            <div>
                                <MDBInput onChange={(e) => setPassword(e.target.value)} className='mb-4 mt-2' type='password' label='Password' />
                                <MDBInput onChange={(e) => setConfirmPassword(e.target.value)} className='mb-4 mt-2' type='password' label='Confirm Password' />
                                <button onClick={restPassword} className='btn btn-warning' type='submit' >
                                    Reset Password
                                    
                                </button>
                            </div>}



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
        </>
    )
}

export default ForgotPassword