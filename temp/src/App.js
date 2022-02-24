import React from 'react';
import './App.scss';
import * as bs from 'react-bootstrap'
import  {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Routes ,Route, Switch} from 'react-router-dom'
import HeaderContainer from './components/Header'
import Body from './components/body'
import Footer from './components/Footer'
import Downloads from './components/options'
import Terraform from './components/Terraform'
import Cloudformation from './components/Cloudformation'
function App() {

  return (
    <Router>
      <Container fluid className = "p-0 min-vh-100 d-flex flex-column">
        {/* ####### HEADER ######## */}
        <bs.Row >
          <bs.Col md='12'>
            <HeaderContainer className='headerBackground'/>
          </bs.Col>
        </bs.Row>
        <bs.Row>
          <br></br>
        </bs.Row>
        {/* ####### BODY ######## */}
        <bs.Row noGutters className = "flex-grow-1 shadow bg-warning">

          <bs.Col md='12' className="bodyBackground">
            <Routes >
              <Route exact path='/' element={<Body/>}/>   
              <Route exact path='/options' element={<Downloads/>}/>   
              <Route exact path='/terraform' element={<Terraform/>}/>   
              <Route exact path='/cloudformation' element={<Cloudformation/>}/>     
            </Routes >
          </bs.Col>

        </bs.Row>

        {/* ####### FOOTER ######## */}
        <bs.Row noGutters>
          <bs.Col>
            <Footer/>
          </bs.Col>
          </bs.Row>
        </Container>
      </Router>
  );
}

export default App;
