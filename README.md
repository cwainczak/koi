# ~ Developed by Cooper Wainczak & Amir Elrahep ~

# What is Koi?

Koi is a social media application created through React.js and Node, using Express as a framework for the REST API and AWS to host the RDS database. Koi was developed with the intention of being able to interact with other users through Posts and Comments on a User’s feed, as well as Direct Messages between any two users. This allows all of Koi’s users to have a unique online name and personality. Like any other social media application, Koi allows people to connect from anywhere in the world.

Our reasoning and inspiration behind this idea stemmed from our drive and ambition to broaden our skills. Not only did this project require a deep understanding of software engineering principles and fundamentals, but it gave us a chance to learn and experience development using React.js (with HTML and CSS), JavaScript, Express, and a REST API, among others; Prior to this project, we didn’t have any knowledge or experience with these concepts. This project also required complete CRUD (Create, Read, Update, Delete) functionality, sharpening our database and SQL skills even further.

With this idea in mind, we were able to develop and implement the majority of the intended features, such as Accounts & Security, Friends, and Feed (using Posts & Comments), through the span of the semester. However, some ideas, such as Direct Messages, are not included with the initial release of the application, and, as referenced later, are key components of our future plan should we continue with the development of Koi.

# Project Design

Koi is built on multiple components, each targeting different fragments of design and implementation. These components are individually elaborated on below:

## The Standalone Application

This portion of the project is further divided into two segments:

### The Frontend

This is where the application comes to life in the eyes of a user. The frontend serves as a view for the application’s context. It brings design to the forefront and allows users to interact through the use of components, such as Buttons and TextFields. It is built with React.js, a JavaScript library that integrates HTML and CSS to design user interfaces, as well as Material-UI (MUI) components. Lastly, the frontend relays information to other aspects of the application to create an appealing and responsive experience.  		

### The Backend

On the other hand, the backend, built solely with JavaScript, processes information and data in the application so that it can be represented correctly through the frontend. This includes information that users enter, data passed to and from the API, and much more. For instance, if a user enters their username and password credentials to login to Koi, their entered information needs to be used and processed to ensure its validity and accuracy. This process takes place when the frontend relays its data over to the backend and is finished once the backend makes sense of it, either individually or with outside help, and returns it back to the frontend for viewing.

## The Database

The database allows for an extended user experience by storing necessary information and data for future retrieval. More specifically, a database is used to maintain the creation of user accounts, posts, and other entries that are needed to establish a rich and familiar environment to each participating user.

The database is stored on the AWS (Amazon Web Services) Cloud in an RDS (Relational Database Service) instance and supports full CRUD (Create, Read, Update, Delete) functionality through MySQL queries. However, to establish this organized approach, four tables are included in the database’s main schema (mydb) with identifying relationships among each entity. The four tables are: User, Post, Comment, and Conversation, each storing a unique part of the application’s long-term data. In addition, the attributes of each entity and the relationship between entities is represented by the ER diagram below:

![image](https://user-images.githubusercontent.com/57240871/170848053-a204f328-e579-45e2-90e6-7784b7602dc5.png)

## The API

Though the database allows the ability to manipulate the application’s long-term data, the API (Application Programming Interface) is needed to make the request and send the signal for any read or write event to actually take place. Furthermore, instead of connecting directly to the database through the application’s source code, the API is contacted from the source code to make a request on the database. In other words, the API acts as the middleman between the source code and the database.

This process is done through endpoints, which represent the unique address of each incoming and outgoing signal. In this case, signals are sent through HTTP requests/responses, including headers and values respective to the requested service. Then, the API, using controller and router objects to determine the route of each associated action/endpoint, is able to listen for requests made and respond to them appropriately.

For instance, if the frontend wants to validate a user’s login credentials, it must first translate the information in the user interface to the backend of the source code. Since the backend cannot directly interact with the database, using the correct endpoint, the backend will ask for the API’s assistance in validating these credentials. To do this, the backend will send a HTTP GET request, since we are asking the API to get a value indicative of if we have permission to login with the specified credentials. At this point, the API, which is actively listening for HTTP requests, will receive the request and contact the database to generate an accurate response. In this case, if the username and password values sent through the HTTP request match that of the database, we are allowed to login, if not, we are not allowed to login. After coming to this conclusion, the API includes this decision in the HTTP response packet, which is then sent to the backend. The backend then relays this message to the frontend and, depending on the response value, allows the user to login and brings them to the home page or denies login and displays a dialog message to the user (i.e. “Incorrect username or password”).	

Every endpoint prefix and their respective HTTP method, suffix, action, request data, response data, and status code is below:

![image](https://user-images.githubusercontent.com/57240871/170848078-f2e2f29b-8ccb-4fe9-ae7b-a5ad46abcd36.png)

![image](https://user-images.githubusercontent.com/57240871/170848085-df714d55-c163-4178-9d65-c53ac5a5d1d4.png)

![image](https://user-images.githubusercontent.com/57240871/170848113-95177d0c-e180-45a2-a3a3-b918aabc30f6.png)
![image](https://user-images.githubusercontent.com/57240871/170848116-59d91998-a838-4068-bb76-5dd64c1e3d0f.png)

![image](https://user-images.githubusercontent.com/57240871/170848127-f034093b-7143-4817-8f66-40da95e8f7c1.png)

# Video Demo

https://youtu.be/O8nMrVX6wjo
