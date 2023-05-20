const path = require("path");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photoSave/");
  },

  filename: function (req, file, cb) {
    const description = req.params.nic;
    let ext = path.extname(file.originalname);
    cb(null, description + ext);
  },
});

var upload = multer({
  storage: storage,

  fileFilter: function (req, file, callback) {
    // if(
    //     file.mimetype=="image/png"||
    //     file.mimetype=="image/jpg"
    // ){

    callback(null, true); // } // else{ //     console.log("only jpg png can supported") //     callback(null,false) // }
  }, // limits:{ //     fileSize:100000 // }
});

module.exports = upload;