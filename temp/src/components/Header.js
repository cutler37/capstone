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
        <Navbar.Brand href="/" >
          <div className='BrandText'>
            Vulnerable Cloud Infrastructure
          </div>
          {/* <img src={logo} className="imagess" width='20px' height='20px' alt="title"/> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  style={{float:"right"}} >
            <Nav.Link href="/downloads" className="right" >
              <div className="BrandText">
                Downloads
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