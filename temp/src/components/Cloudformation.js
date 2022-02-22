import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SelectionForm2 from '../components/cf_selectionform'
// Import Photos
import cf_logo from "../images/cf_logo.png";
import findIAM from "../images/gotoIAM.png";
import addUsers from "../images/add user.png";
import findUsers from "../images/gotoUsers.png";
import createUser from "../images/createAccessKey.png";
import adminAccess from "../images/assignAdminAccess.png";
import getAccessKeys from "../images/getAccesskeys.png";
import pip_version from "../images/pip_version.png";
import pip_version_boto3 from "../images/pip_version_boto3.png";
import aws_configure from "../images/aws_configure.png";

function App() {
  return (
    <Container>
      <Row>
        <Col md="6">
          <center>
            <br></br>
          <img width="50%" height="100%" src={cf_logo}></img></center>
        </Col>
        <Col md="6">
          <center>
            <h1>
            <br></br>              <br></br>
              <span class="white1">Cloudformation Tutorial</span>
            </h1>
          </center>
          <p>
            Before you begin, make sure you have a valid aws account. We will
            not charge you for any services, but the services you set up via the
            script on the cloud may charge you for certain options you select.
            None of the money you pay will go to us, it will go to aws, where
            the services are being hosted. All scripts on this site are free to
            use.
          </p>
        </Col>
      </Row>
      {/* ############## STEP ONE - Downloading and Configuring AWS CLI ####################### */}
      <Row>
        <center>
          <h1>
            <br></br>
            <span class="white1">1 - Configuring AWS CLI</span>
          </h1>
        </center>
        <p>
          In order to launch this online infrastructure we need to have AWS CLI
          properly installed and configured. To confirm the installation, use
          the "aws --version" command at a command prompt/terminal. If you have
          already set it up then skip to step 2. 
          </p>
          <p>To download the aws cli for
          windows click{" "}
          <a href="https://awscli.amazonaws.com/AWSCLIV2.msi">here</a> or for
          mac go <a href="https://awscli.amazonaws.com/AWSCLIV2.pkg">here </a>.
          Alternatively you can find AWS CLI directly at the aws documentation website, clicking{" "}
          <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">
            here
          </a>
          .
        </p>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
          <p>
            After installed, let us configure the aws terminal with your aws
            user.
          </p>
          <p>
            To do this we will want to create a new user in the IAM section of
            aws with programatic access.
          </p>
          <p>To start off with find the IAM by searching for it in AWS.</p>
        </Col>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={findIAM}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={findUsers}></img>
          </p>
        </Col>
        <Col md="6">
          <br></br>
          <br></br>
          <br></br>
          <p>Go to Users on the IAM dashboard</p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <br></br>
          <br></br>
          <br></br>
          <p>Click add users on this page</p>
        </Col>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={addUsers}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={createUser}></img>
          </p>
        </Col>
        <Col md="6">
          <br></br>
          <br></br>
          <br></br>
          <p>
            Create a unique Username for you're user and make sure to select
            programatic access when selecting AWS access type, then click the
            Next: Permissions button at the bottom of the page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <br></br>
          <br></br>
          <br></br>
          <p>
            At the top of this page click Attach existing policies directly.
          </p>
          <p>
            A large box will policies will then appear below. Select the box for
            Administrator Access like the image shows.
          </p>
          <p>
            Click 'Next: Tags' to move on and add tags if you wish. However,
            this is optional. Click 'Next: Review' and then 'Create User' after
            making sure everything on this review is correct.
          </p>
        </Col>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={adminAccess}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={getAccessKeys}></img>
          </p>
        </Col>
        <Col md="6">
          <br></br>
          <br></br>
          <br></br>
          <p>
            After you create the user you will be driven to a page similiar to
            this. Copy the Access key ID and secret access key to somewhere
            secure.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <br></br>
          <br></br>
          <p>
            Finally, open up your terminal on your computer, and type "aws
            configure". It will ask you for to enter your AWS Access Key ID and
            your AWS Secret Access Key. Enter the keys you got for the user you
            created on AWS in these spots. When it asks you for a default region
            you could use us-east-1 or you can bypass these steps by just
            clicking enter through the next two questions.
          </p>
        </Col>
        <Col md="6">
          <br></br> <br></br>
          <img width="100%" height="30%" src={aws_configure}></img>
        </Col>
      </Row>
      {/* ############## STEP TWO - Installing and Configuring AWS SDK for Python ####################### */}
      <Row>
        <center>
          <h1>
            <span class="white1">2 - Configuring AWS SDK for Python</span>
          </h1>
        </center>
        <p>
        The SDK is composed of two key Python packages: Botocore (the library providing the low-level functionality shared between the Python SDK and the AWS CLI) and Boto3 (the package implementing the Python SDK itself). 
        
        Before installing Boto3, install Python 3.6 or later (support for Python 3.5 and earlier is deprecated). Check if you have python3 installed using the command "python3 --version". If installed, skip to the next paragraph. 
        For information about how to get the latest version of Python, see the official Python documentation clicking <a href="https://www.python.org/downloads/">here </a>.
        </p>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
        <p>
        To use Boto3, you first need to install it and its dependencies. Install the latest Boto3 release via pip, by typing the following command at a command prompt/terminal "pip install boto3", or "pip3 install boto3", dpending on the pip version you have installed in your system. 
        </p>
        </Col>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={pip_version}></img>
          </p>
        </Col>
      </Row>
      <br></br> <br></br>
      <Row>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={pip_version_boto3}></img>
          </p>
        </Col>
        <Col md="6">
        <br></br> <br></br><br></br>
        <p>
        Confirm that Boto3 has been properly installed by typing the command "pip show boto3" or "pip3 show boto3".
        </p>
        </Col>
      </Row>
      <Row>
        <center>
        <p>
        Now that we are done with all requirements, its time to easily deploy the pentest environment!
        </p></center>
      </Row>
            {/* ############## STEP THREE - Customizing your environment  ####################### */}
        <Row> 
        <center>
        <br></br>
          <h1>
            <span class="white1">3 - Customizing your environment</span>
          </h1>
        </center>
        <p>
          Now that the setup of AWS CLI and SDK Python is complete, you will need the two files in which to launch the aws environment from. The cf_vulnInfrastructure.zip file that contains the code to launch the VMs in the AWS environment and the variables.json that tells the script what machines and other settings you'd like to use in your virtual environment. We recommend using the default script and variables below. However, if you want to create a different environment than provided utilize the form below to create your own variables.json file. If you just want to use the tested and recommended settings, skip to step 4 after downloading the files provided below.
        </p>
      </Row>
      <Row>
      <center>
        <Col md='2'>
          <Link to="/downloads/variables.json" target="_blank" download>vulnInfrastructure.zip</Link>
        </Col>
        <Col md='2'>
          <Link to="/downloads/variables.json" target="_blank" download>variables.json</Link>
        </Col>
        </center>
      </Row>   
      <br></br><br></br>
      <Row>
        <Col>
          <p>
            Select the option below ONLY if you prefer to customize your environment instead of using our reocmmended defaults. In this case, instead of using the variables.json provided above we will create a custom one for you. Be alert on your selections though, because based on your selections the price AWS will change. We will try to provide pricing help but it is not always 100% accurate. You can always go check out the prices aws provides <a href="https://calculator.aws/#/">here</a>.
          </p>    
          <SelectionForm2></SelectionForm2>
          <br></br><br></br>
        </Col>
      </Row>
            {/* ############## STEP FOUR - Deploying your environment  ####################### */}
            <Row>
        <center>
          <h1>
            <span class="white1">4 - Deploying your environment!</span>
          </h1>
        </center>
        <p>
          Test!
        </p>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
        <p>
        Test again
        </p>
        </Col>
        <Col md="6">
          <p>
            <img width="100%" height="100%" src={pip_version}></img>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
