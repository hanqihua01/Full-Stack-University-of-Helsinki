# Full Stack - University of Helsinki
## How to create a React app?
### Fisrtly, we need to install "vite"
```
npm install -g vite
```
### We can use "vite" to create a React app.
```
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
```
### In most cases, we need "axios" to send requests.
```
npm install axios
```

## How to create a backend server?
### Firstly, create a NodeJS application.
```
npm init
```
### For convenience, a "start" script is recommended.
Add the following line to "scripts" in package.json.
```
"start": "node index.js",
```
Now, we can start the server by ```npm start```.
### To automatically restart the server, we need "nodemon".
```
npm install --save-dev nodemon
```
Add the following line to "scripts" in package.json.
```
"dev": "nodemon index.js",
```
Now, we can start the server by ```npm run dev```.
### To get the requests, we need "express".
```
npm install express
```
### To avoid same origin policy, we need "cors"
```
npm install cors
```
