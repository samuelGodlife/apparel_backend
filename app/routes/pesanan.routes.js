module.exports = (app) => {
    const pesanan = require("../controllers/pesanan.controller");
    const r = require("express").Router();
  
    r.get("/", pesanan.findAll);
    r.get("/:username", pesanan.getID);
    r.get("/:id", pesanan.show);
    r.post("/", pesanan.createUser);
    r.put("/:id", pesanan.update);
    r.delete("/:id", pesanan.delete);
  
    app.use("/pesanan", r);
  
    //GET localhost:8000/mahasiswa
  };