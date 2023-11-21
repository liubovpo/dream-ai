import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.authToken) {
          //   console.log("JWT token", responseData.authToken);
          storeToken(responseData.authToken);
          authenticateUser();
          navigate("/");
        } else {
          // Handle a case where 'authToken' is missing or undefined in the response
          setErrorMessage("Invalid response data");
        }
      } else {
        // Handle the error case (e.g., server error or invalid credentials)
        const errorData = await response.json();
        const errorDescription = errorData.message;
        setErrorMessage(errorDescription);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex  flex-col items-center mx-8 my-8">
      <div className="flex-1 lg:w-1/3 w-full flex flex-col">
        <h1 className="text-[#383ef2] text-lg  self-center font-bold">Log in</h1>

        <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleLoginSubmit}>
          <label className="text-black-500 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="border rounded-md p-1"
            onChange={handleEmail}
          />

          <label className="text-black-500 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            className="border rounded-md p-1"
            onChange={handlePassword}
          />

          <button  className="font-inter w-1/3 self-center font-medium bg-[#383ef2] text-white px-4 py-2 mx-2 rounded-md" type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="text-gray-400 text-sm mt-4 self-center">Don't have an account yet?</p>
        <Link  className="text-[#383ef2] underline text-sm font-semibold self-center" to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LogIn;
