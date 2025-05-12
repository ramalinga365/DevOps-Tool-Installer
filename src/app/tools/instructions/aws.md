# AWS CLI

Command line interface for interacting with AWS services

## Requirements

- Python 3.7 or later
- Internet connectivity
- AWS account (for using the CLI)

## Linux Installation

1. Download the installation file:
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

2. Install unzip if not already installed:
```bash
sudo apt-get install unzip
```

3. Unzip the installer:
```bash
unzip awscliv2.zip
```

4. Run the install program:
```bash
sudo ./aws/install
```

5. Verify the installation:
```bash
aws --version
```

## Windows Installation

1. Download the AWS CLI MSI installer:
- Visit [AWS CLI Windows Installer](https://awscli.amazonaws.com/AWSCLIV2.msi)
- Download and run the MSI installer
- Follow the installation wizard

2. Verify the installation:
```powershell
aws --version
```

## Configuration

1. Configure AWS CLI with your credentials:
```bash
aws configure
```

2. Enter your AWS credentials when prompted:
```
AWS Access Key ID: [Your access key]
AWS Secret Access Key: [Your secret key]
Default region name: [Your preferred region, e.g., us-west-2]
Default output format: [json/yaml/text/table]
```

## Common Commands

```bash
# List S3 buckets
aws s3 ls

# List EC2 instances
aws ec2 describe-instances

# Create an S3 bucket
aws s3 mb s3://bucket-name

# Copy file to S3
aws s3 cp file.txt s3://bucket-name/

# List IAM users
aws iam list-users

# Describe regions
aws ec2 describe-regions
```

## Environment Variables

You can also configure AWS CLI using environment variables:

```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_DEFAULT_REGION="your_region"
```

## Uninstallation Instructions

### Linux

1. Remove AWS CLI:
```bash
sudo rm -rf /usr/local/aws-cli
sudo rm /usr/local/bin/aws
sudo rm /usr/local/bin/aws_completer
```

2. Remove configuration files:
```bash
rm -rf ~/.aws
```

### Windows

1. Uninstall via Control Panel:
- Open Control Panel
- Programs and Features
- Select AWS Command Line Interface
- Click Uninstall

2. Remove configuration files:
```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.aws"
``` 