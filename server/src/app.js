const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const cors = require('cors');

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors);

connectDB();


const authRoutes = require('./routes/authRoutes')
app.use('/api/auth',authRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack); 

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message: message
  });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
