import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addBlogAPI, getUserBlogsAPI } from '../services/allAPI'
import { BASE_URL } from '../services/base_URL'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap'


function MyBlog({ setBlogCount }) {
    const [myBlog, setMyBlog] = useState([])
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({})
    const [blog, setAllBlogs] = useState({
        title: "",
        location: "",
        content: "",
        blogImage: ""
    })
    const [imagePreview, setImagePreview] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setAllBlogs({
            title: "",
            location: "",
            content: "",
            blogImage: ""
        })
        setImagePreview('')

    }

    const getMyBlog = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getUserBlogsAPI(reqHeader)
            if (result.status == 200) {
                setMyBlog(result.data)

            }
            else {
                alert("Can't get  blogs")
            }
        }
        else {
            alert("Error getting Blogs")
        }
    }
    console.log(myBlog);
    const handleAdd = async () => {
        const { title, location, content, blogImage } = blog
        if (!title || !location || !content || !blogImage) {
            alert("Please fill all the feilds")

        }
        else {
            let today = new Date()
            let timestamp = new Intl.DateTimeFormat('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today)
            console.log(timestamp);
            // creation of request body
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("location", location)
            reqBody.append("content", content)
            reqBody.append("blogImage", blogImage)
            reqBody.append("time", timestamp)
            reqBody.append("username", profile.username)


            // console.log(reqBody);
            const tocken = sessionStorage.getItem("token")
            if (tocken) {
                var reqHeader = {
                    "Content-Type": "multipart/form-data", //image data
                    "Authorization": `Bearer ${tocken}`//tocken is appended to the request header 
                }
                // api call
                const result = await addBlogAPI(reqBody, reqHeader)

                if (result.status == 200) {
                    console.log(result.data);
                    setBlogCount(result.data)
                    alert("New Blog is Posted")
                    handleClose()
                    getMyBlog()

                }
                else {
                    console.log(result.response.data);
                    alert("Blog already exists")
                }
            }
        }

    }
    console.log(blog);
    useEffect(() => {
        if (blog.blogImage) {
            // convert image into url
            setImagePreview(URL.createObjectURL(blog.blogImage))

        }
    }, [blog.blogImage])
    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            setProfile(JSON.parse(sessionStorage.getItem("existingUser")))

        }
        getMyBlog()
    }, [])
    // useEffect(() => {
    //     if (sessionStorage.getItem("existingUser")) {
    //         setUserName(JSON.parse(sessionStorage.getItem("existingUser")))

    //     }
    // }, [])

    return (
        <>
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <h2 className='text-slate-600'>Blogs</h2>
                    <Button className='me-2 px-3 border border-2 border-warning ' onClick={handleShow} variant="">Create Blog</Button>

                </div>
                <Row>
                    {
                        myBlog.length > 0 ? myBlog.map(blog => (
                            <Col xl={12}>
                                <div className="card my-3  ">
                                    <div className='d-flex'>
                                        <img className='rounded p-2' width={'300px'} src={blog ? `${BASE_URL}/uploads/${blog.blogImage}` : 'null'} alt="" />
                                        <div className='py-3'>
                                            <h2 className='text-slate-600'>{blog.title}</h2>
                                            <h6><i class="fa-solid fa-location-dot text-warning"></i>  {blog.location}</h6>
                                            <p className='pe-2'>{blog.content.substring(0, 100)}....</p>
                                            <div className='d-flex justify-content-between'>
                                                <p>Posted on : {blog.time}</p>
                                                <Link to={'/dashboard/edit/' + blog._id} className='text-warning me-3'>Manage</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        )) : <div className='container'>
                            <img src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" alt="" />
                        </div>
                    }

                </Row>
                {/* Modal for add blog */}
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
                                <img style={{ width: "250px", height: "220px" }} className='rounded ms-4' src={imagePreview ? imagePreview : "https://th.bing.com/th/id/OIP.u4EBes6Muu2fy7iM8igMugAAAA?w=270&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="" />
                            </div>
                            <label className='d-flex justify-content-center' >
                                <input type="file" style={{ display: 'none' }}
                                    onChange={(e) => setAllBlogs({ ...blog, blogImage: e.target.files[0] })}
                                />

                                <p className='mt-2 bg-warning text-light p-2 rounded shadow'>Upload An Image</p>
                            </label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                <Form.Control onChange={(e) => setAllBlogs({ ...blog, title: e.target.value })} type="text" placeholder="Blog Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                <Form.Control onChange={(e) => setAllBlogs({ ...blog, location: e.target.value })} type="text" placeholder="Locaton" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">

                                <Form.Control onChange={(e) => setAllBlogs({ ...blog, content: e.target.value })} placeholder='content' as="textarea" rows={5} />
                            </Form.Group>

                            {/* <MDBBtn className='mt-3'>Add Project</MDBBtn> */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='me-2 px-3  ' onClick={handleAdd} variant="warning">Create Blog</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}

export default MyBlog