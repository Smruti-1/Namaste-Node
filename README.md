# Dev-Tinder
A developer-focused social platform to enable networking, skill discovery, and real-time collaboration opportunities.

## Project Status
This project is currently in development. The core user authentication and profile features are functional.  
New features like swipe connections, real-time chat, and notifications are under development.

## Features
- User authentication (JWT)
- Validation utilities
- MongoDB integration
- Modular project structure

## Current Features
- User registration and login
- Developer profiles with basic info
- Sending connection requests
- Accepting/rejecting connection requests

## Upcoming Features
- Swipe right/left developer connections (Tinder-style)
- Real-time chat using Socket.io
- Notifications for connection requests
- Profile customization (skills, experience)

## Project Structure
src/
├─ app.js
├─ routes/
├─ controllers/
├─ models/
└─ utils/

markdown
Copy code

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JavaScript

## How to Run
1. Clone the repo: `git clone https://github.com/Smruti-1/Dev-Tinder`
2. Install dependencies: `npm install`
3. Start the server: `node src/app.js`
4. Ensure MongoDB is running and configured

## Notes
- `node_modules` is ignored
- `.env` file can be used for sensitive keys