# The Guardian Project

An Open Source Software (OSS) Security Inspector made with ❤️ by 
- [@imraunn](https://github.com/imraunn)
- [@artiyadav28](https://github.com/artiyadav28)
- [@himanshudas75](https://github.com/himanshudas75)

Live Instance: [theguardianproject.ml](http://theguardianproject.ml)

## Features
- **Trust Score**  
    EDF probability distribution applied on data scraped from GIT API to generate an estimate trust score of a repository.
- **Git Analysis**  
    Recursively walk and analyze dependencies of a GIT repository to check for vulnerabilities and outdated dependencies.
- **PyPI Analysis**  
    Interact with PyPI API to fetch dependencies of a package and analyze for CVEs.
- **NPM Analysis**  
    Interact with NPM API to fetch dependencies of a package and identify vulnerabilities and outdated dependencies.
- **Sensitive Info**  
    Identify hardcoded secrets, tokens, passwords, emails from a repository.

## Pre-Requisites
The following should be installed for this project to work:
- Python3
- Node
- NPM
- pm2

## GitHub Tokens
- This project needs **GitHub Tokens** to work.
- In the **.env** file in the project's folder, you can enter as many tokens as you want in the format:
    ```bash
    GITHUB_TOKEN$i=<ENTER_TOKEN_HERE>
    ```
    where $i is a number
- **You can start the project with zero tokens as well**, but for using the "Trust Score" feature for repositories with a lot of stars, you will need tokens.
- There is no upper limit to the number of tokens you can add.

## Auto Start
A bash script has been provided for automatically running the project.
### Development Mode
To run in development mode, in the project folder, run:
```bash
chmod +x run.sh
./run.sh dev
```
The server will start on port 5000, and the client on port 3000. You can access the website by visiting: http://localhost:3000

### Production Mode
To run in production mode, in the project folder, run:
```bash
chmod +x run.sh
```
If you want to build the client folder as well, run:
```bash
./run.sh prod
```
If you do not wish to build the client folder, run:
```bash
./run.sh prod --no-build
```
Access the website from http://localhost:5000

## Manual Start
### Development Mode
To start the project in the development mode manually, follow these steps:
1. Go to the project folder, and run:
    ```bash
    pip3 install -r requirements.txt
    npm install
    ```
2. Go the the *client* folder, and run:
    ```bash
    npm install
    ```
3. In the project folder, run:
    ```bash
    NODE_ENV=development npm run dev
    ```
    (You need not set the NODE_ENV environment variable to 'development', just make sure that it is not set to 'production')  
  
The server will start on port 5000, and the client on port 3000. You can access the website by visiting: http://localhost:3000

### Production Mode
To start the project in production mode, follow these steps:
1. Go the project folder, and run:
    ```bash
    pip3 install -r requirements.txt
    npm install
    ```
2. Go to the *client* folder:  
    If you want to build the client, run:
    ```bash
    npm install
    npm run build
    ```
    Else, you can skip this part.
3. In the project folder, run:
    ```bash
    NODE_ENV=production pm2 start server.js --name "TheGuardianProject"
    ```
Access the website from http://localhost:5000