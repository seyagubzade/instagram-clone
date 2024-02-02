const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://seyagubzade:seyagubzade123@cluster0.2wwolad.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log(`connected to db`)
})

app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));