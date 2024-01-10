import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { Col, Row } from 'react-bootstrap';
import { getAllBlogsAPI } from '../services/allAPI';
import Blogs from '../Components/Blogs';

function AllBlogs() {
    const [searchkey,setSearchKey]=useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [allblogs, setAllBlogs] = useState([])
    // get all projects
    console.log(searchkey);
    const getAllBlog = async () => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getAllBlogsAPI(searchkey,reqHeader)
            if (result.status == 200) {
                setAllBlogs(result.data)
            }
            else {
                alert("Can't get  blogs")
            }
        }
        else {
            alert("Error getting Token")
        }
    }
    console.log(allblogs);

    useEffect(() => {
        getAllBlog()
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }

    }, [searchkey])

    return (

        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className='container text-center'>
                <div className='d-flex container w-50 mt-3'>
                    <input onChange={(e)=>setSearchKey(e.target.value)} 
                    style={{ height: '50px' }} 
                    type="text" 
                    className='form-control mb-5 rounded-pill  ' 
                    placeholder='Search By Location' />
                    <i className="fa-solid fa-magnifying-glass mt-3" style={{ marginLeft: '-30px', height: '50px' }}></i>
                </div>
                <Row>
                    {
                        allblogs.length > 0 ? allblogs.map(blog => (
                            <Blogs blog={blog} />
                        )) : <div className='container'>
                            <img src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" alt="" />
                        </div>
                    }

                </Row>

            </div>
        </>
    )
}

export default AllBlogs