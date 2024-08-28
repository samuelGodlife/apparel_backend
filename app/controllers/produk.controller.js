const db = require("../models")
const Produk = db.produk
const bcrypt = require('bcrypt');



exports.createUser= async (req, res) => {
    try {
        const { nama_produk, harga_produk, keterangan } = JSON.parse(req.body.data);
    
        const newProduk = new Produk({
            nama_produk,
            harga_produk,
            keterangan,
            gambar: req.files.gambar[0].filename
        });

        await newProduk.save();

        console.log("berhasil save")
        res.status(201).json({ message: 'Succes', status: true });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
 
}


exports.findAll = (req, res) => {
    Produk.find()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ message: err.message }));
  };

 exports.show = (req, res) => {
  const id = req.params.id;

     mahasiswa.findById(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({message: err.message}))
}

exports.update = (req, res) => {
    console.log(req.params.id)
  const id = req.params.id;

  req.body.tanggal_lahir= new Date(req.body.tanggal_lahir)

  mahasiswa.findByIdAndUpdate(id,req.body, {useFindAndModify: false})
       .then(data => {
           if (!data) {
            res.status(404).send({message: "Tidak dapat mengupdate data"})
          }
          res.send({message: "Data berhasil diupdate"})
       })
       .catch(err => res.status(500).send({message:err.message}))
}

exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Produk.deleteOne({
        _id: id
    })
       .then(data => {
          if (!data ) {
             res.status(404).send({message: "Tidak dapat menghapus data"})
          }
          res.send({message: "Data berhasil dihapus", status: true})
       })
       .catch(err =>res.status(500).send({message: err.message}))

}