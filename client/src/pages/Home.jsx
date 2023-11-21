import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import Picture from "../assets/picture.jpg";

const RenderCards = ({ data, title, fetchPosts }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card key={post._id} {...post} fetchPosts={fetchPosts} />
    ));
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();

        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        <img
          src={Picture}
          alt="picture"
          className="sm:w-1/5 w-1/2 mt-12 self-center rounded-full shadow-2xl shadow-indigo-700"
        />
        <div className="sm:w-2/3 w-full self-center text-justify my-14 mb-36 shadow-cardhover p-5 rounded-xl">
          <p>
            Welcome to{" "}
            <span className="text-[#383ef2] font-medium">Dream AI</span>, where
            the ethereal world of dreams comes to life! Step into a realm where
            your subconscious visions are transformed into mesmerizing images.
            Unleash your imagination, explore the infinite possibilities, and
            create personalized dreamscapes that reflect the unique tapestry of
            your mind. Join our vibrant community of dreamers, artists, and
            explorers as we embark on a journey to visualize the unseen and
            share the wonders of our inner worlds.
          </p>
        </div>
        <h1 className="font-extrabold text-[#383ef2] text-[32px]">
          Community Gallery
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through images generated by AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search dream"
          type="text"
          name="text"
          placeholder="Clowns on a dark alley"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                  fetchPosts={fetchPosts}
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No posts found"
                  fetchPosts={fetchPosts}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
