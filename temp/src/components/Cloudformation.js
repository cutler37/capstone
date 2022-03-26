import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SelectionForm2 from "../components/cf_selectionform";
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
import cf_initial_menu from "../images/cf_initial_menu.png";
import cf_key_created from "../images/cf_key_created.png";
import cf_creating_wait from "../images/cf_creating_wait.png";
import cf_creating_console from "../images/cf_creating_console.png";
import cf_output from "../images/cf_output.png";
import cf_ssh from "../images/cf_ssh.png";
import cf_owasp_juice_shop from "../images/cf_owasp_juice_shop.png";
import cf_deleting from "../images/cf_deleting.png";
import cf_customizing from "../images/cf_customizing.png";
import cf_vnc_conf from "../images/cf_vnc_conf.png";
import cf_kali_gui from "../images/cf_kali_gui.png";
import cf_vnc_kali from "../images/cf_vnc_kali.png";

function App() {
  return (
    <Container>
      <Row>
        <Col md="6">
          <center>
            <br></br>
            <img alt="cf_logo" width="50%" height="100%" src={cf_logo}></img>
          </center>
        </Col>
        <Col md="6">
          <center>
            <h1>
              <br></br> <br></br>
              <span class="white1">Python Tutorial</span>
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
        <p>
          To download the aws cli for windows click{" "}
          <a href="https://awscli.amazonaws.com/AWSCLIV2.msi">here</a> or for
          mac go <a href="https://awscli.amazonaws.com/AWSCLIV2.pkg">here </a>.
          Alternatively you can find AWS CLI directly at the aws documentation
          website, clicking{" "}
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
            <img alt="findIAM" width="100%" height="100%" src={findIAM}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="findUsers"
              width="100%"
              height="100%"
              src={findUsers}
            ></img>
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
            <img alt="addUsers" width="100%" height="100%" src={addUsers}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="createUser"
              width="100%"
              height="100%"
              src={createUser}
            ></img>
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
            <img
              alt="adminAccess"
              width="100%"
              height="100%"
              src={adminAccess}
            ></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="getAccessKeys"
              width="100%"
              height="100%"
              src={getAccessKeys}
            ></img>
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
            make sure to use us-east-1, and skip the final remaining question.
          </p>
        </Col>
        <Col md="6">
          <br></br> <br></br>
          <img
            alt="aws_configure"
            width="100%"
            height="30%"
            src={aws_configure}
          ></img>
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
          The SDK is composed of two key Python packages: Botocore (the library
          providing the low-level functionality shared between the Python SDK
          and the AWS CLI) and Boto3 (the package implementing the Python SDK
          itself). Before installing Boto3, install Python 3.6 or later (support
          for Python 3.5 and earlier is deprecated). Check if you have python3
          installed using the command "python3 --version". If installed, skip to
          the next paragraph. For information about how to get the latest
          version of Python, see the official Python documentation clicking{" "}
          <a href="https://www.python.org/downloads/">here </a>.
        </p>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
          <p>
            To use Boto3, you first need to install it and its dependencies.
            Install the latest Boto3 release via pip, by typing the following
            command at a command prompt/terminal "pip install boto3", or "pip3
            install boto3", dpending on the pip version you have installed in
            your system.
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={pip_version}
            ></img>
          </p>
        </Col>
      </Row>
      <br></br> <br></br>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="pip_version_boto3"
              width="100%"
              height="100%"
              src={pip_version_boto3}
            ></img>
          </p>
        </Col>
        <Col md="6">
          <br></br> <br></br>
          <br></br>
          <p>
            Confirm that Boto3 has been properly installed by typing the command
            "pip show boto3" or "pip3 show boto3".
          </p>
        </Col>
      </Row>
      <Row>
        <center>
          <p>
            Now that we are done with all requirements, its time to easily
            deploy the pentest environment!
          </p>
        </center>
      </Row>
      {/* ############## STEP THREE - Deploying with Defaults  ####################### */}
      <Row>
        <center>
          <br></br>
          <h1>
            <span class="white1">3 - Deploying your environment!</span>
          </h1>
        </center>
        <p>
          Now that the setup of AWS CLI and SDK Python is complete, it's time to
          deploy the pentest infrastructure in AWS. Please, download the
          cfVulnInfrastrucure.zip file below.
        </p>
      </Row>
      <Row>
        <center>
          <Col md="2">
            <Link
              to="/downloads/cfVulnInfrastrucure.zip"
              target="_blank"
              download
            >
              cfVulnInfrastrucure.zip
            </Link>
            <br></br>
            <br></br>
          </Col>
        </center>
        <p>
          After unzipping the file, all you need to do is running the script(in
          the folder, type "python3 oneclick.py"), and the default virtual
          machines will be deployed (Kali, Metasploitable2, and Owasp Juice).
        </p>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <br></br>
            The first time you run the script, you must generate a new key-pair
            that will be required to connect into your instances. So, just
            select the first option to create it and upload it to your AWS
            account.
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="initial_menu"
              width="100%"
              height="100%"
              src={cf_initial_menu}
            ></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="pip_version_boto3"
              width="100%"
              height="100%"
              src={cf_key_created}
            ></img>
          </p>
        </Col>
        <Col md="6">
          <p>
            Note that the key will be saved in your current folder. Linux and
            MacOS users, close the script and type in your terminal 'chmod
            0400 ./python_keypair.pem'. If you already created the key in the
            past, and lost access to it, please go to your AWS account and
            delete the former key ("python_keypair"), so a new one cloud be
            created.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <br></br>
            With the key-pair created, you can go ahead and select option 3 to
            deploy the pentest environment. It will about 3-5 minutes to deploy
            all resources. Feel free to open your AWS account and confirm that the
            "pentest-stack" is correctly being deployed directly from the AWS
            Console" .
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="pip_version_boto3"
              width="100%"
              height="100%"
              src={cf_creating_console}
            ></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="initial_menu"
              width="100%"
              height="100%"
              src={cf_output}
            ></img>
          </p>
        </Col>
        <Col md="6">
          <p>
            After about 3-5 minutes, all should be ready and all details about the
            stack will be printed out for you!
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            You did it! The output will give details on how to use each VM. If desired, you could follow the
            instructions on Step 6 to have a full GUI on your Kali VM. Also, from the output you could easily find the address to connect
            to the OWASP Juice VM, which has a full tutorial for learning how to
            break WebApps and learning hacking techniques. Have fun!
          </p>
        </Col>
      </Row>
  
      {/* ############## STEP FOUR - Deleting/Stoping/Restarting Instances  ####################### */}
      <Row>
        <center>
          <br></br>
          <h1>
            <span class="white1">
              4 - Deleting, Stopping or Restarting Instances
            </span>
          </h1>
        </center>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
          <p>
            To delete the stack, its as easy as it was to deploy. Just run the
            script and select option #4 (per screenshot, took me only 2min and
            8sec to delete the whole thing!). Similarly, options #5 and #6 will
            allow you to respectively stop and restart all 3 instances deployed.
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={cf_deleting}
            ></img>
          </p>
        </Col>
      </Row>
      {/* ############## STEP FIVE - Customizing your environment  ####################### */}
      <Row>
        <center>
          <br></br>
          <h1>
            <span class="white1">5 - Customizing your Environment!</span>
          </h1>
        </center>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={cf_customizing}
            ></img>
          </p>
        </Col>
        <Col md="6">
          <p>
            The option #2 in the script will help you to customize your own
            environment. This is only recommended for advanced users. Just
            follow the instructions given, answering according to your
            preferences, and pay close attention on how to use the script with
            the customized parameters file. Check the picture for more details.
          </p>
        </Col>
      </Row>
      {/* ############## STEP SIX - Using Kali with GUI!  ####################### */}
      <Row>
        <center>
          <br></br>
          <h1>
            <span class="white1">6 - Using Kali with full GUI!</span>
          </h1>
        </center>
      </Row>
      <br></br>
      <Row>
        <Col md="6">
          <p>
            If you would prefer to use Kali with GUI, we need to do a couple
            extra steps that will take at least 10 minutes. Start by connecting
            via SSH into your Kali VM. Then run the following commands:
          </p>
          <pre>{`
sudo apt update -y
sudo apt install -y kali-linux-default kali-desktop-core kali-desktop-xfce
tightvncserver
          `}</pre>
          <p>
            Configure the VNC Password. When done, close the SSH
            connection and reconnect with the following command: 'ssh -L
            5901:localhost:5901 -i python_keypair.pem kali@your_ec2_address'.
            Now we are ready to use any VNC tool via SSH (tunnel)
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={cf_kali_gui}
            ></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={cf_vnc_conf}
            ></img>
          </p>
        </Col>
        <Col md="6">
          <p>
            Now configure the VNC Tool of your preference (I'm using VNC
            Connect) with the address of localhost:5901
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <p>
            Done! After entering the password configured, you are in with full GUI!
          </p>
        </Col>
        <Col md="6">
          <p>
            <img
              alt="pip_version"
              width="100%"
              height="100%"
              src={cf_vnc_kali}
            ></img>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

// #!/bin/bash
// #Update Kali
//

// # If GUI is wanted, do the following:
//
// #Configure your vnc password:
// tightvncserver
// # choose password, followed by "n"
// # Connect to your VNC server using SSH as follows:
// #
// #   Address to connect when using VNC Viewer:
// #       localhost:5901
