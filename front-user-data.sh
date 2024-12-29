#!/bin/bash
# Update and install required packages
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y nginx nodejs npm git

# Start and enable Nginx service
sudo systemctl start nginx
sudo systemctl enable nginx

# Clone your React app from a Git repository
git clone --branch front https://github.com/hediske/aws-project.git /home/ec2-user/your-react-app
cd /home/ec2-user/your-react-app/frontend

sudo echo "REACT_APP_API_URL=/api" > .env

# Install dependencies and build the React app
npm install
npm run build

# Create a folder to serve the React app    
mkdir /home/ec2-user/app-deploy
cp -R /home/ec2-user/your-react-app/frontend/build/ /home/ec2-user/app-deploy

# Configure Nginx to serve the React app
sudo tee /etc/nginx/conf.d/react-app.conf <<EOF
server {
    listen 80;
    listen [::]:80;
    root /home/ec2-user/app-deploy/build;
    location / {
        try_files \$uri /index.html;
    }
    location /api/ {
        proxy_pass http://internal-BackLoadBalancer-7722525.us-east-1.elb.amazonaws.com:80/;
    }
}
EOF

# Restart Nginx to apply the new configuration
sudo systemctl restart nginx

# Add permissions for the app folder (optional)
sudo chmod +x /home/ec2-user/app-deploy/build/
sudo chmod +x /home/ec2-user/app-deploy/
sudo chmod +x /home/ec2-user/
sudo chmod +x /home/

# Print a message indicating setup completion
echo "React app deployment completed successfully!"
