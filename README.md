# Blog Project 
### Please click [here][requirementUrl] to see project requirements
#### This application is running on Heroku. [Click here][herokuDoc] to acccess api documentation.

[requirementUrl]: https://github.com/berkayclk/blog-project/blob/release/prod/ProjectRequirements.md
[herokuDoc]: https://blog-app-dev.herokuapp.com/api/doc/

### Installation
 - Open any folder in your pc.
 - ``` git clone https://github.com/berkayclk/blog-project ``` - to clone project to your locale.   
 - ```cd blog-project``` - to enter folder.    
 - ``` npm install```  - to install dependencies.   
 - ``` npm start ``` - to start application.  
 - You can use api endpoints on http://127.0.0.1:8080/api
  
To specify project, Tou can create an env file in project. Dotenv module will be read this. 
 #### Sample .env file
 > ##### These values is default in app.

```
HOST=localhost
PORT=8080
BASE_PATH=/api

LOCALE=tr-TR
MONGODB_URI=mongodb://localhost:27017/blog

AUTHORIZED_DURATION=1
AUTHORIZED_DURATION_TYPE=DAY | HOUR | MINUTE
JWT_SECRET=secret

```


#### TODO
  - Create unit tests
