#!/bin/bash

# pip3 install -r requirements.txt
# npm install

# npm run dev

if [[ "$1" == "dev" ]]
then
    echo "dev"
elif [[ "$1" == "prod" ]]
then
    echo "prod"
else
    echo "Invalid parameter!"
    echo "For development build -> run.sh dev"
    echo "For production build -> run.sh prod"
fi