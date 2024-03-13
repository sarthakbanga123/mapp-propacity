const express = require('express');
const app = express();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const AWS = require('aws-sdk');
const S3 = new S3Client({ region: "us-east-1" });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authroutes');
const userRoutes  = require('./routes/userRoutes');


app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user', userRoutes);





const IP_ADDRESS = '192.168.1.8'; // Specify your IP address here
const PORT = 3000; // Or any port you prefer



app.listen(PORT, () => {
  console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
});
