import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link} from "react-router-dom"

function App() {

  return (
    <Container>
      <Row>
      <Col md='6'>
                  {/* <img width='100%' height = '100%' src={}></img> */}
              </Col>
              <Col md='6'>
    <section class="banner_main">
        <div class="container">
            <div class="row d_flex">
                <div class="">
                <div class="text-bg">
                    <h1><span class="white1">Welcome To Vulnerable Infrastructure in the Cloud</span></h1>
                   
                        <Link to="/downloads" >
                            <Button> Start Now</Button>
                        </Link>
                   
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
