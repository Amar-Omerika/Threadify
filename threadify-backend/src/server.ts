require('module-alias/register');
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '@routes/userRoutes';
import topicRoutes from '@routes/topicRoutes';
import likeRoutes from '@routes/likeRoutes';
import commentRoutes from '@routes/commentRoutes';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoutes);
app.use('/topics', topicRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
