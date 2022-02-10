import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import CloudImg from '../images/compcloud.jpg'
function App() {


  return (
      <Container>
          <Row>
              <Col md='6'>
                  <img width='100%' height = '100%' src={CloudImg}></img>
              </Col>
              <Col md='6'>
    <section class="banner_main">
        <div class="container">
            <div class="row d_flex">
                <div class="">
                <div class="text-bg">
                    <h1><span class="white1">Welcome To Vulnerable Infrastructure in the Cloud</span></h1>
                    <p>
                        We will guide you to quickly and easily enjoy a complete pentesting environment on the cloud. 
                        <br></br>
                        <br></br>
                        Our script will help setup a vulnerable infrastructure in the cloud for you to use and practice pen testing skills. 
                        <br></br>
                        <br></br>
                        No extra hardware is necessary and no previous knowledge is required. Start learning hacking right now!</p>
                        <center>
                        <Link to="/downloads" >
                            <Button> Start Now</Button>
                        </Link>
                   </center>
                   <br></br>
                </div>
                </div>  
            </div>
        </div>
    </section>
        </Col>
    </Row>
    </Container>
    );
  }
  
  export default App;