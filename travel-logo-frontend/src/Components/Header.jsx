import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/base_URL';
import { getuserprofileAPI } from '../services/allAPI';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';


function Header({ myProfile, isLoggedIn }) {
  // console.log(isLoggedIn);
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const getProfile = async () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getuserprofileAPI(reqHeader)
      if (result.status == 200) {
        setUserData(result.data)
      }
      else {
        alert("Can't get  Your profile")
      }
    }
    else {
      // alert("Error getting profile")

    }
  }
  useEffect(() => {
    getProfile()

  }, [myProfile])




  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow-none bg-white">
        <Container >
          <Navbar.Brand>
            <img style={{ width: '200px', height: '70px' }} src="https://www.codester.com/static/uploads/items/000/029/29949/preview/005.jpg" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {
                isLoggedIn &&
                <div className='d-flex'>
                  <Link style={{ textDecoration: 'none' }} to={'/'}> <Nav.Link href="#features">Home</Nav.Link> </Link>
                  <Link style={{ textDecoration: 'none' }} to={'/blog'}> <Nav.Link href="#features">Blogs</Nav.Link> </Link>
                  <Link style={{ textDecoration: 'none' }} to={'/bloggers'}>
                    <Nav.Link href="#pricing">Bloggers</Nav.Link>

                  </Link>
                </div>
              }
              {/* <Nav.Link href="#pricing">About</Nav.Link> */}

              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav>
              {
                isLoggedIn ?
                  <div className='d-flex '> <Link style={{ textDecoration: 'none' }} to={'/dashboard'}>
                    {/* <h6 className='text-danger me-3 p-3   rounded-pill bg-secondary'>{userData.username}</h6> */}
                    <img style={{ borderRadius: "100px", width: '50px', height: '50px' }} className='me-3 border border-2 border-warning' src={userData?.profile ? `${BASE_URL}/uploads/${userData?.profile}` : "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"} alt="" />
                  </Link>
                    <MDBPopover className='m-2' color='secondary' btnChildren={userData?.username} placement='bottom'>


                    </MDBPopover>
                    {/* <Button onClick={logout} className='p-2 mt-1 rounded-pill  ' variant="warning">Logout</Button> */}

                  </div> :
                  <div>
                    <Link to={'/login'}>
                      <Button className='me-2 px-4 rounded-pill ' variant="">Login</Button>
                    </Link>
                    <Link to={'/register'}>
                      <Button className='rounded-pill' variant="warning">Register</Button></Link>

                  </div>

              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header