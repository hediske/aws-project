#!/bin/bash

# Update packages and install necessary dependencies
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y git
sudo curl -sL https://rpm.nodesource.com/setup_16.x | bash - 
sudo yum install -y nodejs

# Clone the repository
git clone --branch back https://github.com/hediske/aws-project.git /home/ec2-user/node_server

# Navigate to the project directory
cd /home/ec2-user/node_server/backend

#Add the credentials
sudo echo "DB_NAME=tasks
DB_USER=admin
DB_PASSWORD=clB80rJXcaHmqvdTtvvF
DB_HOST=database-1.cnbkvitvmzfx.us-east-1.rds.amazonaws.com" > .env

# Install project dependencies
sudo npm install

# Start the Node.js server
sudo nohup node index.js > /tmp/node_server.log 2>&1 &

# Enable server to start on boot using systemd (optional, if you want the server to run as a service)
echo "[Unit]
Description=Node.js Server
After=network.target

[Service]
ExecStart=/usr/bin/node /home/ec2-user/node_server/backend/index.js
WorkingDirectory=/home/ec2-user/node_server
Restart=always
User=ec2-user
Group=ec2-user

[Install]
WantedBy=multi-user.target" | sudo tee /etc/systemd/system/node_server.service > /dev/null

# Start the service
sudo systemctl enable node_server
sudo systemctl start node_server
