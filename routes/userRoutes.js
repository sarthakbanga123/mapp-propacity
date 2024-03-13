const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const authController = require('../controllers/authController');
const middleware = require('../middleware/middleware')
const AWS = require('aws-sdk');
const S3 = new S3Client({ region: "us-east-1" });

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: "", //access key,
  secretAccessKey: "",//secret Access Key,
  region: '' 
});

// Configure multer to use S3 as storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'newbucketforuser',
    acl: 'public-read', // Set appropriate ACL
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + req.file); // Set unique file key
    },
  }),
});

router.get('/getUsers',middleware.authenticateToken ,usercontroller.getUsers);
router.get('/getDocuments', usercontroller.getDocuments);
router.post('/uploadDocument',middleware.authenticateToken,upload.single('file'),usercontroller.getDocuments)

router.get('/createuserfolder',middleware.authenticateToken ,usercontroller.createuserfolder);
router.get('/createUserSubFolder',middleware.authenticateToken ,usercontroller.createUserSubFolder);
module.exports = router;
