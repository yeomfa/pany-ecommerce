# 🥖 Pany E-commerce Platform

Full-stack e-commerce application for artisanal bakery products featuring a modern UI, shopping cart functionality, and comprehensive admin dashboard.

## 🚀 Tech Stack

### Backend

- **Node.js** & **Express** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **JSend** - API response format
- **bcryptjs** - Password hashing

### Frontend

- **React 18** with **Vite** - Fast development
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Lucide React** - Icon library

## Features

- **Product Catalog** - Browse products with search and category filtering
- **Shopping Cart** - Add items with real-time stock validation
- **Authentication** - Secure user login and registration
- **Admin Dashboard** - Full CRUD operations for products and user management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Toast Notifications** - User-friendly feedback system
- **Custom Theme** - Beautiful color palette for bakery aesthetics
- **Search Functionality** - Find products quickly
- **Dashboard Overview** - Analytics and statistics for admins

## Prerequisites

- Node.js >= 18.0.0
- MongoDB installed and running or MongoDB Atlas
- npm or yarn package manager

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yeomfa/pany-ecommerce.git
cd pany-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pany-ecommerce
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Import sample data (optional)

```bash
npm run data:import --prefix backend
```

### 5. Run the application

```bash
# Run both backend and frontend concurrently
npm run dev
```
