const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());

app.use('/api', userRoutes); // For registration and login
app.use('/api', authMiddleware, contactRoutes); // Contacts are protected

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
