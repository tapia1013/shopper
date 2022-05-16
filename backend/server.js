import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';


dotenv.config();

connectDB();

const app = express();


// app.use((req, res, next) => {
//   console.log('Hello');
//   // next is to move to the next peice of middleware
//   next()
// })


app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/products', productRoutes)

// Not Found
app.use(notFound)
// Error middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))