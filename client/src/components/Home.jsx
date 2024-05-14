import React from "react";
import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <>
      {user ? (
        <>
          <div className="flex flex-col items-center mt-10">
            <img
              src={`data:image/avif;base64,${user.profileImage}`}
              className="w-20 h-20 rounded-full"
              alt="Profile Image"
            />
            <p>Welcome {user.username}!</p>
            <p>Your email is {user.email}.</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p>You are not logged in.</p>
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
