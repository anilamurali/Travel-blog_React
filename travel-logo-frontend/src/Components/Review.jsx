import React, { useEffect, useState } from 'react'
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { deleteReviewBlogsAPI } from '../services/allAPI';
import Alert from 'react-bootstrap/Alert';

function Review({manageReview,setDeleteReviewStatus,reviews}) {
  const id=reviews._id

  const deleteReview=async()=>{

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token}`
      }
      const result = await deleteReviewBlogsAPI(id, reqHeader)
      if (result.status == 200) {
        <Alert key={'danger'} variant={'danger'}>
        Review Deleted Successfully
      </Alert>
      setDeleteReviewStatus(true)
      

      }
      else {
          alert("Can't get  review")
      }
  }
  else {
      alert("Error getting Token")
  }
    
  }
    
  return (
    <>
    <div className="container">
            <div className='card mx-5 my-2 px-4 pt-2 bg-secondary'>
            <div className='d-flex justify-content-between'>
            <h6 className='text-slate-600'><i class="fa-solid fa-user  p-2 rounded-circle me-2" style={{backgroundColor:'grey'}}></i>{reviews?.username}</h6> 
            <div className='d-flex '>
            <h6 className='text-slate-600 mt-2'>{reviews?.time}</h6>  
            {
                manageReview&&
                <div>
                  <MDBPopover color='secondary' btnChildren={ <i class="fa-solid fa-ellipsis-vertical  "></i>} placement='bottom'>
        <MDBPopoverBody><Link onClick={deleteReview} className='text-danger'>Delete</Link></MDBPopoverBody>
      </MDBPopover>
                </div>
            // <i class="fa-solid fa-ellipsis-vertical mt-2 ms-4"></i>
            }
            </div>
            </div>
             <p className='mt-1 ps-4'>{reviews?.reviewText}</p>  
         </div>
    </div>
    </>
  )
}

export default Review