
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y git
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash && source ~/.bashrc
nvm install 16
nvm use 16
npm install -g pm2
git clone --branch back https://github.com/hediske/aws-project.git /home/ec2-user/node_server
cd /home/ec2-user/node_server/backend
sudo echo "DB_NAME=test
DB_USER= test   
DB_PASSWORD=test
DB_HOST=test" > .env
npm install
pm2 start index.js && pm2 save
pm2-runtime start index.js