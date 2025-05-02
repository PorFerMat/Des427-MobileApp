import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api', userRoutes); // endpoint = /api/signup

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

export default app;