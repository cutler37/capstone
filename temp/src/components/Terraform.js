import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SelectionForm from '../components/selectionform'
// Import Photos
import terraformlogo from '../images/terraformlogo.png'
import findIAM from '../images/gotoIAM.png'
import addUsers from '../images/add user.png'
import findUsers from '../images/gotoUsers.png'
import createUser from '../images/createAccessKey.png'
import adminAccess from '../images/assignAdminAccess.png'
import getAccessKeys from '../images/getAccesskeys.png'
import awsConfigure from '../images/awsconfigure.png'
import directory from '../images/directory.png'
import envVar from '../images/envVars.png'
import envVarPath from '../images/envVarsPath.png'
import envVarPathEdit from '../images/envVarsPathEdit.png'
import terraformInit from '../images/terraforminit.png'
function App() {

  return (
    <Container>
      <Row>
        <Col md='6'>
          <img width='100%' height = '100%' src={terraformlogo}></img>
        </Col>
        <Col md='6'>
          <center>
            <h1><span class="white1">Terraform Tutorial</span></h1>
          </center>
          <p>
            Before you begin, make sure you have a valid aws account. We will not charge you for any services, but the services you set up via the script on the cloud may charge you for certain options you select. None of the money you pay will go to us, it will go to aws, where the services are being hosted. All scripts on this site are free to use. 
          </p>
          <p>
            1) To begin this setup. You will need to download <a href="https://www.terraform.io/" target="_blank">Terraform</a>. Go to this website and download Terraform for your device. The Terraform Download page is found here: <a href="https://www.terraform.io/downloads">https://www.terraform.io/downloads</a>
          </p>
          
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <p>
            1a) You will probably need to add the terraform executable to your system "PATH" environment variables. You can do this on Windows by searching for environment variables on your Windows search window. Click edit on user variables while clicking on path. Then select new and paste the path to the folder containing the terraform executable. The following pictures help demonstrate the process.
          </p>
        </Col>
        <Col md='6'>
          <img width='90%' height = '90%' src={envVar}></img>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <img width='90%' height = '90%' src={envVarPath}></img>
        </Col>
        <Col md='6'>
          <img width='90%' height = '90%' src={envVarPathEdit}></img> 
        </Col>
      </Row>
      <Row>
        <p>
          2) The second step to launching this online infrastructure is to download and configure your aws CLI. If you have already set it up then skip step 2 and step 3. To download the aws cli for windows click <a href="https://awscli.amazonaws.com/AWSCLIV2.msi">here</a> or for mac go <a href="https://awscli.amazonaws.com/AWSCLIV2.pkg">here </a>. Alternatively you can find AWS CLI for your OS here at this <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">website</a>.
        </p>
      </Row>
      <br></br>
      {/* ############## STEP THREE ####################### */}
      <Row>
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
            <img width='100%' height = '100%' src={findIAM}></img>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <p>
            <img width='100%' height = '100%' src={findUsers}></img>
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
            <img width='100%' height = '100%' src={addUsers}></img>
          </p>
        </Col>
      </Row>  
      <Row>
        <Col md='6'>
          <p>
            <img width='100%' height = '100%' src={createUser}></img>
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
            <img width='100%' height = '100%' src={adminAccess}></img>
          </p>
        </Col>
      </Row> 
      <Row>
        <Col md='6'>
          <p>
            <img width='100%' height = '100%' src={getAccessKeys}></img>
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
          <img width='100%' height = '50%' src={awsConfigure}></img>
        </Col>
      </Row>  

