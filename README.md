# SoundShare - Frontend (peacock) Prototype

This is the SoundShare - Frontend, codename "peacock".

Its a simple POC-state react app to upload audio files and then share them publicly by creating a public link that can be then accessed to listen to the audio and collaborate. Further progression would go towards being able to upload multiple files, generating different kind of privileged links and being able to add comments to specific timestamps on the share files.

The application is implemented in typescript/react using nextjs and tailwindcss.

## Getting Started

This app will only work in conjunction with the a backend process to store and host uploaded files.
For this we developed the ["squirrel - share-backend-api"](https://github.com/dschila/squirrel).

### Prerequisites

-   make sure the **"squirrel - share-backend-api"** is running properly
-   make sure node.js (> 14.17) is present on your system
-   make sure yarn is installed. Otherwise install it using `npm install --global yarn`

### Setup Steps

1. install all dependencies by running `yarn install`

2. setup local environment by creating .env file by copying `.env.sample`, renaming it to `.env` and update content addresses accordingly

3. run server

    - to run development server run `yarn dev`

    - or for production build run `yarn build` and `yarn start`

4. open <http://localhost:6969> with your browser to see the result
