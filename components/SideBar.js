import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import toast from "react-hot-toast";
import { BiBarChart } from "react-icons/bi";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsChatLeftDots, BsCalendarDate } from "react-icons/bs";
import { FiSettings, FiLogOut } from "react-icons/fi";

function SideBar(props) {
  async function handleLogout() {
    toast.loading("Loading...");
    const res = await fetch("/api/logout", {
      method: "POST",
    });
    const data = await res.json();
    toast.dismiss();
    toast(data.message);
    // reload page
    window.location.reload();
  }
  return (
    <div className="fixed inset-y-0 left-0 bg-white w-64 border-r-2 border-gray-100">
      <h1
        className="flex items-center justify-start ml-8 text-2xl
            h-16 text-black font-bold"
      >
        .taskez
      </h1>

      <ul className="flex flex-col text-lg h-full">
        <li className="flex py-4 gap-x-4 text-gray-500 ml-8 cursor-pointer hover:text-black justify-start items-center">
          <GrHomeRounded className="w-5 h-5" />
          Overview
        </li>
        <li className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 text-gray-500">
          <BiBarChart className="w-5 h-5 text-black" />
          Stats
        </li>
        <li className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 border-r-4 border-green-500 text-black font-bold">
          <AiFillFolderOpen className="w-5 h-5" />
          Projects
        </li>
        <li className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 text-gray-500">
          <BsChatLeftDots className="w-5 h-5" />
          Chat
        </li>
        <li className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 text-gray-500">
          <BsCalendarDate className="w-5 h-5" />
          Calendar
        </li>

        <li className="flex py-4 text-gray-500 mt-auto flex-col mb-16">
          <div className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 text-gray-500">
            <FiSettings className="w-5 h-5" />
            Settings
          </div>
          <button
            onClick={handleLogout}
            className="flex gap-x-4 justify-start items-center cursor-pointer hover:text-black ml-8 py-4 text-gray-500"
          >
            <FiLogOut className="w-5 h-5" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
