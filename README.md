# Astro-map-BE

This repository servers to provide backend functionaltiy to the astro-map front end repositiory. The app itself plots solar eclipse data from 1900 to 2100 based on data supplied from NASA's public websites. Data concerning lunar cycles are also added to the front end with calls made to an external /api. Basic user functionality is also added by this backend repository.

## Backend

The backend has been implemented using express & MongoDB/mongoose to store & interact with the dataset. Password validity is asserted using bcrypt to both validate & create login authentication. The co-ordinate datasets were tested using jest before database seeding & inital testing of eclipse mappings matched predictions provided by NASA. Once seeded into MongoDB, the backend functionality was tested using chai/mocha in conjuction with supertest.


## Co-ordinate-Dataset

The main focus of the dataset is to provide coordinate information to facilitate the plotting of the moon's shadow upon the earth as the eclipse moves over its surface. 
The dataset has been created by running a python script over numerous .html points created by NASA (https://eclipse.gsfc.nasa.gov/SEpath/SEpath2001/SE2026Aug12Tpath.html) and scraping the coordinate information. 



Once scraped into arrays in .js files, we created a sepaerate .js script to plot over the elements and divide these into usable JSON variables & account for edge cases, such as null values.
We then wanted to convert the coordinates variables from degrees decimal minutes into decimal degrees for our front end mapping functionality.

The base link for the hosted api is below:

(https://astro-map-be.onrender.com/)

## Endpoints

1.

    GET /api/eclipses
    (find all eclipses - lists all the eclipse data for the center shadow stretching from 1900-2100)
    https://astro-map-be.onrender.com/api/eclipses
    
2.

    GET /api/eclipses/:type
    (filters eclipse data by type; annual, total, hybrid)
    https://astro-map-be.onrender.com/api/eclipses/total
    
3.

    GET /api/eclipses/:type?date=DATE
    (filters eclipse data by type & date, date input must be specific, type can be non-specific)
    https://astro-map-be.onrender.com/api/eclipses/all?date=1958-04-19
    
4.

    GET /api/eclipses/all/:date
    (finds eclipse events in the next five year date is auto added by backend functionality & the query will not impact the result)
    https://astro-map-be.onrender.com/api/eclipses/all?date=2023-02-02
    
5.

    GET /api/comments/:id
    (lists all comments by event date id, will return a 404 if no comments are listed)
    https://astro-map-be.onrender.com/api/comments/2024-04-01
    
6.

    POST /api/users/signup
    (allows users to sign up, passwords are hashed serverside, duplicate usernames are not allowed)
    https://astro-map-be.onrender.com/api/users/signup

7.

    POST /api/users/login
    (allows users to login, compares user input to decrypted hash)
    https://astro-map-be.onrender.com/api/users/login

8.

    POST /api/comments/:id
    (allows users to post a comment by event date id)
    https://astro-map-be.onrender.com/api/comments/2024-04-01

9.

    PATCH /api/users/:user/favourites
    (allows users to add a favourite event by date ID, returns a 400 error if the user already exists)
    https://astro-map-be.onrender.com/api/users/pat/favourites

10.

    PATCH /api/users/:user/favourites/remove
    (allows users to remove a favourite event by date ID)
    https://astro-map-be.onrender.com/api/users/pat/favourites/remove

11.

    DELETE /api/comments/:id
    (delete comment by mongo hexideciaml id)
    https://astro-map-be.onrender.com/api/comments/63da52f36154389f0f2d0673


### Packages Used:
    Mongoose,
    MongoDB,
    bcrypt,
    dotenv,
    express,
    jest,
    chai,
    mocha,
    supertest,


# Developer Setup

1. Clone the repository by copying the https link & type the below command in your install directory

    ```bash
    # clone the repo
    git clone https://github.com/AliCW/Astro-map-BE.git
    ```
2. Create your environment varaibles and place them in the root directory or /db-seeding/ folder depending on your setup. You can get your mongouri link by clicking 'connect' on your mongodb console & select the 'drivers' connection method. You can addtionally change the name of your database by editing the link as follows: mongodb+srv://<USERNAME>:<PASSWORD>@example.cluster.name.mongodb.net/<DATABASE_NAME>?retryWrites=dvbbfh&w=fffsds

    ```bash
    .env.development - 
        PORT = <PORT_NUMBER>
        MONGOURI=<mongodb.example.link>

    .env.test - 
        PORT = <PORT_NUMBER>
        MONGOURI=<mongodb.example.link>
    ```

3. Install NPM dependencies in the root & db-seeding
    ```bash
    # install npm dependencies
    npm install
    ```

4. Seed MongoDB with co-ordinate & inital database information by running the below in the db-seeding folder
    ```bash
    # seed the database
    node seed.js
    ```

# Testing


The tests in /conversion-tests/ are redundant as their purpose was confirm the successful conversion & parsing of co-ordinate data from arrays to JSON.

To run backend testing functionality, you can type the below command. This will run the test files in __tests__/endpoint-tests.js


    # run all tests
    npm run test
