import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'

import '../App.scss'
import './headerContainer.scss'


function App() {


  return (
        <Navbar  expand="lg" className='headerBackground'>
        <Navbar.Brand href="/" >
          <div className='BrandText'>
            Vulnerable Cloud Infrastructure
          </div>
          {/* <img alt ="logo" src={logo} className="imagess" width='20px' height='20px' alt="title"/> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  style={{float:"right"}} >
            <Nav.Link href="/options" className="right" >
              <div className="BrandText">
                Options
              </div>  
            </Nav.Link>
            <Nav.Link href="/terraform"  className="right"> 
              <div className="BrandText">
                Terraform Tutorial
              </div>  
            </Nav.Link>
            <Nav.Link href="/cloudformation"  className="right"> 
              <div className="BrandText">
                Cloud Formation Tutorial
              </div>  
            </Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar> 
    );
  }
  
  export default App;