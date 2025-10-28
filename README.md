🍔 Eat Express

Eat Express is a full-stack food delivery web application that connects users, restaurant owners, and delivery partners on one platform.
Users can sign up via Google or Email, browse nearby restaurants, order food, and track their delivery in real time.
Restaurant owners can manage incoming orders, update their preparation status, and notify delivery boys to pick up ready orders.

🚀 Features
👤 Authentication

Sign up or log in using Google or Email.

Role-based login system:

User – Can browse restaurants and order food.

Restaurant Owner – Can manage menu items and handle orders.

Delivery Boy – Can accept and deliver orders.

🍱 User Features

View restaurants and food items nearby.

Add items to cart and place orders.

Track the delivery status of their orders in real time.

Secure authentication via Google or Email.

🏨 Restaurant Owner Features

Add and manage food items on their menu.

Receive new orders in real time.

Update order status to “Prepared” when ready.

Notify available delivery boys automatically.

🚴 Delivery Boy Features

View all prepared orders available for pickup.

Accept orders and start delivery.

Update status during delivery (e.g. “Picked Up”, “Delivered”).

Real-time order tracking for users.

🧩 Tech Stack
🖥️ Frontend

Next.js / React.js

Tailwind CSS for styling

Context API / Redux for state management

⚙️ Backend

Node.js with Express.js

MongoDB + Mongoose for database

Zod for schema validation

JWT Authentication

Socket.io for real-time order updates and delivery tracking

☁️ Deployment

Frontend: Vercel

Backend: Render / Railway

Database: MongoDB Atlas

🧾 Installation & Setup

Clone the repository

git clone https://github.com/kunalnishanttyagi/EatExpressN.git


Navigate to the project directory

cd EatExpressN


Install dependencies

npm install


or if the project has separate folders:

cd backend && npm install
cd ../frontend && npm install


Set up environment variables
Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


Run the project

Backend:

npm run dev


Frontend:

npm run dev


Visit http://localhost:3000
 to view the app.

📦 Folder Structure
EatExpressN/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   └── styles/
└── README.md

🔒 Roles Overview
Role	Description
User	Orders food and tracks delivery
Restaurant Owner	Manages food menu and updates order status
Delivery Boy	Accepts and delivers orders
🧠 Future Enhancements

Payment gateway integration (e.g., Razorpay / Stripe)

Push notifications for order updates

Real-time map tracking for delivery

Admin dashboard for analytics and platform management

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.
