const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema
const ExpenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

// ✅ POST route to add expense
router.post('/add', async (req, res) => {
  const { category, amount } = req.body;
  try {
    const newExpense = new Expense({ category, amount });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// ✅ GET route to fetch summary
router.get('/summary', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const summary = {};
    let total = 0;

    expenses.forEach(exp => {
      summary[exp.category] = (summary[exp.category] || 0) + exp.amount;
      total += exp.amount;
    });

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const perDay = ((10000 - total) / lastDay).toFixed(2); // Assume 10K budget

    res.json({
      summary,
      total,
      remaining: 10000 - total,
      perDay,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
