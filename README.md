# italy-places

An application where you can run a search for all of the places matching the text that you provide using Bing and Google search API. You can use
the application to store place(s) that are your ‘favorite’ to your ‘favorite places’ page. This way you can take a look at your
favorites page whenever you want to pick your next destination.

User stories catered in this application are:
- User should be able to type in a search box
- User should be able to click on a search button
- A page showing multiple (at least 10) search results should appear whenever the search button is clicked
- User should be able to create a profile and login to the application
- User should be able to add individual search results to their favorite places
- User should be able to see all of their favorite places
- User should be able to remove individual places from their favorites

## Docker Compose
Docker images for client and server applications are available at [Docker Hub](https://hub.docker.com/r/asimhanif23250). You can run the application locally without ever getting the source code using docker compose

- Get [docker-compose.yml](https://github.com/asimhanif23250/italy-places/blob/master/docker-compose.yml) file. 
- In terminal run `sudo docker-compose up` (this will download and run the docker images for client and server).
- After the completion of obove command client and server are accessable at `http://localhost:4200` and `http://localhost:3000` respectively.

## Setup Dev Server
### PlacesClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### PlacesServer

Run `node app.js` for a dev server. Sever will start listening on port 3000