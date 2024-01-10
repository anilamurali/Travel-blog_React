import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/base_URL';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Blogs({ blog }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }

  }, [])

  return (
    <>
      <Col sm={12} md={12} lg={6} xl={6} className=' my-5'>
        <div class="max-w-64 mx-auto   rounded-xl shadow-md overflow-hidden md:max-w-2xl border-2 border-indigo-300"  >
          <div class="md:flex">
            <div class="md:shrink-0">
              <img className="h-48 w-full object-cover shadow-md md:h-full md:w-56" src={blog ? `${BASE_URL}/uploads/${blog.blogImage}` : 'null'} alt="" />
            </div>
            <div class="p-4">
              <h4 className='text-left' style={{height:'60px'}}>{blog.title}</h4>
              <h6 className='text-left'><i class="fa-solid fa-location-dot text-warning"></i> {blog.location}</h6>
              <p class="text-left ">
                {
                  blog.content.substring(0, 100)
                } ....
              </p>
              <div className='md:flex ' >
                {
                  isLoggedIn ? <Link className='text-warning' to={'/singleBlog/' + blog._id}>Read More..</Link>
                    : <Link onClick={handleShow} className='text-warning'>Read More..</Link>
                }
              </div>
            </div>

          </div>
        </div>
        {/* <MDBCard style={{ width: '300px' }}>
          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage style={{ height: '200px' }} src={blog ? `${BASE_URL}/uploads/${blog.blogImage}` : 'null'} fluid alt='...' />
            <a>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle style={{ height: '50px' }}>{blog.title}</MDBCardTitle>
            <MDBCardText>
              <h6 className='text-warning'><i class="fa-solid fa-location-dot text-warning"></i> {blog.location}</h6>
              <p>{
                blog.content.substring(0, 100)
              } .... </p>
            </MDBCardText>
            {
              isLoggedIn ? <Link className='text-warning' to={'/singleBlog/'+blog._id}>Read More..</Link>
                : <Link onClick={handleShow} className='text-warning'>Read More..</Link>
            }

          </MDBCardBody>
        </MDBCard> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className='text-warning'>Please Login for reading more blogs</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </Col>
    </>
  )
}

export default Blogs