import { NavLink } from "react-router-dom";


const StatusError = () => {
    return (
        <div className="bg-red-500 p-4 rounded-md mt-20 max-w-sm mx-auto text-white">
            <h2 className="text-xl font-semibold mb-2">Unauthorized Access</h2>
            <p>
                You do not have permission to access this resource. Please make sure you are logged in with the correct credentials.
            </p>
            <NavLink to='/'>
                <button className="bg-blue-500 flex justify-center mx-auto mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Return to Home
                </button>
            </NavLink>
        </div>
    );
};

export default StatusError;
