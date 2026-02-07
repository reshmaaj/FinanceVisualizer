const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Expense = require("./models/Expense");
// const Income = require("./models/Income");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// EXPENSE ROUTES
app.get("/expenses", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post("/expenses", async (req, res) => {
    const expense = await Expense.create(req.body);
    res.json(expense);
});

app.put("/expenses/:id", async (req, res) => {
    const updated = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

app.delete("/expenses/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
});

// INCOME ROUTES
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
