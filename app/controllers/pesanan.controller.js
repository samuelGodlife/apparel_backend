const db = require("../models");
const mahasiswa = db.pesanan;
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const {
      nama_lengkap,
      alamat,
      kota,
      status,
      Nomor_Telpon,
      email,
      jenis_bahan,
      jenis_font,
      jenis_kerah,
    } = req.body;

    const newUser = new pesanan({
      nama_lengkap,
      alamat,
      kota,
      status,
      Nomor_Telpon,
      email,
      jenis_bahan,
      jenis_font,
      jenis_kerah,
    });
    console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: "Succes" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getID = (req, res) => {
  console.log(req.params.username);
  mahasiswa
    .find({
      username: req.params.username,
    })
    .then((data) =>
      res.status(201).json({
        message: "Transaksi get",
        statusCode: 200,
        Data: data, // Kirimkan data transaksi yang baru saja disimpan
      })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};
exports.findAll = (req, res) => {
  mahasiswa
    .find()
    .then((data) =>
      res.status(201).json({
        message: "Transaksi berhasil disimpan!",
        statusCode: 200,
        Data: data, // Kirimkan data transaksi yang baru saja disimpan
      })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  const id = req.params.id;

  mahasiswa
    .findById(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  mahasiswa
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Tidak dapat mengupdate data" });
      }
      res.send({ message: "Data berhasil diupdate" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  mahasiswa
    .deleteOne({
      _id: id,
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Tidak dapat menghapus data" });
      }
      res.send({ message: "Data berhasil dihapus" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};