import React, { useEffect, useState } from 'react'
import { getAllBloggersAPI } from '../services/allAPI'
import Header from './Header'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_URL'

function AllProfile() {
    const [allProfile,setAllProfile]=useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const getAllBloggers=async()=>{
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getAllBloggersAPI(reqHeader)
            if (result.status == 200) {
                setAllProfile(result.data)

            }
            else {
                alert("Can't get  bloggers")
            }
        }
        else {
            alert("Error getting Token")
        }
    }
    console.log(allProfile);
    useEffect(()=>{
        getAllBloggers()
    },[])
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
    <Header isLoggedIn={isLoggedIn}/>
    <div className="container   d-flex justify-content-center">
        <div className="row">  
       
        {
            allProfile.length>0?allProfile.map(user=>(
                <div className="col col-12 sm-col-12 col-xl-12">
                <div className=' card  d-flex flex-row mx-5 my-2'>
                <img className='m-2 rounded' style={{width:'200px'}} src={ user?`${BASE_URL}/uploads/${user?.profile}`: "https://th.bing.com/th/id/OIP.SRLqusZ0zuen8gOPVJtVBgHaFg?rs=1&pid=ImgDetMain"} alt="" />
                <div className='m-2'>
                    <h3 className='text-slate-600  mt-2'>{user.username}</h3>
                    <h6><i class="fa-solid fa-location-dot text-warning"></i> {user?.place}</h6>
                    <p  className='me-5'>{user.overview}</p>
                        <div className='d-flex justify-content-between'>
                        <Link to={'/bloggers/profile/'+user._id} style={{textDecoration:'none'}} className='text-danger'>ViewProfile</Link>
    
                        <p className='me-3'>Joined on :{user?.joined}</p>
                        </div>
                </div>
    
            </div>
            </div>
            )): <p>No Blogger Found</p>
           }
     </div>
    </div>
    </>
  )
}

export default AllProfile