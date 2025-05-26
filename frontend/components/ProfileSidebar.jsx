"use client";
import React from "react";
import { FileText, Bell, Dumbbell, User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../services/api";
import { useUser } from "@/context/UserContext";

const ProfileSidebar = ({ onNavigate = () => {} }) => {
  const { user } = useUser();

  const userType = user?.role === "admin" ? "admin" : "user";

  // Top icon based on role
  const topIconSrc =
    userType === "admin"
      ? "/mage_dashboard-fill.png"
      : "/tabler_filters-filled.png";

  // Profile picture based on role
  const userImage =
    userType === "admin" ? "/managerProfile.png" : "/profileEmployee.png";

  const baseItems = [
    {
      id: "documents",
      label: "Documents",
      type: "icon",
      href: "/survey/intro",
      icon: FileText,
    },
    { id: "notifications", label: "Notifications", type: "icon", icon: Bell },
    {
      id: "fitness",
      label: "Fitness",
      type: "icon",
      href: "/friskvard",
      icon: Dumbbell,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleItemClick = (item) => {
    if (item.href) {
      window.location.href = item.href;
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <>
      <div className="hidden md:flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-screen w-16 bg-white rounded-[32px] shadow-sm flex-col items-center py-8 relative ml-12 mt-18">
          {/* Top icon */}
          <div className="mb-6">
            {userType === "admin" ? (
              <button
                onClick={() => (window.location.href = "/admin/dashboard")}
                className="cursor-pointer"
                title="Gå till admin dashboard"
              >
                <img
                  src={topIconSrc}
                  alt="Dashboard"
                  className="w-5 h-5 object-contain"
                />
              </button>
            ) : (
              <img
                src={topIconSrc}
                alt="Survey"
                className="w-5 h-5 object-contain opacity-70"
              />
            )}
          </div>

          {/* Navigation Icons */}
          <div className="flex flex-col space-y-8">
            {baseItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-200 group cursor-pointer"
                title={item.label}
              >
                <item.icon size={18} className="text-black" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="mb-10"
            title="Logout"
          >
            <IoIosLogOut size={20} />
          </button>

          {/* HR Section Label */}
          <div className="text-xs font-bold text-black mb-3 tracking-wide">
            {userType === "admin" ? "HR" : "M"}
          </div>

          {/* User Profile Picture */}
          <button
            onClick={() => onNavigate("profile")}
            className="w-10 h-10 rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
            title="Profile"
          >
            {userImage ? (
              <img
                src={userImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Top Navigation */}
      <div className="block md:hidden w-full mt-4">
        <div className="bg-white rounded-full px-4 py-3 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            {/* Logout Icon */}
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-full"
              title="Logout"
            >
              <IoIosLogOut
                size={20}
                className="text-gray-700"
                strokeWidth={1.5}
              />
            </button>

            {/* Navigation Items */}
            {baseItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-full"
                title={item.label}
              >
                <item.icon
                  size={20}
                  className="text-gray-700"
                  strokeWidth={1.5}
                />
              </button>
            ))}

            {/* User Profile */}
            <button
              onClick={() => onNavigate("profile")}
              className="w-8 h-8 rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
              title="Profile"
            >
              {userImage ? (
                <img
                  src={userImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
