// const jsonServer = require('json-server')
// const multer  = require('multer')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// // Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

// // Add custom routes before JSON Server router
// /* server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// }) */

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images')
//     },
//     filename: function (req, file, cb) {
//       let date=new Date()
//       let url = date.getTime()+"_"+file.originalname
//       req.body.url=url
//       cb(null, url)
//     }
//   })

//   const bodyParser = multer({ storage: storage }).any()

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// server.use(bodyParser)
// server.post("/products",(req, res, next) => {
// let date = new Date()
// req.body.createdAt = date.toISOString()

// if(req.body.price){
//   req.body.price=Number(req.body.price)
// }

// let hasErrors = false
// let errors={}
// if(req.body.title.length<2){
//   hasErrors = true
//   errors.title="the title length should be at least 2 characters"
// }
// if(req.body.price.length<=0){
//   hasErrors = true
//   errors.price="the price is not valid"
// }

// if(hasErrors){
//   //return bad req 400 with validation errors
//   res.status(400).jsonp(errors)
//   return
// }
//   // Continue to JSON Server router
//   next()
// })

// // Use default router
// server.use(router)
// server.listen(4000, () => {
//   console.log('JSON Server is running')
// })

// server.js
require("dotenv").config();
const jsonServer = require("json-server");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// إعداد التخزين السحابي
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "courses",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => {
      const originalName = file.originalname.split(".").slice(0, -1).join(".");
      return `${Date.now()}_${originalName}`;
    },
  },
});

const bodyParser = multer({ storage: storage }).any();

// استخدام الـ middlewares
server.use(middlewares);
server.use(bodyParser);

// POST route
server.post("/products", (req, res, next) => {
  const date = new Date();
  req.body.createdAt = date.toISOString();

  if (req.files && req.files.length > 0) {
    req.body.url = req.files[0].path;
  }

  if (req.body.price) {
    req.body.price = Number(req.body.price);
  }

  let hasErrors = false;
  let errors = {};

  if (!req.body.title || req.body.title.length < 2) {
    hasErrors = true;
    errors.title = "The title length should be at least 2 characters";
  }

  if (!req.body.price || req.body.price <= 0) {
    hasErrors = true;
    errors.price = "The price is not valid";
  }

  if (hasErrors) {
    return res.status(400).jsonp(errors);
  }

  next();
});

// Middleware لـ تعديل المنتج + حذف الصورة القديمة
server.use(["/products/:id"], async (req, res, next) => {
  if (req.method === "PATCH" || req.method === "PUT") {
    const productId = parseInt(req.params.id);
    const db = router.db;
    const product = db.get("products").find({ id: productId }).value();

    if (!product) {
      return res.status(404).jsonp({ error: "Product not found" });
    }

    if (req.files && req.files.length > 0) {
      try {
        const oldImageUrl = product.url;
        const urlParts = oldImageUrl.split("/");
        const folder = urlParts[urlParts.length - 2];
        const filenameWithExt = urlParts[urlParts.length - 1];
        const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

        console.log("📛 Public ID المحسوب:", publicId);
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("✅ نتيجة الحذف من Cloudinary:", result);
      } catch (err) {
        console.error("❌ Error deleting old image from Cloudinary:", err);
      }

      req.body.url = req.files[0].path;
    }

    if (req.body.price) {
      req.body.price = Number(req.body.price);
    }
  }

  next();
});

// ✅ Middleware لحذف صورة Cloudinary لما يتم حذف المنتج
server.delete("/products/:id", async (req, res, next) => {
  const productId = parseInt(req.params.id);
  const db = router.db;
  const product = db.get("products").find({ id: productId }).value();

  if (product && product.url) {
    try {
      const oldImageUrl = product.url;
      const urlParts = oldImageUrl.split("/");
      const folder = urlParts[urlParts.length - 2];
      const filenameWithExt = urlParts[urlParts.length - 1];
      const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

      console.log("🗑️ Public ID المراد حذفه:", publicId);
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("✅ صورة محذوفة من Cloudinary:", result);
    } catch (err) {
      console.error("❌ خطأ أثناء حذف الصورة من Cloudinary:", err);
    }
  }

  next();
});

// استخدام الراوتر
server.use(router);

// تشغيل السيرفر
server.listen(4000, () => {
  console.log("✅ JSON Server with Cloudinary is running on port 4000");
});
