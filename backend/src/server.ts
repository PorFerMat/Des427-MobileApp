import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api', userRoutes); // endpoint = /api/signup

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server running on port ${PORT}');
});

export default app;