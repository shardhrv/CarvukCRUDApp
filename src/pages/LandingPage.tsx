import { Link } from 'react-router';
import redCar from '../assets/images/redcar.jpg';

export const LandingPage = () => {
    return (
        <div className="h-[calc(100vh-8rem)] bg-cream text-gray-800 flex flex-col">
            <div className="flex flex-1 lg:flex-row items-center shadow-lg rounded-lg bg-offwhite">
                <div className="lg:w-1/2 p-8 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold text-red-800 mb-4">
                        Welcome to CRUDvuk
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Simplify your car service bookings with an intuitive CRUD interface.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/signup"
                            className="bg-red-400 hover:bg-red-800 text-white text-base font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/login"
                            className="border border-red-400 text-red-400 hover:bg-red-100 text-base font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex md:w-1/2 p-8 justify-center">
                    <img
                        src={redCar}
                        alt="Red car"
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};
