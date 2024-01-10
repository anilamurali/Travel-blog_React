import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Blogs from '../Components/Blogs';
import Header from '../Components/Header';
import { homeBlogAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';



function Home() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [homeBlog, setHomeBlog] = useState([])

    const getHomeBlog = async () => {
        const result = await homeBlogAPI()
        if (result.status == 200) {
            setHomeBlog(result.data)

        }
        else {
            alert("Can't get home blogs")
        }

    }
    

    useEffect(() => {
        getHomeBlog()
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }

    }, [])
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container">

                <Row>
                    <Col sm={12} md={12} lg={6} xl={6} className=' my-5'>
                        <div>
                            <h1 className='text-slate-500'>
                                Traveling Opens the Door To Creating <span className='text-warning'>Memories</span>
                            </h1>
                            <p className='pe-5 mt-3 me-4 text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam blanditiis neque,
                                alias non itaque, eaque tenetur fuga voluptatum corporis accusamus ad,
                                similique asperiores! Fugiat illum inventore deleniti consequatur amet? Quasi.</p>
                        </div>

                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className=' my-5'>
                        <MDBCarousel className='shadow' showControls   >
                            <MDBCarouselItem style={{ borderRadius: '30px' }} itemId={1}>
                                <img style={{ height: '350px', borderRadius: '30px' }} src='https://images.squarespace-cdn.com/content/v1/53a05cdee4b0c1bc44841a7b/1523902696413-03PP9BYLSHDUQV5R4BQ1/25+Travel+GIFS+from+Around+the+World' className='d-block w-100 ' alt='...' />
                            </MDBCarouselItem>
                            <MDBCarouselItem style={{ borderRadius: '30px' }} itemId={2}>
                                <img style={{ height: '350px', borderRadius: '30px' }} height={'300px'} src='https://www.edreams.com/blog/wp-content/uploads/sites/3/2016/03/cities-travel.gif' className='d-block w-100' alt='...' />
                            </MDBCarouselItem>
                            <MDBCarouselItem style={{ borderRadius: '30px' }} itemId={3}>
                                <img style={{ height: '350px', borderRadius: '30px' }} height={'300px'} src='https://th.bing.com/th/id/R.e3d138610b422a97f692aad246e58d24?rik=EpOqjyLtaWCAIQ&riu=http%3a%2f%2fpumpernickelpixie.com%2fwp-content%2fuploads%2f2015%2f06%2f111.gif&ehk=A9AcnfA9APdb4gyVp4VsvE3blCfUYcaPxZmrqvMRAJs%3d&risl=&pid=ImgRaw&r=0' className='d-block w-100' alt='...' />
                            </MDBCarouselItem>
                            <MDBCarouselItem style={{ borderRadius: '30px' }} itemId={4}>
                                <img style={{ height: '350px', borderRadius: '30px' }} height={'300px'} src=' https://th.bing.com/th/id/R.a6aca1153f7aec5c4590845eab23eef5?rik=5LP4IDF%2b5rON4g&riu=http%3a%2f%2fmedia.giphy.com%2fmedia%2fYwaE8W0Sjopgc%2fgiphy.gif&ehk=KGW5%2fp9yiqZV8nng%2fRRJPouxDYslmRsOqZ25FUf63ws%3d&risl=&pid=ImgRaw&r=0
                            ' className='d-block w-100' alt='...' />
                            </MDBCarouselItem>
                        </MDBCarousel>
                    </Col>

                </Row>
                <Row>
                    <h2 className='text-slate-500'>
                        Amazing Traveling <span className='text-warning'> Blogs</span>
                    </h2>
                    <Row>
                        {
                            homeBlog.length > 0 ? homeBlog.map(blog => (
                                <Blogs blog={blog} />
                            )) :

                                <div className='container'>
                                    <img src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" alt="" />
                                </div>
                        }
                    </Row>
                    <div className='text-center mb-3'>
                        {
                            isLoggedIn?<Link to={'/blog'} >
                            <Button className='rounded-pill' variant="warning">View More</Button>
                            </Link>:
                            
                            <Button onClick={handleShow} className='rounded-pill' variant="warning">View More</Button>  
                        }
                        

                    </div>
                    <Modal show={show} onHide={handleClose}>
        
        <Modal.Body className='text-warning'>Please Login for reading more blogs</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

                </Row>
            </div>
        </>
    )
}

export default Home