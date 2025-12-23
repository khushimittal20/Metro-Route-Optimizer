# 🚇 Metro Route Optimizer

**Live Demo:** [Frontend on Vercel](https://metro-route-optimizer-rho.vercel.app/)  
**Backend API:** [Render](https://metro-route-optimizer.onrender.com/)  

A **full-stack web application** to optimize metro routes between stations. Built with **React**, **Node.js**, **Express**, and **MongoDB Atlas**, this project allows users to calculate the fastest or shortest route across a metro network.

---

## Features

- Interactive frontend for selecting source and destination stations  
- Real-time route calculation via backend API  
- Full CRUD support for metro stations and connections via seed data  
- Mobile-friendly, responsive UI  
- Live deployment: frontend on **Vercel**, backend on **Render**  

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, CSS, Fetch API |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend), Render (backend) |
| Environment Variables | `.env` with `MONGO_URI` and `PORT` |

---

## Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/khushimittal20/Metro-Route-Optimizer.git
cd Metro-Route-Optimizer
```
### 2. Backend Setup
```bash
cd backend
npm install
```
### 3. Create .env file and seed tha database
```bash
MONGO_URI=<Your MongoDB Atlas URI>
PORT=5000
node src/config/seed.js
```
### 4. Run the backend
```bash
node src/server.js
```
### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
---

## Usage
- Select source and destination stations
- Click Get Route
- The optimized route will appear with travel details
- On live deployment, use the Vercel frontend which connects to the Render backend automatically.

---

## Future Enhancements
- Implement route visualization on a map
- Add user authentication for saved routes
- Include real-time train schedules
- Improve UI/UX
  
---

## Author
Khushi Mittal
