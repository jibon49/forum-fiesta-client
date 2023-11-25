import { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { AuthContext } from '../../AuthProviders/AuthProviders';
import { useForm } from 'react-hook-form';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { createUser, user } = useContext(AuthContext)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = data => {

        const email = data.email
        const password = data.password
        const name = data.name
        const photoUrl = data.photoUrl

        console.log(data)

        if (password.length > 6) {
            if (passwordRegex.test(password)) {
                createUser(email, password, name, photoUrl)
                if (user) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Login Success',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                navigate(location?.state ? location.state : '/')

            }
            else {
                toast.error("Password must be contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
            }
        }
        else {
            toast.error("Password must be at least 6 character long")
        }


    }


    return (
        <div>
            <div className="className=mt-20 max-w-6xl mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse mb-20">
                    <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleRegister)} className="card-body text-[#403F3F]">
                            <div className="form-control">
                                <h1 className="text-center text-4xl font-semibold">Register your account</h1>
                                <hr className="my-12" />
                                <label className="label">
                                    <span className="text-xl font-semibold">Your Name</span>
                                </label>
                                <input type="text"
                                    {...register("name", { required: true })}
                                    name="name" placeholder="Enter your name" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", { required: true })}
                                    name="email" placeholder="Enter your email" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", { required: true })}
                                    name="password" placeholder="password" className="input input-bordered bg-[#F3F3F3]" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl font-semibold">Upload photo</span>
                                </label>
                                <input type="file"
                                    {...register("photoUrl")}
                                    className="file-input file-input-bordered w-full max-w-xs" />
                            </div>
                            <div className="form-control mt-6">
                                <p className="font-semibold text-center mt-7">Already have an account ? <span className="text-[#eb1c3a]"><NavLink to='/login'>Login</NavLink></span></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#eb1c3a] text-white">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Register;