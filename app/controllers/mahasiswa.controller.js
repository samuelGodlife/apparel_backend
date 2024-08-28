const db = require("../models")
const mahasiswa = db.mahasiswa
const bcrypt = require('bcrypt');



exports.createUser= async (req, res) => {

        try {
            const { user_name, kata_sandi, Nomor_Telpon, email } = req.body;

            if (!user_name || !kata_sandi || !Nomor_Telpon || !email ) {
                return res.status(400).json({ message: 'Semua field wajib diisi' });
            }

           
            const existingUser = await mahasiswa.findOne({ user_name });
            console.log(existingUser)
            if (existingUser) {
                return res.status(400).json({ message: 'Username Telah Digunakan' });
            }

          
            const existingUserByPhone = await mahasiswa.findOne({ Nomor_Telpon });
            if (existingUserByPhone) {
             return res.status(400).json({ message: 'Nomor Telepon Telah Digunakan' });
           }

           const existingUserByEmail = await mahasiswa.findOne({ email });
           if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email Telah Digunakan' });
           }
    
            const newUser = new mahasiswa({ user_name, kata_sandi, Nomor_Telpon,email});
            console.log(newUser)
            const salt  = await bcrypt.genSalt(10)
            newUser.kata_sandi = await bcrypt.hash(kata_sandi, salt)

            await newUser.save();
    
            res.status(201).json({ message: 'Succes' });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
 
}

exports.login = async (req, res) => {
    try {
        const { user_name, kata_sandi } = req.body;
        console.log(req.body)
        if (!user_name || !kata_sandi) {
            return res.status(300).json({ message: 'Username dan kata sandi wajib diisi' });
        }

        const user = await mahasiswa.findOne({ user_name });
        if (!user) {
            return res.status(400).json({ message: 'Username atau kata sandi salah' });
        }

        const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);
        if (!isMatch) {
            return res.status(500).json({ message: 'Username atau kata sandi salah' });
        }
        
        res.status(200).json({ datamessage: 'Login berhasil', user });
        
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.register = async (req, res) => {
    console.log(req.body)
    try {
        const { user_name, kata_sandi, Nomor_Telpon, email, } = req.body;

        if (!user_name || !kata_sandi || !Nomor_Telpon || !email ) {
            return res.status(400).json({ message: 'Semua field wajib diisi' });
        }

       
        const existingUser = await mahasiswa.findOne({ user_name });
        // console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'Username Telah Digunakan' });
        }

        const existingUserByPhone = await mahasiswa.findOne({ Nomor_Telpon });
        if (existingUserByPhone) {
         return res.status(400).json({ message: 'Nomor Telepon Telah Digunakan' });
       }

       const existingUserByEmail = await mahasiswa.findOne({ email });
       if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email Telah Digunakan' });
       }

        const newUser = new mahasiswa({ user_name, kata_sandi, Nomor_Telpon,email});
        
        const salt  = await bcrypt.genSalt(10)
        newUser.kata_sandi = await bcrypt.hash(kata_sandi, salt)

        await newUser.save();
        console.log(newUser)
        res.status(201).json({ message: 'Succes' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }

 }



exports.findAll = (req, res) => {
    mahasiswa.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message}))
}

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

    mahasiswa.deleteOne({
        _id: id
    })
       .then(data => {
          if (!data ) {
             res.status(404).send({message: "Tidak dapat menghapus data"})
          }
          res.send({message: "Data berhasil dihapus"})
       })
       .catch(err =>res.status(500).send({message: err.message}))

}