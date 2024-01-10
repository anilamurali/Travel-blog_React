import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../Components/Profile'
import MyBlog from '../Components/MyBlog'

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [blogcount,setBlogCount]=useState({})
  const [myProfile,setMyProfile]=useState({})
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
    <Header myProfile={myProfile} isLoggedIn={isLoggedIn}/>
    <div className="container">
      <Row>
        <Col xl={4}>
        <Profile setMyProfile={setMyProfile} blogcount={blogcount}/>
        </Col>
        <Col>
          <MyBlog setBlogCount={setBlogCount}/>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default Dashboard