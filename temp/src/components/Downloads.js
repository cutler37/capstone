import React from 'react'
import {Row,Col, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.scss'
import './headerContainer.scss'


function App() {


  return (
       <Container>
           <center>
                <h1> Download Templates</h1>
           </center>
           <p>
               This page contains downloads of different ways to launch the vulnerable infrastructure in the cloud.
                Links to tutorials and download templates are found under each header below. 
                The templates provided below need to be edited for each individual use.
                Customized templates are created through each tutorial and will be available for download.
           </p>
           <Row>
               <Col md='4'>
                   <center>
                        <h3>
                            Terraform
                        </h3>
                    </center>
                    <p>

                    </p>
                    <center>
                        <Link to="/terraform">
                            <Button>Tutorial</Button>
                        </Link>
                        &emsp;
                        <Button>Download </Button>
                    </center>
               </Col>
               <Col md='4'>
                   <center>
                        <h3>
                            Cloud Formation
                        </h3>
                    </center>
                    <p>

                    </p>
                    <center>
                        <Link to="/cloudformation">
                            <Button>Tutorial</Button>
                        </Link>
                        &emsp;
                        <Button>Download </Button>
                    </center>
               </Col>
               <Col md='4'>
                   <center>
                        <h3>
                            Python
                        </h3>
                    </center>
                    <p>

                    </p>
                    <center>
                        <Link to="/python">
                            <Button>Tutorial</Button>
                        </Link>
                        &emsp;
                        <Button>Download </Button>
                    </center>
               </Col>
           </Row>
       </Container>
    );
  }
  
  export default App;