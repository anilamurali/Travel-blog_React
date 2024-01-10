import React from 'react'
import { Link } from 'react-router-dom'

function PageNoteFound() {
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center flex-column ">
      <img src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif" alt="" />
      <Link to={'/'}>
      <button className='btn btn-warning mb-5'> Back to Home</button>
      </Link>
    </div>

    </>
  )
}

export default PageNoteFound