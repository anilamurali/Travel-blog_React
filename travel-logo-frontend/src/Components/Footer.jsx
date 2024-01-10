import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase text-warning fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
               Travel Blog
              </h6>
              <img style={{ width: '200px', height: '70px' }} src="https://www.codester.com/static/uploads/items/000/029/29949/preview/005.jpg" alt="" />

            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase text-warning fw-bold mb-4'>Places</h6>
              <p>
                <a href='#!' className='text-reset'>
                  America
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Paris
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Europe
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  UAE
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase text-warning fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                Travel Insurance
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Travel Guide
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                World Facts
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Advertising
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase text-warning fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='/'>
          travelblog.com
        </a>
      </div>
    </MDBFooter>
    </>
  )
}

export default Footer