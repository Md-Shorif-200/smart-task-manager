"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import Container from "./Container";
import Link from "next/link";
import useAuth from "./Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    toast((t) => (
      <div className="text-white ">
        <p className="font-semibold mb-2">Are you sure you want to logout?</p>
        <div className="flex gap-3 mt-2">
          <button
            className="px-3 py-1 rounded bg-red-500 text-white cursor-pointer"
            onClick={async () => {
              toast.dismiss(t.id);
              await logOut();
              toast.success("Logged out successfully!");
            }}
          >
            Yes
          </button>

          <button
            className="px-3 py-1 rounded bg-gray-500 text-white cursor-pointer "
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      style: {
        background: "#1E1E1E",
        color: "#fff",
      },
    });
  };

  return (
    <nav className="primary_bg_color primary_text_color fixed w-full top-0 z-50 shadow-md">
      <Container>
        <div className="flex justify-between py-5 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl">SmartTask</div>

          <div className="flex items-center relative" ref={dropdownRef}>
            {!user ? (
              <Link
                href="/log-in"
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-cyan-500 hover:text-white transition duration-200"
              >
                Log In
              </Link>
            ) : (
              <>
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-400"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Image
                    src={user?.photoURL || "/default-user.png"}
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-52 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50 border border-gray-300">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-left">
                      <FaUserCircle /> Profile
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-left">
                      <FaCog /> Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-left"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
