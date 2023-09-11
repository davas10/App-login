import jwt from 'jsonwebtoken';
//import ENV from '../config.js'
import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';

/** auth middleware */
export default async function Auth(req, res, next){
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;

        //res.json(decodedToken);

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}


export async function hashPassword(req, res, next){
    

    
    if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

    const { usernameRecover, password } = req.body;

    const usuarioOK = await UserModel.find({username:usernameRecover});
      
    if (usuarioOK.length != 0  ) {

        if(password){
            bcrypt.hash(password, 10)
                .then( hashedPassword => {

                    req.app.locals.password = hashedPassword

                    next()

                }).catch(error => { 
                    return res.status(500).send({error : "Enable to hashed password"})
                })
        }
    }else{
        return res.status(401).send({ error : "User Not Found...!"});
    }
}
