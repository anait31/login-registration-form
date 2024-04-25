import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { IoEye, IoEyeOff  } from "react-icons/io5";

const HeroRegister = () => {

    const auth = getAuth(app);
    const [registerError, setregisterError] = useState('');
    const [success, setSuccess] = useState('');

    const handleHeroRegisterForm = e => {
        e.preventDefault();
        // console.log("Form Submited");
        const email = e.target.email.value;
        const password = e.target.password.value;

        setregisterError('');
        setSuccess('');

        if (password.length < 6) {
            setregisterError('Password must be atleast 6 charecter or longer');
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            setregisterError("Password shoould be inclide atleast one uppdercase");
            return;
        }


        // console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential.user);
            setSuccess('Your account has been created successfully')
        })
        .catch(error => {
            console.log(error.message);
            setregisterError(error.message);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. br In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleHeroRegisterForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    {
                        success && <p className="text-green-300 text-center mb-6">{success}</p>
                    }
                    {
                        registerError && <p className="text-red-300 text-center mb-6">{registerError}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;