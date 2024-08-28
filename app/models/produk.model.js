module.exports = mongoose => {
    const Schema = mongoose.Schema(
{
    nama_produk:String,
    harga_produk:String,
    keterangan: String,
    gambar: String,
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

    return mongoose.model("produk", Schema);
}