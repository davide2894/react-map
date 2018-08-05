# React Map

## What is this?  
It's a web application that shows the Bologna area (Italy) and highlights my favourite locations there.

## Technologies used
* Vanilla JavaScript
* ReactJS
* CSS
* JSX
* Yarn package manager
* [Google Maps API](https://cloud.google.com/maps-platform/)
* [google-maps-react](https://github.com/fullstackreact/google-maps-react): a React librarary to use Google Maps API 
* [Four Square Places API](https://developer.foursquare.com/places-api)

## Start the project
To start developing:
* download the repository
* `yarn install`
* `yarn start`

## Offline usage
This web application uses React's Service Worker, a tool that stores all content in cache. This allows you to use this app always, whatever is your connection status.

To mak it work, run a production build (see below).

## Build
To run the build (production) version, just run `yarn build` on your terminal.

## License
This repository uses the MIT License.