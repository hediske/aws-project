#!/bin/bash
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y nginx nodejs npm git

sudo systemctl start nginx
sudo systemctl enable nginx

git clone --branch front https://github.com/hediske/aws-project.git /home/ec2-user/your-react-app
cd /home/ec2-user/your-react-app/frontend

sudo npm install
sudo npm run build

mkdir /home/ec2-user/app-deploy
cp -R /home/ec2-user/your-react-app/frontend/build/ /home/ec2-user/app-deploy

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

sudo systemctl restart nginx

sudo chmod +x /home/ec2-user/app-deploy/build/
sudo chmod +x /home/ec2-user/app-deploy/
sudo chmod +x /home/ec2-user/
sudo chmod +x /home/

echo "React app deployment completed successfully!"
