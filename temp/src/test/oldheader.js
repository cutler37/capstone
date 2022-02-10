import React from 'react'
import {Navbar,Nav,Form,FormControl,Button,NavDropdown} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import '../App.scss'
import './headerContainer.scss'
import { Link } from "react-router-dom";
import logo from '../images/another attempt.png'

function App() {


  return (
        <Navbar  expand="lg" className='headerBackground'>
        <Navbar.Brand href="/home" >
          <div className='BrandText'>
            Click Infrastructure
          </div>
          {/* <img src={logo} className="imagess" width='20px' height='20px' alt="title"/> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="right">
          <Link to={ '/cart'}><i className="fas fa-shopping-cart"> </i></Link>
            <Nav.Link href="/home">
              <div className="BrandText">
                About
              </div>  
            </Nav.Link>
            <Nav.Link href="/about"> 
              <div className="BrandText">
                About
              </div>  
            </Nav.Link>
            <font color="lightblue">
            <NavDropdown  id="basic-nav-dropdown" >
              More
              <NavDropdown.Item href="/about">
                <div className="BrandText">
                  About
                </div>  
              </NavDropdown.Item>
              <NavDropdown.Item href="/help">
              <div className="BrandText">
                  About
                </div>  
              </NavDropdown.Item>
              <NavDropdown.Item href="/home">
              <div className="BrandText">
                  About
                </div>   
              </NavDropdown.Item>
            </NavDropdown>
            </font>
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