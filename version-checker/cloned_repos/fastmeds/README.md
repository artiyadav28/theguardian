
# FastMeds - Medical Resource Finder

A website where users can find medicines and hospital beds from the nearest locations.
Medical stores can manage their inventory and track the sold/available medicines.
Hospitals can track allocated and free beds as well as add new beds.

## Types of Account
* Medical Store
* Hospital

## User Permissions
* making an account is not required
* can search for a particular medicine by brand/generic name
* can search for a bed of particular specification

## Medical Store Permissions
A Medical Store can
* register themselves on the website
* create their profile with details such as their email, contact number
* add items to their inventory by specifying medicine name, generic name , quantity and price
* bill items that have been sold out by specifying the medicine name , patient name and quantity
* view transaction history
* view inventory

## Hospital Permissions
A Hospital can
* register themselves on the website
* create their profile with details such as their email, contact number
* add beds with particular specifications and quantity
* allocate bed by specifying patient name and price
* view allocated beds and free them if required
* view available beds

## Features
* User/Medical Store/Hospital location is detected using reverse geocoding api(MapMyIndia) by fetching their coordinates.
* Medical Store/Hospital profile shows the name, contect info, email , address and coordinates
* An autocomplete search bar to search for medicines and beds
* Inventory Management features such as adding , removing items and keeping track of transactions
* A User has to ask for the required item and quantity and a list of locations having sufficient resources in the same city is shown in distance-sorted order.

## View live App

Hosted at **https://fastmeds.herokuapp.com/**


## Tech Stack Used

### The MERN Stack

* [MongoDB](https://docs.mongodb.com/) - Document database - to store data as JSON 
* [Express.js](https://devdocs.io/express/) - Back-end web application framework running on top of Node.js
* [React](https://reactjs.org/docs/) - Front-end web app framework used
* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment 

### Middleware

* [Redux](https://redux.js.org/basics/usage-with-react) - State management tool used with React
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM for MongoDB

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Your machine should have npm and node.js installed to use it locally.

### Setup and Installation


1. First fork the repo to your account.  
   Go to the forked repo and clone it to your local machine:

```sh
git clone https://github.com/Your_Username/charityplus.git
```

This will make a copy of the code to your local machine.

2. Now move to the `fastmeds` directory.

```sh
cd fastmeds
```

3. Now check the remote of your local code by:

```sh
git remote -v
```

The response should look like:

```sh
origin	https://github.com/Your_Username/fastmeds.git (fetch)
origin	https://github.com/Your_Username/fastmeds.git (push)
```

To add upstream to remote, run:

```sh
git remote add upstream https://github.com/milan0027/fastmeds.git
```

Again run `git remote -v`, the response should look like:

```sh
origin	https://github.com/Your_Username/fastmeds.git (fetch)
origin	https://github.com/Your_Username/fastmeds.git (push)
upstream	https://github.com/milan0027/fastmeds (fetch)
upstream	https://github.com/milan0027/fastmeds (push)
```

4. Once the remote is set, install all the necessary dependencies by the following command:

```sh
npm install
```
5. Move to `client` folder and install all the necessary dependencies by the following command:

```sh
cd client
npm install
cd ..
```

6. Create a `.env` file in the `fastmeds` directory and add the following
```sh
MONGODB_URL=YOUR_MONGODB_URL
```

### Run locally

Run the below command to start the app:

```sh
npm run dev
```
* The **server** runs on port **5000**
* The **client** side runs on port **3000**
* Both client and server must run **concurrently.**
**Go to: [http://localhost:3000](http://localhost:3000)**


## Deployment

1. Add the following lines to server.js :

```(JavaScript)
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
```
2. Add the following script to the package.json of server

```(JSON)
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

3. Install Heroku CLI and make sure you have intialised a git repository in the project directory. Enter the following commands in the terminal :

```(bash)
heroku login
heroku create
git add .
git commit -am "Deployed to Heroku"
git push heroku master
```
4. Open your heroku account and in settings configure **MongoURI** variable.
5. Open your heroku account and click on **Open App** option in the dashboard.
