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
  
  ################ KALI AMI ######################
  KALI_EAST_1 = "${local.local_data.awsRegion == "us-east-1" ? "ami-06fd113e1286dd166" : ""}"
  KALI_EAST_2 = "${local.local_data.awsRegion == "us-east-2" ? "ami-0d12596b1b9089744" : ""}"
  KALI_WEST_1 = "${local.local_data.awsRegion == "us-west-1" ? "ami-0e58e6da772372235" : ""}"
  KALI_AMI = "${coalesce(local.KALI_EAST_1,local.KALI_EAST_2, local.KALI_WEST_1)}"

  ################ META2 AMI ######################
  META_2_EAST_1 = "${local.local_data.awsRegion == "us-east-1" ? "ami-03ea1121e147b22b9" : ""}"
  META_2_EAST_2 = "${local.local_data.awsRegion == "us-east-2" ? "" : ""}"
  META_2_WEST_1 = "${local.local_data.awsRegion == "us-west-1" ? "" : ""}"
  META_2_AMI = "${coalesce(local.META_2_EAST_1,local.META_2_EAST_2, local.META_2_WEST_1)}"

  ################ META3 AMI ######################
  META_3_EAST_1 = "${local.local_data.awsRegion == "us-east-1" ? "ami-03ea1121e147b22b9" : ""}"
  META_3_EAST_2 = "${local.local_data.awsRegion == "us-east-2" ? "ami-006a96c59953b3460" : ""}"
  META_3_WEST_1 = "${local.local_data.awsRegion == "us-west-1" ? "" : ""}"
  META_3_AMI = "${coalesce(local.META_3_EAST_1,local.META_3_EAST_2, local.META_3_WEST_1)}"

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
      availability_zone = local.local_data.region
      tags ={
          Name = "ClickInfrastructure"
      }
  }

  ######################### PROVIDER #################
  provider "aws" {
    region = "${local.local_data.awsRegion}"
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
  resource "aws_instance" "kali" {
    ami = local.KALI_AMI
    instance_type = local.local_data.size
    # VPC
    subnet_id = "${aws_subnet.subnet1.id}"
    # Security Group
    vpc_security_group_ids = ["${aws_security_group.kali.id}"]
    # the Public SSH key
    key_name = "${aws_key_pair.generated_key.key_name}"

    tags = {
      Name = "ClickInfrastructure-${random_id.server.id}"
    }

    provisioner "local-exec" {
        command =  "echo To connect to the machine use the SSH command:  ssh -i \"id_rsa\" kali@(static public IP address)  If permissions fail, try changing the permissions for the id_RSA file. More instructions found on the website. Your instance ID is: ${aws_instance.kali.id}  >> ipAddresses.txt"
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

  resource "aws_instance" "metasploit2" {
      ami = local.META_2_AMI
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
        command =  "echo Metasploitable 2 private IP address: ${aws_instance.metasploit2.private_ip} Your instance ID is: ${aws_instance.metasploit2.id}  >> ipAddresses.txt"
      }
  }


  # resource "aws_instance" "metasploitable3" {
  #     ami = "ami-0b49e298407cf1e17"
  #     instance_type = local.local_data.size
  #     associate_public_ip_address = false
  #     # VPC
  #     subnet_id = "${aws_subnet.subnet1.id}"
  #     tags = {
  #       Name = "ClickInfrastructure${random_id.server.id}"
  #     }

  #     # Security Group
  #     vpc_security_group_ids = ["${aws_security_group.allow_all.id}"]
  #     provisioner "local-exec" {
  #       command =  "echo Metasploitable 3 private IP address: ${aws_instance.metasploitable3.private_ip} Your instance ID is: ${aws_instance.metasploitable3.id}>> ipAddresses.txt"
  #     }
  # }
