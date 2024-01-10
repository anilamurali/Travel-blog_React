import React, { useEffect, useState } from 'react'
import { addBlogAPI, deleteProfileAPI, deleteUserBlogsAPI, deleteUserReviewAPI, getUserBlogsAPI, getuserprofileAPI, updateUserAPI } from '../services/allAPI'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap'
import { BASE_URL } from '../services/base_URL';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Profile({ setMyProfile, blogcount }) {
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState({
    username: "",
    place: "",
    profile: "",
    overview: ""
  })
  const [myBlog, setMyBlog] = useState([])
  const [confirm, setConfirm] = useState(false);
  const [id, setUserId] = useState([])
  const { _id } = id
  console.log(_id);
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState('https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png')
  const [image, setImage] = useState()
  const handleConfirm = () => setConfirm(true);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);

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

  console.log(userProfile);
  const getProfile = async () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getuserprofileAPI(reqHeader)
      if (result.status == 200) {
        setUserProfile(result.data)
      }
      else {
        alert("Can't get  Your profile")
      }
    }
    else {
      alert("Error getting profile")

    }
  }
  const updateProfile = async () => {
    const { username, profile, place, overview } = userProfile
    const reqBody = new FormData()
    reqBody.append("username", username)
    reqBody.append("place", place)
    reqBody.append("profile", image ? image : userProfile.profile)
    reqBody.append("overview", overview)

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await updateUserAPI(reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
        alert("Profile updated")
        handleClose()
        setMyProfile(result.data)
        getProfile()
      }
      else {
        alert("Can't update  Your profile")
      }
    }
    else {
      alert("Error getting Token")
    }
  }

  // delete Profile
  const handleDelete = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const blogs = await deleteUserBlogsAPI(_id, reqHeader)
      const review = await deleteUserReviewAPI(_id, reqHeader)
      const user = await deleteProfileAPI(_id, reqHeader)
      if (blogs.status == 200 && review.status == 200 && user.status == 200) {
        console.log(blogs, user, review);
        handleClose()
        sessionStorage.clear()
        navigate('/')
      }
      else {
        alert("Can't delete blog")
      }
    }
    else {
      alert("Error getting Blogs")
    }

  }

  useEffect(() => {
    if (image) {
      // convert image into url
      setImagePreview(URL.createObjectURL(image))

    }
  }, [image])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setUserId(JSON.parse(sessionStorage.getItem("existingUser")))
    }
  }, [])

  useEffect(() => {
    getProfile()
    getMyBlog()

  }, [blogcount])
  const logout = () => {
    sessionStorage.clear()

  }


  return (
    <>
      <div className="">
        <div className="card  p-3 my-3 h-screen">
          <div className='mt-3 d-flex'>
            <img style={{ width: '100px', height: '100px' }} className='rounded-circle me-3' src={userProfile.profile ? `${BASE_URL}/uploads/${userProfile.profile}` : "https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"} alt="" />
            <div className='text-center mt-5 mx-5'>
              <h6 className='text-dark ms-5'>{myBlog.length}</h6>
              <h6 className='text-dark ms-5'>Blogs</h6>
            </div>

          </div>
          <h4 className=' text-slate-600  mt-2'>{userProfile.username}</h4>
          <h6 className=''><i class="fa-solid fa-location-dot text-warning"></i> {userProfile.place}</h6>

          <p className='mt-3' style={{ textAlign: '' }}>{userProfile.overview}
          </p>
          <div className="">
            {/* <Button onClick={handleShow} className=' ms-3 me-1 px-4  ' variant="">Edit Profile</Button>
            <Button className='me-2  my-5 ' onClick={logout} variant="">logout</Button> */}
            <MDBTable >

              <MDBTableBody >
                <tr >
                  <td ></td>
                </tr>
                <tr >
                  <td ><Link onClick={handleShow} style={{ textDecoration: 'none' }} className='text-warning text-lg'>Edit Profile</Link></td>
                </tr>
                <tr>
                  <td > <Link onClick={logout} to={'/'} style={{ textDecoration: 'none' }} className='text-warning text-lg'>logout</Link></td>
                </tr>
                <tr>
                  <td ><Link onClick={handleConfirm} style={{ textDecoration: 'none' }} className='text-danger text-lg'>Delete Profile</Link></td>
                </tr>
              </MDBTableBody>
            </MDBTable>


          </div>
        </div>
      </div>
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
              <img style={{ width: "250px", height: "220px" }} className='rounded-circle ms-4' src={imagePreview ? imagePreview : `${BASE_URL}/uploads/${userProfile.profile}`} alt="" />
            </div>
            <label className='d-flex justify-content-center' >
              <input type="file" style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files[0])}
              />

              <p className=' bg-warning text-light p-2 rounded-circle shadow' style={{ marginLeft: '190px', marginTop: '-50px' }} ><i class="fa-solid fa-camera fa-lg"></i></p>
            </label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <Form.Control value={userProfile?.username} onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })} type="text" placeholder="Blog Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <Form.Control value={userProfile?.place} onChange={(e) => setUserProfile({ ...userProfile, place: e.target.value })} type="text" placeholder="Location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <Form.Control value={userProfile?.overview} onChange={(e) => setUserProfile({ ...userProfile, overview: e.target.value })} type="text" placeholder="Description" />
            </Form.Group>


            {/* <MDBBtn className='mt-3'>Add Project</MDBBtn> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='me-2 px-3  ' onClick={updateProfile} variant="warning">Edit Profile</Button>
        </Modal.Footer>
      </Modal>
      {/* confirm */}
      <Modal className='mt-40' show={confirm} onHide={handleClose}>

        <Modal.Body className='text-warning'>Do you want to delete Your Profile</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button className='me-2 px-3  ' onClick={handleDelete} variant="warning">Delete Profile</Button>


        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Profile