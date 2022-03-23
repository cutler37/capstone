import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

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
          <Nav  className='ms-auto' >
            <NavLink to="/options" className="right" >
              <div className="BrandText">
                Tutorial Options
              </div>  
            </NavLink>
            <NavLink to="/terraform"  className="right"> 
              <div className="BrandText">
                Terraform Tutorial
              </div>  
            </NavLink>
            <NavLink to="/cloudformation"  className="right"> 
              <div className="BrandText">
                Cloud Formation Tutorial
              </div>  
            </NavLink>
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