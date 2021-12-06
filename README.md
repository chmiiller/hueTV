# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Do:

- Hide menu *
- Add lamp cards on screen
- Scroll down through lamps
- Exit modal design

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Building for TV

build react app:   

`yarn build`

build react as tizen app:

`tizen build-web -- ./build`

create WGT file (package) and `huetv` is the certificate name:

`cd build/.buildResult`

`tizen package -t wgt -s huetv -- ./`

Install WGT on TV:

`tizen install -t QE50LS03TASXXN --name HueTV.wgt -- ./`

run app on TV:

`tizen run -t QE50LS03TASXXN -p a2cD2RV76B.HueTV`

uninstall app from TV:

`tizen uninstall -t QE50LS03TASXXN -p a2cD2RV76B.HueTV`
