require('module-alias/register');
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '@routes/userRoutes';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoutes);
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
