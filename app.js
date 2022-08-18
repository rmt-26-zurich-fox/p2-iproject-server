if (process.env.NODE_ENV != "production") {
    require('dotenv').config(); // Development
}

// import cors
const cors = require("cors");

// Require Package & Variables
const express = require("express");
const app = express();
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

// Import multer / Config Multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "images");
    },
    filename(req, file, cb) {
        cb(null, new Date().getTime() + "-" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Change port before deploy
const port = process.env.PORT || 3000;

// Middleware req.body
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Define route for heroku
app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'https://audio-id.herokuapp.com/',
            version: '0.1.0'
        }
    });
});

// Get Image after upload (Multer)
app.use(multer({storage: storage, fileFilter: fileFilter}).single("imageUrl"));
app.use("/images", express.static("images"));

// Routes
app.use(router);

// Middleware Error Handler
app.use(errorHandler);

// Listen
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});