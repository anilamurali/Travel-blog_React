import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlogAPI, getParticularUserBlogAPI, getReviewBlogsAPI, updateBlogAPI } from '../services/allAPI';
import Header from '../Components/Header';
import { Col, Row } from 'react-bootstrap';
import Profile from './Profile';
import { BASE_URL } from '../services/base_URL';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap'
import Review from './Review';
import { RiMenu2Fill } from "react-icons/ri";


function ManageBlog() {
    // const [blog, setBlog] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const [reviews, setReview] = useState([])
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [deleteReviewStatus,setDeleteReviewStatus]=useState(false)

    const [updateBlog, setUpdateBlogs] = useState({
        title: "",
        location: "",
        content: "",
        blogImage: ""
    })
    console.log(updateBlog);
    const [imagePreview, setImagePreview] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleConfirm = () => setConfirm(true);
    const handleClose = () => {
        setShow(false);
        setConfirm(false);
    }
    const handleShow = () => {
        setShow(true);
        // setUpdateBlogs({
        //     title: "",
        //     location: "",
        //     content: "",
        //     blogImage: ""
        // })
    }
    const [image, setImage] = useState("")
    const handleUpdate = async () => {
        const { title, location, content, } = updateBlog
        if (!title || !location || !content) {
            alert("Please fill all the feilds")

        }
        else {
            // request body
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("location", location)
            reqBody.append("content", content)
            reqBody.append("blogImage", image ? image : updateBlog.blogImage)

            if (sessionStorage.getItem("token")) {
                const token = sessionStorage.getItem("token")
                const reqHeader = {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateBlogAPI(id, reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    alert("Suceeesfully updated")
                    getABlog()
                    handleClose()
                }
                else {
                    alert("Can't get  Your profile")
                }
            }
            else {
                alert("Error getting Blogs")
            }
        }
    }
    // console.log(image);

    useEffect(() => {
        if (image) {
            // convert image into url
            setImagePreview(URL.createObjectURL(image))

        }
    }, [image])

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])
    // get review
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

    const getABlog = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getParticularUserBlogAPI(id, reqHeader)
            if (result.status == 200) {
                setUpdateBlogs(result.data)
            }
            else {
                alert("Can't get Blog")
            }
        }
        else {
            alert("Error getting Blogs")
        }
    }

    const handleDelete = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await deleteBlogAPI(id, reqHeader)
            if (result.status == 200) {
                navigate('/dashboard')
            }
            else {
                alert("Can't delete blog")
            }
        }
        else {
            alert("Error getting Blogs")
        }

    }
    console.log(updateBlog);
    useEffect(() => {
        getABlog()
        getReview()
        setDeleteReviewStatus(false)
    }, [deleteReviewStatus])
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container-fluid">
                <Row>
                    <Col xl={4}>
                        <Profile />
                    </Col>
                    <Col>
                        <div className='card mt-3'>

                            <div className="">
                                <img className='rounded p-2' style={{ width: '100%' }} src={updateBlog ? `${BASE_URL}/uploads/${updateBlog?.blogImage}` : 'null'} alt="" />

                                <div className='p-3'>
                                    <h1 className=' text-slate-600  mt-2'>
                                        {updateBlog?.title}
                                    </h1>
                                    <p>Posted On: {updateBlog?.time}</p>
                                    <h6><i class="fa-solid fa-location-dot text-warning"></i>  {updateBlog?.location}</h6>
                                    <p style={{ textAlign: 'justify' }}>{updateBlog?.content}</p>
                                </div>
                            </div>
                            <div className='d-flex flex-row-reverse my-3'>
                                <button onClick={handleConfirm} className='btn btn-secondary me-4'><i class="fa-solid fa-trash m-2"></i></button>
                                <button onClick={handleShow} className='btn btn-secondary mx-2'><i class="fa-regular fa-pen-to-square m-2"></i></button>
                            </div>
                            <hr className='mx-2' />
                            <div className='flex flex-row'>
                        <h5 className='text-slate-600  ms-3 me-1 mt-3'>Comments</h5><RiMenu2Fill className='mt-4' />

                    </div>
                            {
                        reviews.length > 0 ? reviews.map(item => (
                            <Review  manageReview setDeleteReviewStatus={setDeleteReviewStatus}  reviews={item} />
                        )) : <p className='ms-3'>No Comments Found</p>
                    }
                    
                        </div>
                    </Col>
                    <Modal
                        size='lg'
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className='text-dark '>Add Your Travel Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='mb-3  '>
                                <div className='d-flex justify-content-center'>
                                    <img style={{ width: "250px", height: "220px" }} className='rounded ms-4' src={imagePreview ? imagePreview : `${BASE_URL}/uploads/${updateBlog?.blogImage}`} alt="" />
                                </div>
                                <label className='d-flex justify-content-center' >
                                    <input type="file" style={{ display: 'none' }}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />

                                    <p className='mt-2 bg-warning text-light p-2 rounded shadow'>Upload An Image</p>
                                </label>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                    <Form.Control value={updateBlog?.title} onChange={(e) => setUpdateBlogs({ ...updateBlog, title: e.target.value })} type="text" placeholder="Blog Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                    <Form.Control value={updateBlog?.location} onChange={(e) => setUpdateBlogs({ ...updateBlog, location: e.target.value })} type="text" placeholder="Locaton" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="content">

                                    <Form.Control value={updateBlog?.content} onChange={(e) => setUpdateBlogs({ ...updateBlog, content: e.target.value })} placeholder='content' as="textarea" rows={5} />
                                </Form.Group>

                                {/* <MDBBtn className='mt-3'>Add Project</MDBBtn> */}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className='me-2 px-3  ' onClick={handleUpdate} variant="warning">Update Blog</Button>
                        </Modal.Footer>
                        {/* confirm delete */}
                    </Modal>
                  <Modal className='mt-40' show={confirm} onHide={handleClose}>

                        <Modal.Body className='text-warning'>Do you want to delete this blog</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancle
                            </Button>
                            <Button className='me-2 px-3  ' onClick={handleDelete} variant="warning">Delete Blog</Button>


                        </Modal.Footer>
                    </Modal>
                </Row>

            </div>
        </>
    )
}

export default ManageBlog