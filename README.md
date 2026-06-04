## InterviewIQ – AI Powered Mock Interview & Resume Analysis Platform

## About

InterviewIQ is a full stack AI-powered interview preparation platform built using the MERN stack (MongoDB, Express, React, Node.js) and Generative AI.

This project was built as a real-world full stack learning project to understand how modern AI-assisted career preparation platforms work — from user authentication and interview management to AI-generated feedback and resume analysis.

Users can register and login securely, generate role-based mock interview questions, submit answers, receive AI-powered performance feedback, track interview history, analyze resumes, and monitor overall interview preparation progress through a personalized dashboard.

The project demonstrates a complete end-to-end workflow including frontend UI development, backend API architecture, database management, authentication, AI integration, analytics tracking, and cloud deployment.

## ⚠️ Note: This project is actively being improved. Additional interview features, analytics enhancements, and resume evaluation improvements are planned for future updates.

## Features

* User Registration & Login
* JWT-based Authentication
* Protected Routes
* AI-Powered Mock Interviews
* Role-Based Interview Question Generation
* Technical Interview Practice
* Personalized Interview Sessions
* AI Generated Feedback
* Strength Analysis
* Weakness Analysis
* Improvement Suggestions
* Interview History Tracking
* Performance Dashboard
* Interview Analytics
* Resume Upload Functionality
* AI Resume Analysis
* ATS-Style Resume Evaluation
* Missing Skills Detection
* Resume Improvement Suggestions
* Responsive UI
* Modern SaaS-style Design
* Backend + Frontend Deployed Successfully

## Project Structure / Components

* Backend (Node.js + Express)

* server.js: backend entry point

* config/db.js: MongoDB connection

* routes/authRoutes.js

* routes/interviewRoutes.js

* routes/resumeRoutes.js

* controllers/: business logic layer

* models/User.js

* models/Interview.js

* middleware/authMiddleware.js

* AI integration services

* JWT authentication handling

* Frontend (React + Vite)

* App.jsx: route management

* main.jsx: frontend entry

* pages/Home.jsx

* pages/Login.jsx

* pages/Register.jsx

* pages/Dashboard.jsx

* pages/Interview.jsx

* pages/InterviewHistory.jsx

* pages/ResumeAnalyzer.jsx

* components/Navbar.jsx

* components/Footer.jsx

* components/ProtectedRoute.jsx

* components/InterviewCard.jsx

* context/AuthContext.jsx

* services/api.js

## Technologies Used

* MongoDB Atlas (Database)
* Express.js (Backend Framework)
* React.js (Frontend Library)
* Node.js (Runtime Environment)
* Mongoose (ODM)

## Authentication & Security

* JWT Authentication
* Protected Routes
* Password Hashing
* Environment Variables

## AI & Frontend Technologies

* Groq API / Generative AI
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React Icons
* Vite

## Deployment

* Render (Backend Deployment)
* Vercel (Frontend Deployment)

## Screenshots

### Landing Page

![Landing Page](./frontend/assests/landingpage.png)

### Interview Dashboard

![Interview Dashboard](./frontend/assests/dashboard.png)

### Analytics section

![Mock Interview](./frontend/assests/analytics.png)

### Resume Analyzer

![Resume Analyzer](./frontend/assests/resume.png)

## Learning Outcome

* Building a production-style MERN application
* Designing REST APIs
* JWT authentication and route protection
* AI integration in web applications
* Managing application state
* Connecting frontend with backend services
* Working with MongoDB Atlas
* Resume analysis workflows
* Building interview preparation systems
* Cloud deployment using Render and Vercel
* Environment variable management
* Debugging real-world deployment issues
* Handling API integrations
* Improving frontend architecture and UI design

## Challenges Faced

One major challenge during development was integrating AI services into a full stack application while maintaining a smooth user experience.

Several issues were encountered involving:

* AI response formatting
* API integration debugging
* Authentication flow management
* Deployment configuration
* Environment variable handling
* Frontend and backend communication
* Database connectivity during deployment

Solving these challenges provided valuable experience in building and deploying modern AI-powered applications.

## Known Limitations

The project is fully functional, but some improvements are still in progress:

* AI responses may occasionally vary in quality
* Resume analysis can be further enhanced
* Backend may take time on first load because Render free tier sleeps
* Additional analytics visualizations are planned
* Minor UI polish is still ongoing
* Performance optimization is planned for future updates

These areas are currently being improved.

## Future Development

Planned future upgrades include:

* Voice-based mock interviews
* Real-time interview simulation
* Advanced interview analytics
* Interview score visualization charts
* More detailed AI feedback
* Multiple interview categories
* Resume scoring system
* Resume keyword optimization suggestions
* AI-generated interview roadmap
* User profile management
* Dark mode support
* Better mobile experience
* Enhanced UI/UX
* Smoother animations and transitions
* Performance optimization
* Custom domain setup
* Production-grade scalability improvements

## Notes

This is a real-world learning-focused MERN + AI project.

* Backend deployed on Render
* Frontend deployed on Vercel
* MongoDB Atlas used for database management
* Environment variables used for secure configuration
* AI integration implemented using Groq API
* Development is ongoing and improvements will continue

## Live Demo

Frontend: https://interview-iq-rouge.vercel.app/

Backend API: https://interviewiq-3fs8.onrender.com

## Status

Project Status: Active Development

Core functionality is complete.

The application is fully usable and deployed, with future enhancements planned to improve AI capabilities, performance, scalability, and overall production readiness.
