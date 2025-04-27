const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!(email && password && name && phone)) {
            res.status(400).send("All input is required");
        }
        let oldUser;
        await userModel.exists({ email: email }).then(res => { oldUser = res });
        if (oldUser) {
            return res.status(409).send("User Already Exist")
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name: name, phone: phone, email: email, password: encryptedPassword });
        const token = jwt.sign({ user_id: user._id, email: email },
            "" + process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
        );
        user.token=token;
        await user.save();
        // res.cookie('token',token, {
        //     httpOnly: true,
        //     sameSite: 'Lax',
        //     maxAge: 1000 * 60 * 60 * 24 * 14
        // });
        res.status(201).json(user);            
    } catch (err) {
        console.log(err);
    }

}
exports.signin = async (req, res) => {
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
            const token = jwt.sign({ user_id: user._id, email: email },
                " " + process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
            );
            user.token = token;
            // res.cookie('token',token, {
            //      httpOnly: true,
            //     sameSite: 'Lax',
            //     maxAge: 1000 * 60 * 60 * 24 * 14,
            // }); 
            res.status(200).json(user);            
        }
        else
            res.status(400).send("Invalid Credentials");
    } catch (err) {

        console.log(err);
    }
}
exports.logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).send("Logged out");
    } catch (error) {
        console.log(error);
        
    }
}
exports.getUserFromToken= async (req, res) => {  
    const token = req.cookies.token||req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = getUserByEmail(decoded.email); 
      const { token, ...userWithoutToken } = user.toObject();
      return res.status(200).json({ userWithoutToken });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
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