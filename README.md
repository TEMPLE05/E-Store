# E-Store 🛒

A full-featured E-Commerce web application built with React, Node.js, Express, and MongoDB. Based on a tutorial by [GreatStack](https://www.youtube.com/@GreatStack), this project was extended with improved UI, added features, and custom functionality on both the frontend and backend.

## ✨ Features

- 🛍️ Product listing & filtering
- 🛒 Cart with quantity controls and checkout flow
- 🔐 User authentication & protected routes
- 🧾 Order placement and history
- 📦 Admin panel for product management (in progress)
- ⚡ Fast performance with Vite + TailwindCSS

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)

**Others:**
- Git & GitHub
- Postman for testing APIs

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB running locally or on Atlas

### 1. Clone the repository

```bash
git clone https://github.com/TEMPLE05/E-Store.git
cd E-Store

2. Install dependencies
For each folder (my-ecommerce-store, backend, admin):

bash
Copy code
cd folder-name
npm install
3. Run frontend & backend
bash
Copy code
# In one terminal
cd backend
npm run dev

# In another terminal
cd my-ecommerce-store
npm run dev
4. Environment Variables
Create .env files where needed (especially in backend) with the required MongoDB URI, port numbers, etc.
