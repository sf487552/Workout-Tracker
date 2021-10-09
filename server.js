const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000 ;

// Create express server
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Routes
app.use(require("./routes/html-routes"));
app.use(require("./routes/api-routes"));

// Start Server
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}`);

});