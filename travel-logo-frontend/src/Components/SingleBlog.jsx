import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addReviewBlogsAPI, getSingleBlogAPI } from '../services/allAPI'
import { BASE_URL } from '../services/base_URL'
import Header from './Header'
import { RiMenu2Fill } from "react-icons/ri";
import Review from './Review'
import { getReviewBlogsAPI } from '../services/allAPI'
import { IoMdSend } from "react-icons/io";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';


function SingleBlog() {
    const { id } = useParams()
    const [singleBlog, setSingleBlog] = useState([])
    const [reviews, setReview] = useState([])
    const [username1, setUserName] = useState({})
    const [reviewText, setReviewText] = useState("")

    // console.log(id);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])
    // console.log(username);
    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            setUserName(JSON.parse(sessionStorage.getItem("existingUser")))

        }
    }, [])

    // get Review
    const getReview = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getReviewBlogsAPI(id, reqHeader)
            if (result.status == 200) {
                setReview(result.data)
            }
            else {
                alert("Can't get  review")
            }
        }
        else {
            alert("Error getting review")
        }
    }
    // console.log(reviews);
    // add Review
    const addReview = async (e) => {
        e.preventDefault()
        if (!reviewText) {
            alert("Please fill all field")

        }
        else {
            let today = new Date()
            let timestamp = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today)
            const reqBody = { blogId: id, username: username1.username, reviewText, time: timestamp }
            const tocken = sessionStorage.getItem("token")
            if (tocken) {
                // console.log(reqBody);

                var reqHeader = {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${tocken}`//tocken is appended to the request header 
                }

                const result = await addReviewBlogsAPI(reqBody, reqHeader)

                if (result.status == 200) {
                    console.log(result.data);
                    alert(`Comment Added`)
                    setReviewText("")
                    getReview()

                }
                else {
                    alert("Cannot add review")
                }
            }

            else {
                alert("Error getting profile")
            }

        }
    }



    const getABlog = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getSingleBlogAPI(id, reqHeader)
            if (result.status == 200) {
                setSingleBlog(result.data)
            }
            else {
                alert("Can't get Blog")
            }
        }
        else {
            alert("Error getting Blogs")
        }
    }
    console.log(singleBlog);
    useEffect(() => {
        getABlog()
        getReview()

    }, [])
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container p-3">
                <div className="card p-2 ">

                    <h1 className=' text-slate-600  m-3'>
                        {singleBlog.title}
                    </h1>
                    <h6 className='px-3'><i class="fa-solid fa-location-dot text-warning"></i> {singleBlog.location}</h6>
                    <img style={{ height: '500px' }} className='rounded m-3' src={`${BASE_URL}/uploads/${singleBlog.blogImage}`} alt="" />
                    <p className='px-3 pb-3' style={{ textAlign: 'justify' }}>{singleBlog.content}</p>
                    <h5 className='text-slate-600  mx-3'><i class="fa-regular fa-user text-danger p-2 bg-secondary rounded-circle"></i> {singleBlog.username}</h5>
                    <p className='px-3 pb-3'>Posted on :{singleBlog.time}</p>

                    <hr />
                    <div className='flex flex-row'>
                        <h5 className='text-slate-600  ms-3 me-1 mt-3'>Comments</h5><RiMenu2Fill className='mt-4' />

                    </div>
                    {
                        reviews.length > 0 ? reviews.map(item => (
                            <Review  reviews={item} />
                        )) : <p className='ms-3'>No Comments Found</p>
                    }
                    <div className="container">
                        <div className="card m-5 bg-secondary rounded-pill flex flex-row justify-between  ">
                            <input value={reviewText} style={{ background: 'none', outline: 'none', width: '100%' }} onChange={(e) => setReviewText(e.target.value)} className='p-2 ' type="text" placeholder='Enter Comment' />
                            <IoMdSend onClick={addReview} className='mt-2 me-3' style={{ fontSize: '25px' }} />
                            {/* <button></button> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SingleBlog