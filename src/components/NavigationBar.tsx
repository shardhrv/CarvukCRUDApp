import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const NavigationBar = () => {
    const [ menuChosen, setMenuChosen ] = useState(false);
    const { user, signOut } = useAuth();
    const isAuthenticated = Boolean(user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    }


    return (
        <nav className="fixed top-0 w-full z-40 bg-offwhite backdrop-blur-lg border-b border-amber-800 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-12">
                    <Link to={"/"} className="font-mono text-xl font-bold text-black hover:scale-105">
                        CRUD<span className="text-red-400 transitions-colors">vuk</span>
                    </Link>

                    {/* Big screen */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to={"/home"} className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors"> 
                            Home 
                        </Link>
                        <Link to={"/services"} className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors"> 
                            Services 
                        </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <Link to={"/profile"} className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors"> 
                                    Profile 
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors"                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-2 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Small screen */}
                    <div className="md:hidden">
                        {" "}
                        <button 
                            className="p-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-colors focus:outline-none" 
                            onClick={() => setMenuChosen((prev) => !prev)}>
                            {menuChosen ? <IoMdClose /> : <GiHamburgerMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {menuChosen && (
                <div>
                    <div>
                        <Link to={"/home"}
                            className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                            hover:text-white transition-colors hover:bg-red-800"> 
                            Home 
                        </Link>
                        <Link to={"/services"}
                            className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                            hover:text-white transition-colors hover:bg-red-800"> 
                            Services 
                        </Link>
                        {isAuthenticated ? (
                            <>
                            <Link to={"/profile"} 
                                className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                                hover:text-white transition-colors hover:bg-red-800"> 
                                Profile 
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                                hover:text-white transition-colors hover:bg-red-800">
                                Logout
                            </button>
                            </>
                        ) : (
                            <>
                            <Link to={"/login"} 
                                className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                                hover:text-white transition-colors hover:bg-red-800"> 
                                Login 
                            </Link>
                            <Link to={"/signup"} 
                                className="block px-3 py-2 rounded-md text-base font-medium text-red-400 
                                hover:text-white transition-colors hover:bg-red-800"> 
                                Sign Up 
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}