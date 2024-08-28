module.exports = mongoose => {
    const Schema = mongoose.Schema(
{
    username:String,
    nama_lengkap:String,
    alamat:String,
    kota:String,
    noTelp:String,
    status:String,
    ukuran:String,
    jenis_bahan:String,
    jenis_font:String,
    jenis_kerah:String,
    jumlahBaju:String,
    totalHarga:String,
    buktiTransfer:String,
    uploadDesign:String,
    namanomorpembuatan:String
}, 
{
    timestamps: true
}

);

Schema.method("toJSON", function(){
 const{__v, _id, ...object} = this.toObject();
 object.id =_id;

 return object;
});

    return mongoose.model("pesanan", Schema);
}