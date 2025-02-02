const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup =async(req,res) =>{
    try {
        const { name,phone, email, password } = req.body;
        if (!(email && password && name && phone )) {
            res.status(400).send("All input is required");
        }
        let oldUser; 
        await userModel.exists({email:email}).then(res=>{oldUser=res});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please ")
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({email:email },
            "" + process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );
        const user = new userModel({name:name,phone:phone, email:email, password:encryptedPassword,token:token});
        
        await user.save();
        return user;
    } catch (err) {
        console.log(err);
    }

}
 exports.signin = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        let user;
        await userModel.findOne({ email: email }).then(res => { user = res });
        if (!user) {
            return res.status(409).send("User is not exists")
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email },
                " " + process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
            );
            user.token = token;
            res.status(200).json(user);
        }
        else
            res.status(400).send("Invalid Credentials");
    } catch (err) {

        console.log(err);
    }
 }

// Service methods for User CRUD operations
exports.getAllUsers = async () => {
  return await userModel.find();
};

exports.getUserById = async (id) => {
  return await userModel.findById(id);
};

exports.updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};