{/* ################# STEP FOUR ################### */}
      <br></br>
      <Row>  
        <p>
          4) Now that the setup of AWS and TerraForm is complete, you will need the two files in which to launch the aws environment from. The vulnInfrastructure.zip file that contains the code to launch the VMs in the AWS environment and the variables.json that tells the script what machines and other settings you'd like to use in your virtual environment. You can download the default script and variables below. However, if you want to create a different environment than provided utilize the form in step 5 to create your own variables.json file. If you just want to use the tested and recommended settings, skip step 5 and download the scripts provided below. If you utilize other VMs remember that this tutorial may not be able to help you as it is made to specifically install and run Kali.
        </p>
      </Row>
      <Row>
        <Col md='6'>
          <Link to="/downloads/vulnInfrastructure.zip" target="_blank" download>vulnInfrastructure.zip</Link>
        </Col>
        <Col md='6'>
          <Link to="/downloads/variables.json" target="_blank" download>variables.json</Link>
        </Col>
      </Row>   
      <br></br><br></br>
      <Row>
        <Col>
          <p>
            5) Step 5 is only utilized to customize your environment. Instead of using the variables.json above this form will create a custom one for you. Be alert on your selections though, because based on your selections the price AWS will change. We will try to provide pricing help but it is not always 100% accurate. You can always go check out the prices aws provides <a href="https://calculator.aws/#/">here</a>. All prices we show are estimates and could be wrong.
          </p>    
          <SelectionForm></SelectionForm>
          <br></br><br></br>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <br></br>
          <p>
            6) Now that you have all your files make sure they are all in the same directory and unzip vulnInfrastructure.zip. You do not need to unzip ec2_lambda_handler.zip. Your folder should look like the image here:
          </p>    
        </Col>
        <Col md='6'>
          <img width='100%' src={directory}></img> 
        </Col>
      </Row>
      <Row>
        <Col >
          <br></br>
          <p>
            7) Now that the files are ready we are ready to execute the stript from the commandline using Terraform. To do this open the commandline on your device and navigate to the directory containing the script and variables. You can also just open the commandline by typing 'cmd' (for windows) in the file explorer path. Long story short as long as you navigate to the place where your files are you should be fine. 
          </p>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <br></br>
          <p>
            8) Next type the following command to start up terraform: 'terraform init' 
            <br></br>
            you should see results similiar to the screenshot to the right.
          </p>    
        </Col>
        <Col md='6'>
          <img width='100%' src={terraformInit}></img> 
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <br></br>
          <p>
            9) After terraform is initilaized you are ready to launch the virtual environment. To do this use the command 'terraform apply'. It will ask if you are sure you'd like to make the following changes. Just type 'yes' and hit enter. 
          </p>    
        </Col>
        <Col md='6'>
          <img width='100%' src={directory}></img> 
        </Col>
      </Row>
      <Row>
        <br></br>
        <p>
          10) After waiting a few minutes for the environment to deploy, make sure you have the following new files 'id_rsa', and ipAddresses. The id_rsa is the private key of the keypair that you will use to connect with your Kali instance. You will do this the first time using SSH. Make sure that your command line is in the same file as the id_rsa file. Then use the following command: "ssh -i 'id_rsa' kali@(replace with static IP address found in the ipAddresses file)"
        </p> 
        <p>
          The Kali instance on AWS is not completely configured. In fact tools on this image is quite sparse to allow for customization and reduced image size. In order to to update kali and download missing tools you will need to run a few commands. These commands can take several minutes to run:
          <ul>
            <li>I) sudo apt update</li>
            <li>II) sudo apt full-upgrade -y</li>
            <li>III) sudo apt install -y linux-headers-5.7.0-kali3-cloud-amd64</li>
            <li>IV) sudo reboot -f</li>
            <li>V)  sudo apt install -y nvidia-driver nvidia-cuda-toolkit</li>
            <li>VI) sudo reboot -f</li>
          </ul>
          <br></br>
          For additional help go to the kali documentation <a href='https://www.kali.org/docs/cloud/aws/'>here</a>.
        </p>   
        <p>
          You can now begin to perform penetration tests on your fellow metasploitable machines using the private ip addresses found in the ipAddresses file. There are lots of websites to help you do this. Here are just a few helpers:
        </p>
        <a href="https://www.udemy.com/course/learn-hacking-10-windows-using-metasploit-from-scratch/">https://www.udemy.com/course/learn-hacking-10-windows-using-metasploit-from-scratch/</a>
        <a href="https://www.offensive-security.com/metasploit-unleashed/">https://www.offensive-security.com/metasploit-unleashed/</a>
        <a href="https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/">https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/</a>
        <br></br>
        <br></br>
      </Row>
      <Row>
        <p>
          11) CLOSING: Here is a list of all necessary and unnecessary commands to help you manage your terraform instances:
          <ul>
            <li>a) terraform init: initilizes states (first command that needs to be run).</li>
            <li>b) terraform apply: build terraform infrastructure.</li>
            <li>c) terraform apply -destroy: destroys all infrastructure created by the terraform script.</li>
          </ul>
          <br></br>
          In addition to deploying your Kali ec2 instances. This script deploys two simple lambda functions that help you to manage your ec2 instances. You can call function 'a' below to start your ec2 instances and look at its status in the status.json file at the end. Likewise for function 'b' you can use that command to temporarily stop your terraform ec2 instances (not destroy).
          <ul>
            <li>a) aws lambda invoke --function-name 
startEC2Lambda status.json</li>
            <li>b) aws lambda invoke --function-name 
stopEC2Lambda status.json</li>
          </ul>
          <br></br>
            If you try to use these commands repeadedly in succession you may receive an error. Just wait a minute and try again or look at the status.json to see what errors you receive. 
        </p>
      </Row>
      <Row>
        <p>
          12) OPTIONAL/EXTRA: Many people like to have the GUI interface for the Kali linux instance. The next 2 steps will provide multiple ways to install and connect to that interface (remember the their are inherent risks with using remote desktop services of someone else access your machine if you are not careful). 
          
          <br></br>
          These websites might also be useful:
          <ul>
            <li>
              <a href="https://victorleungtw.medium.com/install-ubuntu-desktop-on-aws-instance-with-chrome-remote-desktop-3beb30755379">https://victorleungtw.medium.com/install-ubuntu-desktop-on-aws-instance-with-chrome-remote-desktop-3beb30755379</a>
            </li>
            <li>
              <a href="https://aws.amazon.com/premiumsupport/knowledge-center/ec2-linux-2-install-gui/">https://aws.amazon.com/premiumsupport/knowledge-center/ec2-linux-2-install-gui/</a>
            </li>
          </ul>
        </p>
      </Row>
      <Row>
        <p>
          12a) Setting up via Chrome desktop connect (recommended):
          <br></br>
          We recommend following the tutorial on the link below. You can skip the first step as your aws instance has already been set up. In addition, step 8 in the tutorial is not necessary for your desktop connection to work.             
        </p>
        <a href="https://victorleungtw.medium.com/install-ubuntu-desktop-on-aws-instance-with-chrome-remote-desktop-3beb30755379">https://victorleungtw.medium.com/install-ubuntu-desktop-on-aws-instance-with-chrome-remote-desktop-3beb30755379</a>
        <br></br>
      </Row>
      <Row>
        <p>
          12b) Setting up GUI via TigerVNC:
          <br></br>
          This is amazon's solution to creating a gui for amazon instances.       
        </p>
        <a href="https://aws.amazon.com/premiumsupport/knowledge-center/ec2-linux-2-install-gui/">https://aws.amazon.com/premiumsupport/knowledge-center/ec2-linux-2-install-gui/</a>
      </Row>
    </Container>
  );
}

export default App;
// sudo apt install xfce4 xfce4-goodies -y