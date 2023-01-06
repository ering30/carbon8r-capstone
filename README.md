# CARBON8R

CARBON8R is an essential tool for climate-conscious travellers. Use this calculator to cut through misinformation and get credible carbon emissions data for one-way trips between two destinations. Trustworthy data averages for car, bus, train and airplane journeys are based on international GHG protocol and standards.

*Version 1.0 release 6 January 2023*

## Features

Key features: 
+ Search for any locations across the world as your start or destination
+ Quickly retrieve carbon emissions for each journey
+ Save a collection of journeys to your profile to reference later
+ View your total emissions for your entire itinerary
+ Mobile-first design ensures you can access CARBON8R no matter where you are

Technologies / dependencies:
+ Node JS
+ Express JS
+ React
+ Material UI
+ MySQL
+ [RapidAPI : Carbon Sutra](https://rapidapi.com/carbonsutra/api/carbonsutra1/)
+ [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript)

## Motivation

For many of us, travel is back on the agenda after a long time staying put (woohoo!). It also means our carbon footprints are climbing again (rats!). Thankfully, CARBON8R provides an easy way for climate-conscious individuals and businesses to access reliable data for their carbon footprint. The goal is to aid in making intelligent travel decisions and to educate and increase awareness about carbon dioxide emissions from travel. 

## Requirements

To run this code locally you will need:
+ [Node.js](https://nodejs.org/)
+ [React](https://facebook.github.io/react/)
+ [mySQL](https://www.mysql.com/)

## Installation or Getting Started

To use this code locally, complete the following:

Method 1: Github clone

	git clone https://github.com/ering30/carbon8r-capstone.git
    cd carbon8r-capstone 
    // to start the backend: 
    cd carbon8r-back
    npm install
    npm start
    
    //to start the frontend:
    cd frontend
    npm install --legacy-peer-deps
    npm start

Method 2: Docker containers
Download the Docker containers here:
+ [Frontend](https://hub.docker.com/r/gonthierin/carbon8r-frontend)
+ [Backend](https://hub.docker.com/r/gonthierin/carbon8r-backend)

Both methods will require a mySQL database:
1. Download the 'carbon8r-queries.sql' file in the main folder of this repo. 
2. Create a schema called 'carbon8r' and use the queries in the file to set up your tables. 
3. The queries will set you up with an admin account with full access to functionalities (primarily viewing list of all users). 
	Details for admin login:
	email: admin@gmail.com
	pw: 1234
4. Edit the db.config file in backend folder to reflect your db password and username/authorisation. 
5. Test by logging in through the frontend - if you can enter the site, the database is working!
    
## Reference

+ [Google Maps Javascript API Docs](https://developers.google.com/maps/documentation/javascript)
+ [RapidAPI : Carbon Sutra Docs](https://rapidapi.com/carbonsutra/api/carbonsutra1/)
+ [Swagger docs for CARBON8R backend API's](http://localhost:4000/api-docs/)
