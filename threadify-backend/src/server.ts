require('module-alias/register');
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '@routes/userRoutes';
import topicRoutes from '@routes/topicRoutes';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoutes);
app.use('/topics', topicRoutes);

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
