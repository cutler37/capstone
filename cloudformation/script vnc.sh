#!/bin/bash
#Update Kali
sudo apt update

# If GUI is wanted, do the following:
sudo apt install -y kali-linux-default kali-desktop-core kali-desktop-xfce
#Configure your vnc password:
tightvncserver
# choose password, followed by "n"
# Connect to your VNC server using SSH as follows:
#   ssh -L 5901:localhost:5901 -i python_keypair.pem kali@<<ec2Address>>
#   Address to connect when using VNC Viewer: 
#       localhost:5901