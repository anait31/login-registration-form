import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {

    const auth = getAuth(app);
    const [registerError, setregisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterForm = e => {
        e.preventDefault();
        // console.log('Form Submited');
        // const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setregisterError('Password must be atleast 6 charecter or longer');
            return;
        }

        setregisterError('');
        setSuccess('');

        // console.log(name, email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Your account has been created successfully')
            })
            .catch(error => {
                console.log(error.message);
                setregisterError(error.message);
            })

    }

    return (
        <div>
            <div className="w-1/2 mx-auto my-8 bg-slate-500 py-7 rounded-md">
                <h2 className="text-center my-3 text-2xl font-bold text-pink-100">Please Register Now</h2>
                <div className="text-center">
                    <form onSubmit={handleRegisterForm}>
                        {/* <input className="w-3/4 py-2 px-4 rounded-md" type="text" name="name" placeholder="Your Name" id="1" /> */}
                        <br />
                        <input className="w-3/4 py-2 px-4 my-3 rounded-md" type="email" name="email" placeholder="Your Email" id="2" required />
                        <br />
                        <div>
                            <input className="w-3/4 py-2 px-4 rounded-md" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="3" required />
                            <span className="absolute mt-4 mr-[4px]" onClick={() => { setShowPassword(!showPassword) }}> {showPassword ? <IoEye /> : <IoEyeOff />}</span>
                        </div>
                        <br />
                        <input className="w-3/4 py-2 px-4 my-3 bg-slate-400 font-bold rounded-md" type="submit" value="Register" />
                    </form>
                    {
                        registerError && <p className="text-red-300 text-1xl">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-300">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;