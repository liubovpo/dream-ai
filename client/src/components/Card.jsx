import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import { download } from "../assets";
import { downloadImage } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;

function Card({ _id, name, prompt, photo, userId, fetchPosts }) {
  const { user } = useContext(AuthContext);
  const currentUser = user._id;
  const canDelete = userId === currentUser;
  const [allUsers, setAllUsers] = useState(null);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchPosts();
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        alert("Delete request failed. Please try again later.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An unexpected error occurred while deleting the post.");
    }
  };

  const fetchUsers = async () => {
    console.log("fetching");

    try {
      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();

        setAllUsers(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div
        className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 
      left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
      >
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="object-cover flex text-gray-300 text-xs">
          Discription: {name}
        </div>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="object-cover flex justify-center items-center text-white text-xs font-bold">
              {}
            </div>
            <p className="text-white text-sm"></p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent
          border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={() => handleDelete(_id)}
              className="outline-none bg-transparent
          border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
