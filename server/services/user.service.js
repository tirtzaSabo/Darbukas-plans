const userModel = require('../models/user.model')

const addUser =async(req,res) =>{
    try {
        const { name,phone, email, password, user_id } = req.body;
        if (!(email && password && name && phone && user_id)) {
            res.status(400).send("All input is required");
        }
       
  
        let oldUser; 
        await exists({email:email}).then(res=>{oldUser=res});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please ")
        }
        const encryptedPassword = await hash(password, 10);
        const token = sign({ user_id: user_id, email },
            "" + process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );
        const user = new userModel({name:name,phone:phone, email:email, password:encryptedPassword, user_id:user_id,token:token});
        user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

}
 const signin = async (req,res) =>{
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
        if (user && (await bcryptjs.compare(password, user.password))) {
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
const requiredInputs =(user)=>{
    const { name,phone, email, password, user_id } = user;

    if (!(email && password && name && phone && user_id)) {
        return false;
    }
}

module.exports.addUser=addUser;
module.exports.signin=signin;