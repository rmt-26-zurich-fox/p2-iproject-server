if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => { console.log(`Server is listening on http://localhost:${PORT}`) });