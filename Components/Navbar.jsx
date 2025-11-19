"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { MdAddTask, MdDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";

import Container from "./Container";
import Link from "next/link";
import useAuth from "./Hooks/useAuth";
import toast from "react-hot-toast";
import CreateTeamModal from "./Teams/CreateTeamModal";

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
  <>
      <nav className="bg-[#1E1E1E] primary_text_color  w-full top-0 z-50 shadow-md">
      <Container>
        <div className="flex justify-between py-5 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl">SmartTask</div>

          <div className="flex items-center relative" ref={dropdownRef}>
            {!user ? (
              <Link
                href="/log-in"
                className="primary_btn"
              >
                Log In
              </Link>
            ) : (
              <>
                <div
                  className="w-10 h-10 rounded-full  overflow-hidden cursor-pointer border border-gray-400"
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
                  <div className="absolute right-0 top-14 w-48 primary_bg_color primary_text_color rounded-md shadow-lg py-2 z-50 border border-gray-500">
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
                    >
                      <MdDashboard /> Dashboard
                    </Link>
                    <button
              
                      onClick={() => setModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
                    >
                      <IoMdAdd /> Create Team
                    </button>
                    <Link
                      href="/my-teams"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
                    >
                      <FaUsersCog /> My Teams
                    </Link>
                    <Link
                      href="/all-projects"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
                    >
                      <GoProjectSymlink/> All Projects
                    </Link>
                    <Link
                      href="/all-task"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left cursor-pointer"
                    >
                      <MdAddTask/> All Tasks
                    </Link>

                    <button
                      onClick={handleLogout}
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
      </Container>
    </nav>

       {
        modalOpen &&    <CreateTeamModal
      setModalOpen={setModalOpen}
        // onCreate={handleCreateTeam}
      />
       }
  </>

    
  );
};

export default Navbar;
