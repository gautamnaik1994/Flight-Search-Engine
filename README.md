# Flight Search Engine



Reactjs based app to search flights

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

You should have Git and Node (greater than v7) installed.


### Installing

Git clone the repository


```
cd Flight-Search-Engine
npm install
```

### Developing

```
npm start
```
This project uses [json-server](https://github.com/typicode/json-server) to serve json data from [db.json](https://github.com/gautamnaik1994/Flight-Search-Engine/blob/master/db.json) file found at the root of the project folder.

In production mode [json-placeholder](https://github.com/typicode/jsonplaceholder) is used to serve the same [db.json](https://github.com/gautamnaik1994/Flight-Search-Engine/blob/master/db.json) from [here](https://my-json-server.typicode.com/gautamnaik1994/Flight-Search-Engine/flights/)

To view the app in browser, open [http://localhost:5000/](http://localhost:5000/). The value of port can be changed in [webpack.config.dev.js](https://github.com/gautamnaik1994/Flight-Search-Engine/blob/master/webpack.config.dev.js)


To change the BASE_URL, open [constants.js](https://github.com/gautamnaik1994/Flight-Search-Engine/blob/master/src/components/helpers/constants.js)

### Building the project
```
npm run build
```
will build the project in dist folder.

### Troubleshooting
In case of node-sass error during intalling, downgrade or upgrade to node version 8.11
