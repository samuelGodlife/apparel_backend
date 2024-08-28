
module.exports = app =>
 {
 const mahasiswa = require("../controllers/mahasiswa.controller")
 const r = require("express").Router();

 r.get("/",mahasiswa.findAll);
 r.get("/:id",mahasiswa.show);
 r.post("/",mahasiswa.createUser);
 r.put("/:id",mahasiswa.update);
 r.delete("/:id",mahasiswa.delete);

 r.post("/login",mahasiswa.login);
 r.post("/register",mahasiswa.register);

 app.use("/user", r);

 //GET localhost:8000/mahasiswa
}