# 🛒 E-Commerce Web Application (MERN Stack)

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</div>

<div align="center">
  <h3>Full-Stack E-Commerce Platform with Modern Web Technologies</h3>
  <p><strong>Duration:</strong> Feb 2025 - Jun 2025 | <strong>Stack:</strong> MERN + Firebase</p>
</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## 🎯 Overview

A modern, responsive e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, and a seamless shopping experience.

### Key Highlights
- 🚀 **Full-Stack Development** with modern web technologies
- 🔐 **Secure Authentication** using Firebase Auth and Express sessions
- 📱 **Responsive Design** with Bootstrap for all devices
- 🛍️ **Complete CRUD Operations** for product management
- 📁 **File Upload System** with Multer integration
- 🎨 **Modern UI/UX** with intuitive user interface

## ✨ Features

### 🔐 Authentication & Security
- User registration and login with Firebase Auth
- Express.js session management
- Protected routes and middleware
- Password encryption and validation

### 🛍️ Product Management
- **Create** new products with image upload
- **Read** product listings with search and filtering
- **Update** product information and inventory
- **Delete** products with confirmation

### 🎨 User Interface
- Responsive design for mobile, tablet, and desktop
- Bootstrap components for consistent styling
- Interactive product cards and navigation
- Loading states and error handling

### 📁 File Management
- Image upload functionality with Multer
- File validation and size limits
- Image optimization and storage
- Multiple file format support

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface and component management
- **Bootstrap** - Responsive design and styling
- **JavaScript (ES6+)** - Modern JavaScript features
- **HTML5/CSS3** - Semantic markup and styling

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling

### Authentication & Services
- **Firebase Auth** - User authentication service
- **Multer** - File upload middleware
- **Express Sessions** - Session management
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **VS Code** - Development environment

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React.js)    │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • Components    │    │ • REST APIs     │    │ • Products      │
│ • State Mgmt    │    │ • Middleware    │    │ • Users         │
│ • Routing       │    │ • Auth          │    │ • Sessions      │
│ • UI/UX         │    │ • File Upload   │    │ • File Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Firebase project setup
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AsierCardoso/tienda-dawe-react.git
   cd tienda-dawe-react
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Backend .env file
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   SESSION_SECRET=your_session_secret
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend (in new terminal)
   cd frontend
   npm start
   ```

## 📖 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Browse Products** - View available products with search and filters
3. **Product Details** - Click on products for detailed information
4. **Shopping Cart** - Add items to cart and proceed to checkout

### For Administrators
1. **Product Management** - Add, edit, or delete products
2. **Image Upload** - Upload product images with validation
3. **Inventory Control** - Manage stock levels and product information
4. **User Management** - View and manage user accounts

## 📚 API Documentation

### Authentication Endpoints
```javascript
POST /api/auth/register    // User registration
POST /api/auth/login       // User login
POST /api/auth/logout      // User logout
GET  /api/auth/profile     // Get user profile
```

### Product Endpoints
```javascript
GET    /api/products       // Get all products
GET    /api/products/:id   // Get product by ID
POST   /api/products       // Create new product
PUT    /api/products/:id   // Update product
DELETE /api/products/:id   // Delete product
```

### File Upload Endpoints
```javascript
POST /api/upload           // Upload product images
GET  /api/upload/:filename // Get uploaded file
```

## 📱 Screenshots

<div align="center">
  <img src="screenshots/homepage.png" alt="Homepage" width="300" />
  <img src="screenshots/products.png" alt="Products" width="300" />
  <img src="screenshots/product-detail.png" alt="Product Detail" width="300" />
</div>

## 🎯 Key Learning Outcomes

- **Full-Stack Development** - End-to-end web application development
- **Database Design** - MongoDB schema design and optimization
- **API Development** - RESTful API design and implementation
- **Authentication** - Secure user authentication and session management
- **File Handling** - Image upload and file management systems
- **Responsive Design** - Mobile-first approach with Bootstrap
- **State Management** - React state management and data flow
- **Error Handling** - Comprehensive error handling and validation

## 🔧 Development Process

1. **Planning & Design** - Wireframes and database schema
2. **Backend Development** - API endpoints and database integration
3. **Frontend Development** - React components and user interface
4. **Authentication** - Firebase integration and session management
5. **File Upload** - Multer implementation and image handling
6. **Testing & Debugging** - Comprehensive testing and bug fixes
7. **Deployment** - Production deployment and optimization

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Advanced search and filtering
- [ ] User reviews and ratings
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author

**Asier Cardoso**
- GitHub: [@AsierCardoso](https://github.com/AsierCardoso)
- LinkedIn: [asiercardoso](https://linkedin.com/in/asiercardoso)
- Email: asiercmonasterio@gmail.com

---

<div align="center">
  <p>Built with ❤️ using the MERN Stack</p>
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>
