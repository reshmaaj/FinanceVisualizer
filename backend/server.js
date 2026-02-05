const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Expense = require("./models/Expense");
const Income = require("./models/Income");

require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// Test route
app.get("/", (req, res) => {
    res.send("Backend is working alright!");
});

// --------------------
// EXPENSE ROUTES
// --------------------
app.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post("/expenses", async (req, res) => {
    const expense = new Expense(req.body);
    await expense.save();
    const allExpenses = await Expense.find();
    res.json(allExpenses);
});

// DELETE expense
app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  await Expense.findByIdAndDelete(id);
  const allExpenses = await Expense.find();

  res.json(allExpenses);
});
// UPDATE expense
app.put("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  await Expense.findByIdAndUpdate(id, req.body);
  const allExpenses = await Expense.find();

  res.json(allExpenses);
});



// --------------------
// INCOME ROUTES
// --------------------
app.get("/income", async (req, res) => {
    const income = await Income.findOne();
    res.json(income);
});

app.post("/income", async (req, res) => {
    const { amount } = req.body;

    let income = await Income.findOne();

    if (income) {
        income.amount = amount;
        await income.save();
    } else {
        income = await Income.create({ amount });
    }

    res.json(income);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
