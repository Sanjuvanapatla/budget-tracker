const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth'); 


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI);

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRouter); // ✅


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
