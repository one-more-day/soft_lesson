const multer = require("multer");
const path = require("path");
exports.storage = multer.diskStorage({
  //设置文件存储路径
  destination: (req, file, cb) => {
    cb(null, "public"); // 相对于app.js文件路径
  },
  //设置文件存储名称
  filename: (req, file, cb) => {
    
    let extname = path.extname(file.originalname); // 截取文件后缀名
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});
exports.port = 8888;
