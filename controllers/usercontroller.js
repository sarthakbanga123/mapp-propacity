const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

async function getUsers(req, res) {
  console.log('userdata', req.user)
  try {
    const result = await pool.query('SELECT * FROM users', []);
    const user = result.rows;
    res.json({ user });
  } catch (error) {
    console.error('Error during getusers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



async function getDocuments(req, res) {
  try {
    const result = await pool.query('SELECT * FROM userdocuments', []);
    const user = result.rows;
    res.json({ user });
  } catch (error) {
    console.error('Error during getDocuments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createFolder(folderName) {
  const s3Params = {
    Bucket: bucketName,
    Key: folderName + '/', 
    ACL: 'public-read' // Set appropriate ACL
  };

  try {
    const data = await s3.putObject(s3Params).promise();
    console.log('Folder created successfully:', data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error creating folder:', error);

    return null;
  }
}



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

// Upload endpoint
async function uploadDocument(req, res)  {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Create parameters object for S3 upload
  const params = {
    Bucket: 'my-new-bucket-all',
    Key: file.key, 
    ACL: 'public-read', // Set appropriate ACL
  };

  // Upload file to S3 bucket
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file to S3:', err);
      return res.status(500).json({ error: 'Error uploading file to S3' });
    } else {
      console.log('File uploaded successfully:', data.Location);
      return res.status(200).json({ imageUrl: data.Location });
    }
  });
};
async function createuserfolder(req, res) {
  const { foldername } = req.body;
  const userid = req.user.id;
  const result = await pool.query('SELECT * FROM folders where foldername = $1 AND userid =$2', [foldername,userid]);
  const folders = result.rows;
  if(folders.length){
    res.status(400).json({ message: 'foldername already exits' });
  }
  const res=await createFolder(foldername);
  try {
    const result = await pool.query('INSERT INTO folders ( foldername, userid, location) VALUES ($1, $2,$3)',[foldername,userid,location]);

    res.json({ message: 'success'});
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ message: 'some error occured' });
  }
}
async function createUserSubFolder(req, res) {
  const { foldername,folderid } = req.body;
  const userid = req.user.id;
  const result = await pool.query('SELECT * FROM folders where foldername = $1 AND userid =$2', [foldername,userid]);
  const folders = result.rows;
  if(folders.length){
    res.status(400).json({ message: 'foldername already exits' });
  }
  const res=await createFolder(foldername);
  try {
    const result = await pool.query('INSERT INTO subfolders ( foldername, userid, location,folderid) VALUES ($1, $2,$3,$4)',[foldername,userid,location,folderid]);

    res.json({ message: 'success'});
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ message: 'some error occured' });
  }
}


module.exports = { getUsers, getDocuments , uploadDocument , createuserfolder };
