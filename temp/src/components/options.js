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
                This page contains two different ways to launch the vulnerable infrastructure in the cloud.
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
           <Row>
               <br></br><br></br>
               <br></br><br></br>
               <p>
                   Both scripts will utilize the users Amazon Web Services (AWS) account to launch these hacking environments, so while we won't charge money to utilzie our scripts; Amazon will charge money based on services rendered. The people utilizing these scripts need to keep track of their billing information on the AWS console so that charges will not surprise them. We recommend utilizing the stop functions in both scripts to pause the useage of AWS services when not using the servers provided. 
               </p>
           </Row>
       </Container>
    );
  }
  
  export default App;