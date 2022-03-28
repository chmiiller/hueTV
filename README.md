# Welcome to HueTV!

Hi there, first of all, **thank you so much** for downloading my app!
The HueTV app was made for those who want to dim the living room lights just before start watching their favorite TV show and are too lazy to unlock their phone and open the (sometimes slow) lights app, or for those who just want to show off that they can control all the lights in their house using the TV remote.

## Motivation

Like mentioned above I was just curious to see if I could dim the lights in my apartment, just before pressing play in a movie or show from my recently bought Samsung TV and for my surprise there was no app available on the Samsung store. As a developer I decided to give it a try and see how difficult it would be to create and run a TV app by myself and after a couple of hours downloading SDKs and Simulators another side project was kicked off.

This means that it'll be forever free and there's no reason for it to collect analytics or any other private information from your TV, lights or house, in fact this app doesn't even connect to the internet, everything happens inside your private Wi-Fi network!

I hope it becomes useful and fun to use for you as it became to me.

## The name is Carlos

I'm Carlos Zinato, software engineer living in The Netherlands and like every developer I have started 196 side projects on the last four months and this is the one that finally sees the light of day. I've been working as a software engineer for 12 years now, making mobile apps for iOS and Android and a little of web with ReactJS for the past three years.
If you like this app and it makes you happy please consider buying me a coffee. It will definitely motivate me to keep it up-to-date and adding more features!

**Buy me a coffee**

![Buy me a coffee](https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg)


## Open source

For those interested in how you can build and deploy an app to the Samsung TV and control your Philips Hue lights using JavaScript and ReactJS this project is available on GitHub as open source. There you can clone the project, learn how to run it locally, ask questions, give some feedback, open issues and of course - contribute!

 **GitHub Repository**
 
![GitHub Repository](https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg)

**important note:** this is an unofficial and independent app, with no affiliations with Philips Hue, Signify or Samsung.

## To Do:

- Onboarding
- Animation navigating between lights
- Settings layout
    - about (motivation, repo, who I am?)
    - Buy me a coffee
    - Platform and libraries
        - ReactJS: https://reactjs.org
        - Typescript: https://www.typescriptlang.org
        - React Router: https://reactrouter.com
        - MUI: https://mui.com
        - react-spatial-navigation by noriginmedia: https://github.com/NoriginMedia/react-spatial-navigation
    - Reset settings
    - Test settings
- Rasterize icons
- Update libs and react
- Blog post
    - How to install Samsung SDK
    - How to install Tizen SDK
    - Using React to build an web app: https://stackoverflow.com/a/59603438/1272263
    - Deploying to the TV
    - Spatial Navigation
- Documentation
- App Icon
- Store description

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

