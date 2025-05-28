# hueTV - Control your Hue lights from your TV!

https://github.com/user-attachments/assets/0d24711d-4403-4731-85c9-1156c94e2d59

# Welcome

Hi there, first of all, **thank you so much** for downloading my app!
The hueTV app was made for those who want to dim the living room lights just before start watching their favorite TV show and are too lazy to unlock their phone and open the (sometimes slow) lights app, or for those who just want to show off that they can control all the lights in their house using the TV remote.

## Motivation

Like mentioned above I was just curious to see if I could dim the lights in my apartment, just before pressing play in a movie or show from my recently bought Samsung TV and for my surprise there was no app available on the Samsung store. As a developer I decided to give it a try and see how difficult it would be to create and run a TV app by myself and after a couple of hours downloading SDKs and Simulators another side project was kicked off.

This means that it'll be forever free and there's no reason for it to collect analytics or any other private information from your TV, lights or house, in fact this app doesn't even connect to the internet, everything happens inside your private Wi-Fi network!

I hope it becomes useful and fun to use for you as it became to me.

## Running the app on your browser

In the project directory, run:

`npm install`

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for TV

1. build react app: `npm run build`

2. build react app as a Tizen app: `tizen build-web -- ./build`

3. create a WGT file (package) and passes `huetv` as the certificate name:

`cd build/.buildResult`

`tizen package -t wgt -s huetv -- ./`

### Install WGT on TV:

`tizen install -t TV_ID --name hueTV.wgt -- ./`

### Run app on TV:

`tizen run -t TV_ID -p ID.hueTV`

### Uninstall app from TV:

`tizen uninstall -t TV_ID -p ID.hueTV`

#### Known Issues

- Sometimes when coming from Onboarding, the app has no focus: neither the menu or home
