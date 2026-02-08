# 💰 Finance Visualizer (MERN Stack)

Finance Visualizer is a **personal finance tracking web application** I built while learning full-stack development using the **MERN stack**.  
The idea behind this project was to move beyond tutorials and actually build something that connects the frontend, backend, and database together in a meaningful way.

The app helps users understand where their money goes by turning raw numbers into **clear visual insights**.

---

## ✨ Features

- Enter and store **monthly income**
- Add and manage **expenses by category**
- View **total spending, balance, and savings**
- Interactive **charts and visual analytics**
- **Speedometer-style savings indicator** to show spending health
- Dynamic UI updates after calculation
- Clean dashboard layout with **Home & Insights pages**

---

## 🛠 Tech Stack

**Frontend**
- React.js
- JavaScript (ES6+)
- Chart libraries for data visualization
- Modern CSS styling

**Backend**
- Node.js
- Express.js
- RESTful APIs

**Database**
- MongoDB Atlas
- Mongoose

---

## 🔗 API Endpoints

### Income
- `GET /income` – Fetch stored income  
- `POST /income` – Add or update income  

### Expenses
- `GET /expenses` – Fetch all expenses  
- `POST /expenses` – Add a new expense  
- `PUT /expenses/:id` – Update an expense  
- `DELETE /expenses/:id` – Delete an expense  

---

## 🧠 What I Learned

- How **React communicates with a Node/Express backend**
- Connecting a frontend app to **MongoDB Atlas**
- Designing and consuming **REST APIs**
- Managing application state and dynamic UI updates
- Handling environment variables and backend configuration
- Debugging real-world full-stack issues
- Converting financial data into **useful visual insights**

This project gave me confidence in building a **complete MERN stack application from scratch**.

---

## ⚙️ Running the Project Locally

### Backend
```bash
cd backend
npm install
node server.js
