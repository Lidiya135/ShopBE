// const { diskStorage } = require('multer');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./upload")
    },
    filename: function (req,file,cb){
        const uniq = Date.now() + Math.round(Math.random() * 1e9)
        cb(null,file.fieldname+'-'+uniq+'.png')
    }
})

const upload = multer({storage})

module.exports = upload