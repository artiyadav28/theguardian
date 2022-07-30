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
- ### Development Mode
    To run in development mode, in the project folder, run:
    ```bash
    chmod +x run.sh
    ./run.sh dev
    ```
    The server will start on port 5000, and the client on port 3000. You can access the website by visiting: http://localhost:3000

- ### Production Mode
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
    
    You can also specify a custom port using:
    ```bash
    ./run.sh prod 1025
    ./run.sh prod --no-build 1025
    ```
    This will start the server on port 1025 (http://localhost:1025).  
    (The specified port must be greater than or equal to 1024)  
    By default, the port is 5000 if you do not specify anything.

## Manual Start
- ### Development Mode
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
    
    The server will start on port 5000, and the client on port 3000.  
    You can access the website by visiting: http://localhost:3000

- ### Production Mode
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
    
    If you wish to specify a port as well, then run:
    ```bash
    NODE_ENV=production PORT=1025 pm2 start server.js --name "TheGuardianProject"
    ```
    Access the website from http://localhost:1025  
    (The specified port must be greater than or equal to 1024)  
  
## Common Issues
- The first time you use **GIT** or **NPM** in the website, it may take a long time to get the results or it might give an error. This is only a one-time thing because the corresponding python module (js2py) requires some time to initialise.
    In order to not face this issue, after starting the project, run this command:
    ```bash
    python3 -c "import js2py; js2py.require('compare-versions')"
    ```
    This will initialise the module.  
    (If you are using the *run.sh* script, then you need not do this. The script automatically initialises this module.)  

- Sometimes, when running in development mode, you might get an error like:
    ```bash
    options.allowedHosts[0] should be a non-empty string
    ```
    To fix this, set the environment variable `DANGEROUSLY_DISABLE_HOST_CHECK` to `true` by running:
    ```bash
    export DANGEROUSLY_DISABLE_HOST_CHECK=true
    ```

## Dataset Collection
The script used for generating the dataset for trust score is also included.
To create your own dataset:
1. Head over to the *create_dataset* folder inside the *modules* directory.
2. In the *files* folder, in the **links.txt** file, enter the URLs of the repository which you want to include in the dataset.
3. In the project's home folder, run:
    ```bash
    python3 main.py create_dataset
    ```
Note that you need to have plenty of tokens in the .env file for this function.

## Clean
The *run.sh* script contains a *clean* feature as well, for cleaning any remaining cloned repositories. To use this, run:
```bash
chmod +x run.sh
./run.sh clean
```