import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        navigate("/login");
      } else {
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
        <h1 className="text-[#383ef2] text-lg  self-center font-bold">
          Sign Up
        </h1>

        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSignupSubmit}
        >
          <label className="text-black-500 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="border rounded-md"
            onChange={handleEmail}
          />

          <label className="text-black-500 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            className="border rounded-md"
            onChange={handlePassword}
          />

          <label className="text-black-500 font-semibold">Name:</label>
          <input
            className="border rounded-md"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />

          <button
            className="font-inter w-1/3 self-center font-medium bg-[#383ef2] text-white px-4 py-2 mx-2 rounded-md"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="text-gray-400 text-sm mt-4 self-center">
          Already have account?
        </p>
        <Link
          className="text-[#383ef2] underline text-sm font-semibold self-center"
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
