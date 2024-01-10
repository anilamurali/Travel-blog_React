import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getBlogerBlogsAPI, getBloggerProfileAPI } from '../services/allAPI'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../services/base_URL'


function Blogger() {
    const { id } = useParams()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [bloggerProfiile, setBloggerProfile] = useState([])
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        getBloggerProfile()
        getBloggerBlog()
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])
    console.log(bloggerProfiile);
    // get Bloger profile
    const getBloggerProfile = async () => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getBloggerProfileAPI(id, reqHeader)
            if (result.status == 200) {
                setBloggerProfile(result.data)
            }
            else {
                alert("Can't get  Your profile")
            }
        }
        else {
            alert("Error getting tocken")

        }
    }
    // get blogger blogs
    console.log(blogs);
    const getBloggerBlog = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getBlogerBlogsAPI(id, reqHeader)
            if (result.status == 200) {
                setBlogs(result.data)

            }
            else {
                alert("Can't get  blogs")
            }
        }
        else {
            alert("Error getting Blogs")
        }
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container">
                <div className="col col-12 sm-col-12 col-xl-12">
                    <div className='   d-flex flex-row mx-5 my-2'>
                        <img className='m-2 rounded' style={{ width: '200px' }} src={bloggerProfiile ? `${BASE_URL}/uploads/${bloggerProfiile?.profile}` : "https://th.bing.com/th/id/OIP.SRLqusZ0zuen8gOPVJtVBgHaFg?rs=1&pid=ImgDetMain"} alt="" />
                        <div className='m-2'>
                            <h3 className='text-slate-600  mt-2'>{bloggerProfiile.username}</h3>
                            <h6><i class="fa-solid fa-location-dot text-warning"></i> {bloggerProfiile?.place}</h6>
                            <p className='me-5'>{bloggerProfiile.overview}</p>
                            <p className='me-3'>Joined on :{bloggerProfiile?.joined}</p>
                        </div>
                    </div>
                    <h1 className='text-slate-600 mx-5 '>Bolgs</h1>
                    <div className="row">
                        {
                            blogs.length>0 ?blogs.map(blog=>(
                                <div className="col col-12 col-xl-12">
                            <div className="card my-3 mx-5 ">
                                <div className='d-flex'>
                                    <img className='rounded p-2' width={'300px'} src={blog ? `${BASE_URL}/uploads/${blog.blogImage}` : 'null'} alt="" />
                                    <div className='py-3'>
                                        <h2 className='text-slate-600'>{blog.title}</h2>
                                        <h6><i class="fa-solid fa-location-dot text-warning"></i>  {blog.location}</h6>
                                        
                                        <p className='me-5'>{blog.content.substring(0, 200)}....</p>
                                        <div className='d-flex justify-content-between'>
                                            <p>Posted on : {blog.time}</p>
                                            <Link className='text-warning me-5' to={'/singleBlog/' + blog._id}>Read More..</Link>
                                            {/* <Link to={'/dashboard/edit/' + blog._id} className='text-warning me-3'>Manage</Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )):<div className='container'>
                            <img src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" alt="" />
                        </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Blogger