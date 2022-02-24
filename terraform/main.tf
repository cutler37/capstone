variable "key_name" {
    default = "terraform9"
}

resource "tls_private_key" "terr_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = var.key_name
  public_key = tls_private_key.terr_key.public_key_openssh
}

resource "local_file" "private_key" {
  content  = "${tls_private_key.terr_key.private_key_pem}"
  filename = "./id_rsa"
}

resource "local_file" "public_key" {
  content  = "${tls_private_key.terr_key.public_key_openssh}"
  filename = "./id_rsa.pub"
}

variable "PUBLIC_KEY_PATH" {
  default="/id_rsa.pub"
}

variable "PRIVATE_KEY_PATH" {
  default ="/id_rsa"
}

variable "EC2_USER" {
  default ="rowan"
}



locals {
  ################ Import variables ###############
  local_data = jsondecode(file("/variables.json"))

  ################ VULN AMI #######################
  VULN_BOX = "${local.local_data.vuln == "Metasploitable 2" ? "ami-03ea1121e147b22b9" : ""}"
  VULN_BOX_1 = "${local.local_data.vuln == "OWASP Juice Box" ? "ami-0cea98c1668042d67" : ""}"
  VULN_BOX_2 = "${local.local_data.vuln == "DVWA-Application-Demo" ? "ami-0631939d90aa6e6d1" : ""}"
  VULN_BOX_3 = "${local.local_data.vuln == "Metasploitable 3" ? "ami-0b49e298407cf1e17" : ""}"
  VULN_BOX_AMI = "${coalesce(local.VULN_BOX,local.VULN_BOX_1, local.VULN_BOX_2,local.VULN_BOX_3)}"

  ################ KALI AMI ######################
  HACKER_BOX = "${local.local_data.off == "Kali Linux" ? "ami-06fd113e1286dd166" : ""}"
  HACKER_BOX_1 = "${local.local_data.off == "Parrot Security OS" ? "ami-03b4813c9831470f4" : ""}"
  HACKER_BOX_2 = "${local.local_data.off == "Pentoo" ? "ami-0a25944a8fcadcdc3" : ""}"
  HACKER_BOX_AMI = "${coalesce(local.HACKER_BOX,local.HACKER_BOX_1, local.HACKER_BOX_2)}"
}

resource "random_id" "server" {
  byte_length = 8
}

  ######### VPC && SUBNET ######################
  resource "aws_vpc" "vpc1" {
    cidr_block = "10.0.0.0/16"
    tags = {
      Name = "ClickInfrastructure"
    }
  }

  resource "aws_subnet" "subnet1" {
      vpc_id = "${aws_vpc.vpc1.id}"
      cidr_block = "10.0.1.0/24"
      map_public_ip_on_launch = "true" //it makes this a public subnet
      availability_zone = "us-east-1a"
      tags ={
          Name = "ClickInfrastructure"
      }
  }

  ######################### PROVIDER #################
  provider "aws" {
    region = "us-east-1"
  }
  
  ######################## INTERNET ############################## 
  resource "aws_internet_gateway" "IG" {
    vpc_id = "${aws_vpc.vpc1.id}"
    tags = {
      Name = "ClickInfrastructure"
    }
  }

  resource "aws_route_table" "RouteTable" {
      vpc_id = "${aws_vpc.vpc1.id}"
      
      route {
          //associated subnet can reach everywhere
          cidr_block = "0.0.0.0/0" 
          //CRT uses this IGW to reach internet
          gateway_id = "${aws_internet_gateway.IG.id}" 
      }
      
      tags = {
        Name = "ClickInfrastructure"
      }
  }

  resource "aws_route_table_association" "RouteTableAssociation"{
      subnet_id = "${aws_subnet.subnet1.id}"
      route_table_id = "${aws_route_table.RouteTable.id}"
  }

  resource "aws_security_group" "kali" {
      vpc_id = "${aws_vpc.vpc1.id}"
      
      egress {
          from_port = 0
          to_port = 0
          protocol = -1
          cidr_blocks = ["0.0.0.0/0"]
      }
      ingress {
          from_port = 22
          to_port = 22
          protocol = "tcp"
          // This means, all ip address are allowed to ssh ! 
          // Do not do it in the production. 
          // Put your office or home address in it!
          cidr_blocks = ["0.0.0.0/0"]
      }
      ingress {
          from_port = 443
          to_port = 443
          protocol = "tcp"
          // This means, all ip address are allowed to ssh ! 
          // Do not do it in the production. 
          // Put your office or home address in it!
          cidr_blocks = ["0.0.0.0/0"]
      }
      //If you do not add this rule, you can not reach the NGIX  
      ingress {
          from_port = 5900
          to_port = 5900
          protocol = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
      }

      ingress {
          from_port = 5800
          to_port = 5800
          protocol = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
      }
      
      tags = {
        Name = "ClickInfrastructure"
      }
  }

  resource "aws_security_group" "allow_all" {
    vpc_id = "${aws_vpc.vpc1.id}"
      // Allows ingress traffic to all ports from subnet A.
      ingress {
          protocol = -1
          from_port = 0
          to_port = 0
          cidr_blocks = ["0.0.0.0/0"]
      }
      
      egress {
          from_port = 0
          to_port = 0
          protocol = -1
          cidr_blocks = ["0.0.0.0/0"]
      }
      tags = {
        Name = "ClickInfrastructure"
      }
  }

