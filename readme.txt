Instructions for building and running the project

Back-end:

I used node.js, express, middleware, mongoose with mongodb as a database, validator to validate and sanitise the input. I used various technique to make each files do separate thing and call each other. For example gameService.js is exporting a module that defines a set of functions to interact with a database to perform CRUD (Create, Read, Update, Delete) operations on a GameModel object (it reference gameModel where schema is). The module exports an object with properties that contain the functions for each operation. Those function that is then called and and used in gameController.js, where getDataControllerFunction, createGameControllerFunction, updateGameController, and deleteGameController, use the functions exported by the gameService module to perform CRUD operations on the GameModel object.

Front-end 

I used Create React App as a base for front-end with axios a Promise-based HTTP client based and  bootstrap for some css.

Description of application

This project is designed to let user enter their favourite game, the release date of the game and its description as a Wishlist. This project is inspired by this website 

https://store.steampowered.com/wishlist/profiles/76561198345589372/#sort=order

This is a ‘steam’ an online game store and specifically a wish list page.
In future I wish to upgrade it even further that interacts with database that can be pulled with actual information instead of user typing all it down.
 
A list of features I am proud of

I am especially proud with my GameCrud.js on front-end files. I used combination of react app, use of the useState and useEffect hooks to manage the component state. It took me a while to figure out how to use the component that fetches the list of games from a REST API endpoint. I had to make a HTTP GET request using the axios library. 
I managed to create function and methods to such as save function that handles the submission of the form when the user clicks the "Add" button. It sends an HTTP POST request to the REST API endpoint to create a new game with the data entered in the form. The editGame function populates the form with the data of an existing game that the user wants to update. The deleteGame function sends an HTTP DELETE request to the REST API endpoint to delete a game from the list.

Instructions on how to use application if it's not obvious.
First I will explain how to start application from vscode or non web based locally:
•	First in terminal of GameCrud.js file (the pathfile \project2.0\frontend\src\components) or just on frontend folder type ‘npm start’. Must be in frontend folder which is located inside the project2.0.
•	Second in terminal inside project2.0 folder type ‘npm run dev’ like how we did in for assingments. Must be outside of frontend folder. 
With both running the application should work in localhost. 

The application has 3 input box where it is labelled as game name, release date and description. It lets user to type the information and click add to save it as their game wishlist. They can edit and delete the existing data. User wishing to edit the data will press edit first then the information will be transferred to the input box and let user change it then. Then press update to save the changes. If the bad or empty input is present, the pop-up message will appear. 

API documentation, References and Breakdown on how I built my project
Backend
- app.js
This file sets up an Express.js server, connects to a MongoDB database, sets up CORS headers, and defines a few routes for handling HTTP requests.
It then creates a new instance of the Express application using the express() function and assigns it to the app variable.
The code sets up CORS headers using app.use() and cors() functions to allow requests from the specified origin as middleware.
I have Access-Control-Allow-Origin: This header allows a web application running in a different domain to access the resources of the server. 
Access-Control-Allow-Headers: This header specifies which headers are allowed in the HTTP request. 

- routes.js
Tis file exports an instance of an Express router object that defines a series of routes for the /game endpoint.

Each route is defined using the router.route() method and corresponds to a specific HTTP method (GET, POST, PATCH, DELETE) for a specific endpoint path (/game/getAll, /game/create, /game/update/:id, /game/delete/:id).

For example, the first route router.route('/game/getAll').get(gameController.getDataControllerFunction) corresponds to a GET request for the /game/getAll endpoint path. When this route is accessed, the gameController.getDataControllerFunction function will be called to handle the request in different file. 

- gameModel.js
This code defines a Mongoose schema for a "game" object, which consists of a name, date, and description. The schema has to meet certain requirements such as requiring the name and description to be strings and ensuring that the name is no longer than 100 characters. The "validator" module is used to perform these validations, including checking that the date is in the format of YYYY-MM-DD. Finally, the schema is exported as a Mongoose model that can be used to create, read, update, and delete game objects in a MongoDB database.


- gameController.js
This file exports four controller functions that handle HTTP requests related to game details.
For example the getDataControllerFunction function handles an HTTP GET request to retrieve game data from the database. It calls the gameService.getDataFromDBService() function to retrieve the data and sends the data as a JSON response to the client.

The createGameControllerFunction function handles an HTTP POST request to create a new game data entry. It calls the gameService.createGameDBService() function to create the new entry and sends a success or failure response to the client.

The updateGameController function handles an HTTP PUT request to update an existing game data entry . It calls the gameService.updateGameDBService() function to update the entry and sends a success or failure response to the client.

Finally, the deleteGameController function handles an HTTP DELETE request to remove a game data entry from the database. It calls the gameService.removeGameDBService() function to remove the entry and sends a success or failure response to the client.

- gameService.js
This file exports an object with four functions of CRUD (Create, Read, Update, and Delete) operations on a MongoDB database for a Game model.
getDataFromDBService function retrieves all game records from the database using the find() method of the GameModel model.
createGameDBService function creates a new game record in the database using the save() method of the GameModel model.
updateGameDBService function updates a game record in the database using the findByIdAndUpdate() method of the GameModel model.
removeGameDBService function deletes a game record from the database using the findByIdAndDelete() method of the GameModel model.
Frontend
I used create react app as a main framework for frontend
In this framework the user can create, read, update, and delete (CRUD) a game wishlist. The component imports axios for making HTTP requests to the backend server, useEffect and useState for managing component state, validator for validating the date input, and a stylesheet for styling the component.
How I used axios?
The loadGames() function uses axios to send a GET request to the server to retrieve the list of games from the backend API. The response data is then stored in the games state variable, which is used to render a table of games in the frontend.
The save() function uses axios to send a POST request to the server to create a new game in the database. The editGame() function and update() function use axios to send PATCH requests to the server to update an existing game in the database. The deleteGame() function uses axios to send a DELETE request to the server to delete a game from the database.

I initialized some state variables using the useState hook: _id, name, date, description, and games. The loadGames() function is called with useEffect hook to populate the games state with a list of games when the component mounts.

The it renders a form where the user can input game details such as the game name, release date, and description. When the user submits the form, save() function is called to add the game to the wishlist. The table element below the form displays the list of games in the wishlist. The user can edit or delete the game from the wishlist by clicking on the right buttons.

GameGrud.js in path file \project2.0\frontend\src\components\GameGrud.js main documentations I used as reference:
Create React app:
https://legacy.reactjs.org/docs/getting-started.html
axious example:
https://axios-http.com/docs/example

how to make a form in react (line 109)
https://legacy.reactjs.org/docs/forms.html

onChange event (GameCrud.js, line 112):
https://upmostly.com/tutorials/react-onchange-events-with-examples

Using the State Hook (line 7):
https://legacy.reactjs.org/docs/hooks-state.html

Using the Effect Hook (line 22):
https://legacy.reactjs.org/docs/hooks-effect.html

Combination of documents I used for React rendering for HTML like code:
https://legacy.reactjs.org/docs/rendering-elements.html
https://www.youtube.com/watch?v=Vq6B5CS-BJE
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components
bootstrap to make a form:
https://react-bootstrap.github.io/forms/overview/

backend list of documentation:

app.js
access-control-allow-origin (line 8):
https://stackoverflow.com/questions/10636611/how-does-the-access-control-allow-origin-header-work

how to use cors (line 13):
https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
https://expressjs.com/en/resources/middleware/cors.html

gameModels.js 

validator (line 14):
https://snyk.io/advisor/npm-package/validator/example

