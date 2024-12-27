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
cd /home/ec2-user/your-react-app/front

# Install dependencies and build the React app
npm install
npm run build

# Configure Nginx to serve the React app
sudo tee /etc/nginx/conf.d/react-app.conf <<EOF
server {
    listen 80;
    server_name _;

    root /home/ec2-user/your-react-app/build;

    index index.html;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

# Restart Nginx to apply the new configuration
sudo systemctl restart nginx

# Add permissions for the app folder (optional)
sudo chmod -R 755 /home/ec2-user/your-react-app

# Print a message indicating setup completion
echo "React app deployment completed successfully!"
