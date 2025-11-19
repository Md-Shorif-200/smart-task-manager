"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { MdAddTask, MdDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { LuLogs } from "react-icons/lu";

import Container from "./Container";
import Link from "next/link";
import useAuth from "./Hooks/useAuth";
import toast from "react-hot-toast";
import CreateTeamModal from "./Teams/CreateTeamModal";

 const logo = '/logo.png'

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    toast(
      (t) => (
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
      ),
      {
        duration: 6000,
        style: {
          background: "#1E1E1E",
          color: "#fff",
        },
      }
    );
  };

  return (
  <div className="bg-[#333333] pt-6 pb-3">
        <Container>
      <nav className="bg-[#1E1E1E] primary_text_color  w-full top-0 z-50 shadow-md px-4 rounded-md ">

        <div className="flex justify-between py-5 items-center">
          {/* Logo */}
          <div className="font-bold text-2xl uppercase text-cyan-500"> smart <span className="text-white">task</span>  </div>
              {/* <Image src={logo} alt='logo' width={80} height={80} className=""  /> */}
         <div className=" flex justify-center items-center gap-6">

          
    <button
  onClick={() => {
    if (!user) {
      toast.error("You must be logged in to create a team!");
      return; // exit the function, don’t open modal
    }
    setModalOpen(true);
    setDropdownOpen(false); // close dropdown when opening modal
  }}
  className={`${user ? " hidden sm:flex items-center gap-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md w-full text-left cursor-pointer" : "hidden"}`}
>
  <IoMdAdd className="text-lg font-bold" /> Create Team
</button>

            <div className="flex items-center relative" ref={dropdownRef}>
            {!user ? (
              <Link
                href="/log-in"
                className=" w-full flex justify-center items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition duration-200 cursor-pointer"
              >   <FaUserCircle className="text-lg"/>
                Log In
              </Link>
            ) : (
              <>
                <div
                  className="w-12 h-12 rounded-full  overflow-hidden cursor-pointer border border-gray-400"
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
         {/* Dropdown */}
{dropdownOpen && (
  <div className="absolute right-0 top-14 w-48 primary_bg_color primary_text_color rounded-md shadow-lg py-2 z-50 border border-gray-500">
    <Link
      href="/"
      onClick={() => setDropdownOpen(false)} // close dropdown on click
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <MdDashboard /> Dashboard
    </Link>

    <button
      onClick={() => {
        setModalOpen(true);
        setDropdownOpen(false); // close dropdown when opening modal
      }}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <IoMdAdd /> Create Team
    </button>

    <Link
      href="/my-teams"
      onClick={() => setDropdownOpen(false)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <FaUsersCog /> My Teams
    </Link>

    <Link
      href="/all-projects"
      onClick={() => setDropdownOpen(false)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <GoProjectSymlink/> All Projects
    </Link>

    <Link
      href="/all-task"
      onClick={() => setDropdownOpen(false)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <MdAddTask/> All Tasks
    </Link>
    <Link
      href="/activity-log"
      onClick={() => setDropdownOpen(false)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <LuLogs/> Activity Logs
    </Link>

    <button
      onClick={() => {
        handleLogout();
        setDropdownOpen(false); // close dropdown on logout
      }}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
    >
      <FaSignOutAlt /> Logout
    </button>
  </div>
)}

              </>
            )}
          </div>
         </div>
        </div>
    </nav>
      </Container>

       {
        modalOpen &&    <CreateTeamModal
      setModalOpen={setModalOpen}
        // onCreate={handleCreateTeam}
      />
       }
  </div>

    
  );
};

export default Navbar;
