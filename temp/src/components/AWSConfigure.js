import React from 'react';
import { Row, Col,Container } from 'react-bootstrap';

// Import Photos

import findIAM from '../images/gotoIAM.png'
import addUsers from '../images/add user.png'
import findUsers from '../images/gotoUsers.png'
import createUser from '../images/createAccessKey.png'
import adminAccess from '../images/assignAdminAccess.png'
import getAccessKeys from '../images/getAccesskeys.png'
import awsConfigure from '../images/awsconfigure.png'

function App() {

  return (
      <Container>    <Row>
        <Col md='6'>
          <p>
            3) The third step is to configure the aws terminal with your aws user. 
          </p>
          <p>  
            To do this we will want to create a new user in the IAM section of aws with programatic access. 
          </p>
          <p>
            To start off with find the IAM by searching for it in AWS.
          </p>
        </Col>
        <Col md='6'>
          <p>
            <img alt ="findIAM" width='100%' height = '100%' src={findIAM}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <p>
            <img alt ="findUsers" width='100%' height = '100%' src={findUsers}></img>
          </p>
        </Col>
        <Col md='6'>
        <br></br><br></br><br></br>
          <p>
            Go to Users on the IAM dashboard
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <br></br><br></br><br></br>
          <p>
            Click add users on this page
          </p>
        </Col>
        <Col md='6'>
          <p>
            <img alt ="addUsers" width='100%' height = '100%' src={addUsers}></img>
          </p>
        </Col>
      </Row>  
      <Row>
        <Col md='6'>
          <p>
            <img alt ="createUser" width='100%' height = '100%' src={createUser}></img>
          </p>
        </Col>
        <Col md='6'>
        <br></br><br></br><br></br>
          <p>
            Create a unique Username for you're user and make sure to select programatic access when selecting AWS access type, then click the Next: Permissions button at the bottom of the page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <br></br><br></br><br></br>
          <p>
            At the top of this page click Attach existing policies directly.
          </p>
          <p>
            A large box will policies will then appear below. Select the box for Administrator Access like the image shows. 
          </p>
          <p>
            Click 'Next: Tags' to move on and add tags if you wish. However, this is optional. Click 'Next: Review' and then 'Create User' after making sure everything on this review is correct.
          </p>
        </Col>
        <Col md='6'>
          <p>
            <img alt ="adminAccess" width='100%' height = '100%' src={adminAccess}></img>
          </p>
        </Col>
      </Row> 
      <Row>
        <Col md='6'>
          <p>
            <img alt ="getAccessKeys" width='100%' height = '100%' src={getAccessKeys}></img>
          </p>
        </Col>
        <Col md='6'>
        <br></br><br></br><br></br>
          <p>
            After you create the user you will be driven to a page similiar to this. Copy the Access key ID and secret access key to somewhere secure. 
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
        <br></br><br></br><br></br>
          <p>
            Finally, open up your terminal on your computer, and type "aws configure". It will ask you for to enter your AWS Access Key ID and your AWS Secret Access Key. Enter the keys you got for the user you created on AWS in these spots. When it asks you for a default region feel free to use us-east-1 or you can bypass these steps by just clicking enter through the next two questions.  
          </p>
        </Col>
        <Col md='6'>
          <img alt ="awsConfigure" width='100%' height = '50%' src={awsConfigure}></img>
        </Col>
    </Row>
    </Container>

  );
}

export default App;