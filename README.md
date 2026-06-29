# CollegeNet 🎓
A full-stack MERN application designed for college communities to report lost & found items, buy/sell/trade products, post wanted requests, and communicate through real-time messaging.
CollegeNet helps students recover lost belongings, discover items available within their campus, and connect with peers through a secure and user-friendly platform.
---
## 🌐 Live Demo
**Frontend URL:https://college-net-web.vercel.app/

**Backend API:https://collegenet-web.onrender.com
---
## 📋 Features
### 🔐 User Authentication
Screenshot : 
<img width="1440" height="1440" alt="WhatsApp Image 2026-06-29 at 14 58 33" src="https://github.com/user-attachments/assets/8ad5a4c4-904a-4798-bdfd-71baff27af75" />

* Email-based registration and login
* Email verification
* Password reset functionality
* Secure JWT authentication
### 🔍 Lost & Found System
* Report lost items
* Report found items
* Upload multiple images
* Add detailed descriptions and locations
* Claim and verification workflow
### 💰 Item Trading
* Buy, sell, or trade items within the college community
* Upload item images
* Set pricing and item conditions
* Contact sellers directly
### 🎯 Wanted Posts
* Post requests for items you're searching for
* Specify budget and requirements
* Receive responses from interested users
### 💬 Real-Time Messaging
* Instant user-to-user chat
* Persistent conversation history
* Socket.io-powered messaging
* Message notifications
### 👤 User Profiles
* Manage personal information
* View active listings
* Track posts and interactions
### 🔔 Notifications
* New messages
* Item claim updates
* Lost & found activity alerts
---
## 🛠️ Tech Stack
### Frontend
* React 19
* Vite
* Tailwind CSS
* React Router
* Axios
* Socket.io Client
* React Toastify
* Lucide React
### Backend
* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT Authentication
* Bcryptjs
* Nodemailer
* ImageKit
* Multer
* CORS
* Dotenv
---
## 📁 Project Structure
```text
collegenet/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── socket.js
│   └── vite.config.js
│
└── README.md
```
---
## 🚀 Getting Started
### Prerequisites
Before running the project, ensure you have:
* Node.js (v16 or higher)
* npm or yarn
* MongoDB Atlas or local MongoDB
* ImageKit account
* Email service credentials
---
## ⚙️ Environment Variables
Create a `.env` file inside the backend directory.
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
CLIENT_URL=http://localhost:5173
```
---
## 📦 Installation
### Clone Repository
```bash
git clone https://github.com/bhukya-mahesh/CollegeNet-Web

cd collegenet
```
### Backend Setup
```bash
cd backend
npm install
npm run server
```
### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
---
## 💬 Real-Time Features
The application uses Socket.io to provide:
* Real-time messaging
* Instant notifications
* Live item status updates
* Seamless user communication
---
## 📝 Core Modules
### Lost & Found
* Multiple image uploads
* Item descriptions
* Location tracking
* Date information
* Claim verification workflow
### Item Trading
* Product listings
* Pricing information
* Image gallery
* Seller communication
* Listing management
### Wanted Posts
* Requirement specifications
* Budget range
* Matching opportunities
* Direct messaging
### Messaging System
* Instant delivery
* Persistent chat history
* Notification support
* Real-time communication
---
## 🔐 Security Features
* JWT-based authentication
* Password hashing with Bcryptjs
* Email verification
* Protected API routes
* Secure environment variables
* CORS protection
---
## ⭐ Technical Highlights
* Built a complete MERN stack application from scratch.
* Implemented real-time communication using Socket.io.
* Integrated ImageKit for cloud image storage and optimization.
* Designed RESTful APIs using Express and MongoDB.
* Added authentication, authorization, and email verification workflows.
* Developed responsive user interfaces using React and Tailwind CSS.
---
## 📦 Available Scripts
### Backend
```bash
npm start
npm run server
```
### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```
---
## 🚀 Future Improvements
* AI-powered lost item matching
* Push notifications
* Advanced search and filters
* Admin dashboard
* College verification system
* Mobile application
---
## 🤝 Contributing
Contributions are welcome.
1. Fork the repository
2. Create a new feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m "Add Amazing Feature"
```
4. Push the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request
---
## 📄 License
This project is licensed under the ISC License.
---
## 🙋 Support
For issues, suggestions, or feature requests, please open an issue in the repository.
---
## 🎓 Developed For
CollegeNet was developed to help college communities efficiently manage lost & found items, facilitate peer-to-peer trading, and enable real-time communication between students.
