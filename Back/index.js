const express = require('express');
const notFound = require('./Middleware/notFound');
const errorHandler = require('./Middleware/errorHandler');
const UserRoute = require('./Routes/Route');
const JobRoute = require('./Routes/Job');
const ApplyRoute = require('./Routes/Apply');
const connectDB = require('./ConnectData/ConnectDB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleRoute = require('./Routes/GoogleRoute');
require('dotenv').config();
const path = require('path');

const app = express();

// CORS configuration
app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"], credentials: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update with your frontend URL
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });
// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/job", UserRoute);
app.use("/employee", JobRoute);
app.use("/apply", ApplyRoute);


app.use(GoogleRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 8920;

const startApp = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();
