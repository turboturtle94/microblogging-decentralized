
## Overview
The microblogger is your place for freedom of thought powered by Web3

## Setup Instructions
- The Project has 3 important blocks. Please run the project only once all the blocks are setup.

### Frontend
- Once cloning of the repo is done, cd to frontend. 
- Run npm i
- Create a .env file under root folder and add the variables provided as part of .env.example, under "Frontend Configuration" section. You can either use the existing project id or generate a new one following the section mentioned below.
- run npm run dev to start frontend server

#### 🔑 WalletConnect Project ID
This app uses WalletConnect via RainbowKit/Wagmi. To use it:
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up and create a project to get your `Project ID`


### Backend
- cd to backend folder
- run npm i
- Add env variables mentioned under "Database Configuration"
- run npm run migration:generate
- run npm run migration:run
- run npm run start:dev to start backend server

### Hardhat
- cd to hardhat-network folder
- run npm i
- Add env variables mentioned under Hardhat Configuration. This is a test account created for development purposes. Feel free to use the same phrase
- run npx hardhat node to start hardhat server


## How to use the application
- As soon as you complete the setup mentioned above and hit http://localhost:3000, you will redirected to a login page
- Here there is a connect button, clicking which will prompt you for wallet providerd
- Select a wallet provider, once done, you will be seeing a button to provide a signature
- Once signature is confirmed from your wallet provider and successfully verifed, you will seeing the feed from all the users
- To visit and edit your profile, hit http://localhost:3000/profile
- You can also visit a specific post to comment on it and see other comments

## list of technologies used
Coding - NextJs, NestJs, RainbowKit, Ether, Hardhat, MaterialUI, Tailwind
AI - ChatGpt

## Features
- Ethereum Wallet Login
- Profile Creation and Editing capabilities
- Posting and Commenting on available posts

## Screenshots and Demo video links




