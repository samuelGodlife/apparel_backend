module.exports = mongoose => {
    const Schema = mongoose.Schema(
{
    user_name:String,
    Nomor_Telpon:String,
    kata_sandi:String,
    email:String,
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

    return mongoose.model("user", Schema);
}