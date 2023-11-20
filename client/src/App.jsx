import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

const App = () => {
  const {
    isLoggedIn,
    user,
    logOutUser,
  } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div>
          {isLoggedIn && (
            <>
              <Link
                to="/create-post"
                className="font-inter font-medium transition duration-300 ease-in-out hover:bg-[#575dff] bg-[#383ef2] text-white px-4 py-2 mx-2 rounded-md"
              >
                Create
              </Link>
              <Link
                onClick={logOutUser}
                className="font-inter font-medium transition duration-300 ease-in-out hover:bg-[#ecedfc] bg-[#d9daff] text-[#493194] px-4 py-2 mx-2 rounded-md"
              >
                Log out
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="font-inter font-medium transition duration-300 ease-in-out hover:bg-[#575dff] bg-[#383ef2] text-white px-4 py-2 mx-2 rounded-md"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="transition duration-300 ease-in-out hover:bg-[#ecedfc] font-inter font-medium bg-[#d9daff] text-[#493194] px-4 py-2  mx-2 rounded-md"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
