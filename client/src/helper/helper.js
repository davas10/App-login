import axios from 'axios';
import jwt_decode from 'jwt-decode';
import emailjs from 'emailjs-com';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN2;


/** Make API Requests */


/** To get username from Token */
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}


/** authenticate function */
export async function authenticateUser(username) {
    try {
        return await axios.post('/api/authenticateUser', { username })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}


/** authenticate function */
export async function authenticateEmail(email) {
    try {
        return await axios.post('/api/authenticateEmail', { email })
    } catch (error) {
        return { error: "Email doesn't exist...!" }
    }
}


/** get User details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" }
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {

        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);
        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            var templateParams = {
                name: username,
                message: 'Te has registrado correctamente',
                user_email: email
            };
            //envío de email
            emailjs.send("service_qi6o4k9", 'template_5kldwee', templateParams, 'R6IOKn6Ev8YyT4GLz')
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            if (data.msg === 200) {
                return Promise.resolve({ data });
            } else {
                return Promise.reject({ data });
            }

        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match...!" })
    }
}

/** update user profile function */
export async function updateUser(response) {
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" })
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {

    
        // check user exist or not
        const { status } = await authenticate(username);

        if (status !== 200) {
            return Promise.reject("Username is not correct!");
        } else {

            const { data: { code }, status2 } = await axios.get('/api/generateOTP', { params: { username } });

            // send mail with the OTP
            if (status2 === 201) {
                //Enviamos el email en la parte cliente
            }
            return Promise.resolve(code);
        }


    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ usernameRecover, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { usernameRecover, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}