# ShareNow

A simple Django web-app which enables users to share files.
A register and login system is implemented, using which users can create accounts and use them to upload files.  
The other users will then be able to see and download all the files uploaded by the users.

## Features:
- Has a login system for users to create accounts and login
- All filetypes are supported for upload
- The files shared by a user will be public and will be available for everyone to view and download
- A user can also delete a file uploaded by him/her.

## Tech Stack:
- Python
- Django
- HTML
- CSS
- Bootstrap
- JavaScript

### Note:
To generate a secret key, you need to install django (**pip install django**) and then run the following Python script:
```py
from django.core.management.utils import get_random_secret_key
get_random_secret_key()
```

## Steps to deploy:
- Make sure you have **docker** and **docker-compose** installed.
- Clone the repository.
    ```bash
    git clone https://github.com/himanshudas75/ShareNow.git
    ```
- cd into the folder:
    ```bash
    cd ShareNow
    ```
- Run the docker-compose file:
    ```
    sudo docker-compose up
    ```
- A local instance of the web-app will be started on: http://127.0.0.1:8500/