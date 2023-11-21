# Dream AI
<img src="./client/src/assets/logo.png" alt="logo" width="200"/> </br>
[Click here to see the deployed app](https://ai-dream.netlify.app/)

DreamScapeGenerator.com is a visionary platform where users can input dream descriptions to generate personalized, stunning dream images. Its user-friendly interface and customization options make it an engaging space to transform subconscious visions into captivating visuals, fostering a community of dream-inspired creativity.

# Frontend

This project's frontend handles the user interface and interactions for Dream AI. It is built using React and communicates with the backend API to manage users, posts, and AI-powered image generation.

## Features

- **User Interface**: Provides a user-friendly interface for interacting with the application.
- **User Authentication**: Supports user signup, login, and token-based authentication.
- **Post Management**: Enables users to create, view, and delete posts.
- **AI Image Generation**: Utilizes OpenAI to generate images based on prompts.

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /create-post - Create post page

## Pages

- Home Page
- Sign In Page
- Log In Page
- Create Post page

## Components

- Card
- FormField
- Loader

## Technologies Used

- React.js
- Tailwind

# Backend

The backend of Dream AI is responsible for managing data, user authentication, and providing API endpoints for the frontend. It's built using Node.js and interacts with a MongoDB database.

## Features

- **User Authentication**: Provides endpoints for user signup, login, and token verification.
- **Post Management**: Handles CRUD operations for posts.
- **Database Interactions**: Communicates with MongoDB using Mongoose.
- **External APIs Integration**: Utilizes OpenAI and Cloudinary for AI image generation and image hosting, respectively.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose



