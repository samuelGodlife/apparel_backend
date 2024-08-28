
module.exports = app =>
 {
 const produk = require("../controllers/produk.controller")
 const r = require("express").Router();
 const uploadConfig = require("../../uploadConfig");
 const fields = uploadConfig.upload.fields([
     {
       name: "gambar",
       maxCount: 1,
     },
   ]);
 r.get("/", produk.findAll);
 r.get("/:id",produk.show);
 r.post("/",fields,produk.createUser);
 r.put("/:id",produk.update);
 r.delete("/:id",produk.delete);

 app.use("/produk", r);

 //GET localhost:8000/mahasiswa
}