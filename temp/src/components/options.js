import React from 'react'
import {Row,Col, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.scss'
import './headerContainer.scss'


function App() {


  return (
       <Container>
           <center>
                <h1>Setup Options</h1>
           </center>
           <p>
                This page contains downloads of two different ways to launch the vulnerable infrastructure in the cloud.
                Links to the setups and templates are found under each header below. Customized templates are created through each tutorial and will be available for download. 
           </p>
           <br></br>
           <br></br>
           <br></br>
           <Row>
               <Col md='6'>
                   <center>
                        <h3>
                            Terraform
                        </h3>
                    </center>
                    <br></br>
                    <center>
                        <Link to="/terraform">
                            <Button>Tutorial</Button>
                        </Link>
                        &emsp;
                        <Link to="/downloads/variables.json" target="_blank" download>
                            <Button>
                                variables.json
                            </Button>
                        </Link>
                        &emsp;
                        <Link to="/downloads/vulnInfrastructure.zip" target="_blank" download>
                            <Button>
                                vulnInfrastructure.zip
                            </Button>
                        </Link>
                    </center>
                </Col>
                <Col md='6'>
                   <center>
                        <h3>
                            Cloud Formation
                        </h3>
                    </center>
                    <br></br>
                    <center>
                        <Link to="/cloudformation">
                            <Button>Tutorial</Button>
                        </Link>
                        &emsp;
                        <Link to="/downloads/variables.json" target="_blank" download>
                            <Button>
                                variables.json
                            </Button>
                        </Link>
                        &emsp;
                        <Link to="/downloads/vulnInfrastructure.zip" target="_blank" download>
                            <Button>
                                python.zip
                            </Button>
                        </Link>
                    </center>
               </Col>
           </Row>
       </Container>
    );
  }
  
  export default App;