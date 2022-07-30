#!/bin/bash

# Go the directory of the script
reldir="$( dirname -- "$0"; )";
cd "$reldir"

function server-install() {
    pip3 install -r requirements.txt
    npm install
}

function client-install() {
    cd client
    npm install
    cd ..
}

function run-dev() {
    server-install
    client-install
    NODE_ENV=development npm run dev
}

function build-prod() {
    client-install
    cd client
    rm -rf build
    npm run build
    cd ..
}

function run-prod() {
    server-install
    pm2 stop TheGuardianProject
    pm2 delete TheGuardianProject
    NODE_ENV=production pm2 start server.js --name "TheGuardianProject"
}

if [[ "$1" == "dev" ]]
then
    run-dev
elif [[ "$1" == "prod" ]]
then
    if [[ "$2" != "--no-build" ]]
    then
        build-prod
    fi
    run-prod
elif [[ "$1" == "clean" ]]
then
    rm -rf ./modules/git_vuln/cloned_repos
    rm -rf ./modules/npm_vuln/cloned_repos
    rm -rf ./modules/sensitive_info/cloned_repos
else
    echo "Invalid parameter!"
    echo ""
    echo "For development build:"
    echo "-> run.sh dev"
    echo ""
    echo "For production build:"
    echo "For building the client as well"
    echo "-> run.sh prod"
    echo "For running without building the client"
    echo "-> run.sh prod --no-build"
    echo "(Note that you need to first build the client atleast once to run the production server)"
    echo ""
    echo "For cleaning the cloned repositories (if any left):"
    echo "-> run.sh clean"
fi