######################## INSTANCES ############################
  resource "aws_instance" "HackerCLi" {
    ami = local.HACKER_BOX_AMI
    instance_type = local.local_data.size
    # VPC
    subnet_id = "${aws_subnet.subnet1.id}"
    # Security Group
    vpc_security_group_ids = ["${aws_security_group.kali.id}"]
    # the Public SSH key
    key_name = "${aws_key_pair.generated_key.key_name}"

    ##default volumne type is gp2 & will delete on termination.
    root_block_device {
      tags = {
        Name = "ClickInfrastructure-${random_id.server.id}"
      }
      volume_size = local.local_data.storage
    }

    tags = {
      Name = "ClickInfrastructure-${random_id.server.id}"
    }

    provisioner "local-exec" {
        command =  "echo To connect to the machine use the SSH command:  ssh -i \"id_rsa\" kali@(static public IP address)  If permissions fail, try changing the permissions for the id_RSA file. More instructions found on the website. Your instance ID is: ${aws_instance.HackerCLi.id}  >> ipAddresses.txt"
    }
    
    user_data = <<-EOF
      #!/bin/bash
      sudo apt update
      wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
      sudo apt install ./google-chrome-stable_current_amd64.deb -y
    EOF
  }
  
  # ssh -L 5901:127.0.0.1:5901 -C -N -l kali 34.237.222.181 -i id_rsa
  # aws ec2 stop-instances --instance-ids 

  resource "aws_instance" "vulnerable" {
      ami = local.VULN_BOX_AMI
      instance_type = local.local_data.size
      associate_public_ip_address = false
      # VPC
      subnet_id = "${aws_subnet.subnet1.id}"
      # Security Group
      vpc_security_group_ids = ["${aws_security_group.allow_all.id}"]

      
      tags = {
        Name = "ClickInfrastructure-${random_id.server.id}"
      }

      provisioner "local-exec" {
        command =  "echo Metasploitable 2 private IP address: ${aws_instance.vulnerable.private_ip} Your instance ID is: ${aws_instance.vulnerable.id}  >> ipAddresses.txt"
      }
  }

############## EVERYTHING BELOW IS SOMETHING TO DO WITH LAMBDAS FOR STOPPING AND STARTING ################
resource "aws_iam_policy" "stop_start_ec2_policy" {
  name = "StopStartEC2Policy"
  path = "/"
  description = "IAM policy for stop and start EC2 from a lambda"
    policy = jsonencode({
        
        "Version": "2012-10-17",
        "Statement": [
            {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
            },
            {
            "Effect": "Allow",
            "Action": [
                "ec2:Start*",
                "ec2:Stop*",
                "ec2:DescribeInstances*"
            ],
            "Resource": "*"
            }
          ]
        })
}

resource "aws_iam_role" "stop_start_ec2_role" {
  name = "StopStartEC2Role"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
        "Action": "sts:AssumeRole",
        "Principal": {
            "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
        }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_role_policy" {
  role = "${aws_iam_role.stop_start_ec2_role.name}"
  policy_arn = "${aws_iam_policy.stop_start_ec2_policy.arn}"
}

resource "aws_lambda_function" "stop_ec2_lambda" {
  filename      = "ec2_lambda_handler.zip"
  function_name = "stopEC2Lambda"
  role          = "${aws_iam_role.stop_start_ec2_role.arn}"
  handler       = "ec2_lambda_handler.stop"
  source_code_hash = "${filebase64sha256("ec2_lambda_handler.zip")}"
  runtime = "python3.7"
  memory_size = "250"
  timeout = "60"
   environment {
    variables = {
      tag = "ClickInfrastructure-${random_id.server.id}"
    }
  }
}

resource "aws_lambda_function" "start_ec2_lambda" {
  filename      = "ec2_lambda_handler.zip"
  function_name = "startEC2Lambda"
  role          = "${aws_iam_role.stop_start_ec2_role.arn}"
  handler       = "ec2_lambda_handler.start"
  source_code_hash = "${filebase64sha256("ec2_lambda_handler.zip")}"
  runtime = "python3.7"
  memory_size = "250"
  timeout = "60"
  environment {
    variables = {
      tag = "ClickInfrastructure-${random_id.server.id}"
    }
  }
}

resource "aws_eip" "elasticIP" {
  instance = aws_instance.HackerCLi.id
  vpc      = true
  provisioner "local-exec" {
    command =  "echo kali Static IP address is: ${aws_eip.elasticIP.public_ip} >> ipAddresses.txt"
  }
}