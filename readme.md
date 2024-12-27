# AWS 3 tier App Deployment

This project is a hands-on walkthrough of deploying a three-tier web architecture in AWS. The architecture consists of:

- **Presentation Tier** (Web Tier): A user interface running on Amazon EC2 instances, hosted behind an Elastic Load Balancer (ELB) to distribute incoming traffic efficiently.
- **Application Tier**: A middleware layer processing business logic, hosted on another set of Amazon EC2 instances, and scaling as needed to handle load.
- **Database Tier**: A managed relational database, such as Amazon RDS, offering high availability and automated backups.<br/>

The deployment involves manually creating the necessary network (VPC, subnets, and route tables), security (security groups, IAM roles, and policies), application, and database components and configurations to achieve the following objectives:

- **Scalability**: Using AWS services like Auto Scaling Groups, Elastic Load Balancers, and managed database solutions to handle fluctuating workloads efficiently.
- **Availability**: Designing the architecture with redundancy across multiple Availability Zones (AZs) to ensure continuous service during failures.
- **Security**: Implementing best practices, including secure VPC design, least privilege IAM roles, encryption of data in transit and at rest, and network-level isolation through subnets and security groups.
  By respecting the principles of scalability, availability, and security, this project demonstrates how to build robust and future-proof web applications in AWS.

## Architecure

<img src='./architecture.png'>

**Load balancing, health checks and autoscaling groups** are created at each layer to maintain the availability of this architecture.

### 1. **Elastic Load Balancer (ALB)**

The ALB in the **public subnet** handles traffic distribution to EC2 instances in the Auto Scaling Group, ensuring high availability by routing traffic to healthy instances.

### 2. **Public and Private Subnets**

- **Public Subnet**: Hosts the ALB and NAT Gateway, enabling internet-facing services.
- **Private Subnet**: Secures backend resources like EC2 instances and RDS.

### 3. **Auto Scaling Group (ASG)**

The ASG in the **private subnet** dynamically scales EC2 instances based on demand, ensuring optimal performance and cost efficiency.

### 4. **Amazon RDS**

RDS provides a managed relational database in the **private subnet**, with high availability via Multi-AZ and automated backups.

### 5. **Internet Gateway**

Facilitates internet access for the public subnet, connecting the VPC to external networks.

### 6. **NAT Gateway**

Located in the **public subnet**, it enables secure outbound internet access for private subnet resources without exposing them.

### 7. **Amazon Route 53**

Manages DNS and routes traffic to the ALB, with optional failover to a disaster recovery site.

This architecture ensures scalability, availability, and security by leveraging AWS best practices.

## How does it work ?

In this architecture, a public-facing Application Load Balancer forwards client traffic to our web tier EC2 instances.The web tier is running Nginx webservers that are configured to serve a React.js website and redirects our API calls to the application tier’s internal facing load balancer.The internal facing load balancer then forwards that traffic to the application tier, which is written in Node.js.The application tier manipulates data in a RDS MySQL multi-AZ database and returns it to our web tier.
