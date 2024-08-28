const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const app = express();
const db = require("./app/models");
const PESANAN = db.pesanan;
const uploadConfig = require("../backend/uploadConfig");

const fields = uploadConfig.upload.fields([
  {
    name: "buktiTransfer",
    maxCount: 1,
  },
  {
    name: "uploadDesign",
    maxCount: 1,
  },
  {
    name: "namanomorpembuatan",
    maxCount: 1,
  },
]);

// CORS configuration
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/gambar", express.static("static"));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://rafli290902:rafli123@cluster0.lqgvzhg.mongodb.net/Apparel",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Berhasil connect ke MongoDB"))
  .catch((err) => console.error("Koneksi ke MongoDB gagal:", err));

// Route to handle file upload and data saving for transaction
app.post("/uploadBukti", fields, async (req, res) => {
  try {
    const {
      nama_lengkap,
      alamat,
      kota,
      noTelp,
      email,
      ukuran,
      jenis_bahan,
      jenis_font,
      jenis_kerah,
      jumlahBaju,
      totalHarga,
    } = req.body;

    const transaksi = new PESANAN({
      nama_lengkap,
      noTelp,
      alamat,
      kota,
      email,
      ukuran,
      jenis_bahan,
      jenis_font,
      jenis_kerah,
      jumlahBaju: parseInt(jumlahBaju),
      totalHarga: parseInt(totalHarga),
      buktiTransfer: req.files.buktiTransfer
        ? req.files.buktiTransfer[0].filename
        : null,
      uploadDesign: req.files.uploadDesign
        ? req.files.uploadDesign[0].filename
        : null,
      namanomorpembuatan: req.files.namanomorpembuatan
        ? req.files.namanomorpembuatan[0].filename
        : null,
    });

    await transaksi.save();
    console.log("Berhasil Save");
    res.status(201).json({
      message: "Transaksi berhasil disimpan!",
      statusCode: 201,
      transaksi: transaksi, // Kirimkan data transaksi yang baru saja disimpan
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menyimpan transaksi." });
  }
});

// Route to get transaction by ID
app.get("/transaksi/:id", async (req, res) => {
  console.log(`Menerima permintaan untuk ID: ${req.params.id}`);
  try {
    const transaksi = await PESANAN.findById(req.params.id);
    if (!transaksi) {
      console.log("Transaksi tidak ditemukan");
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
    console.log("Transaksi ditemukan:", transaksi);
    res.json(transaksi);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil transaksi." });
  }
});

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Require routes files (optional)
require("./app/routes/mahasiswa.routes")(app);
require("./app/routes/pesanan.routes")(app);
require("./app/routes/produk.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
