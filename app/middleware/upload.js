const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    },
    onError: function(err, next){
        console.log("error:" , err)
    },
    function(req, res) {
        res.status(204).end();
      }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        callback(null, true)
    /*     if(
            file.mimeType == "image/png" ||
            file.mimeType == "image/jpg" ||
            file.mimeType == "image/jpeg"
        ){
            callback(null, true)
        }else{
            console.log("Only jpg, jpeg & png file supperted!")
            callback(null, false)
        } */
        
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload