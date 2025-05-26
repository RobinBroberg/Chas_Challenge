"use client";
import React, { useState } from "react";
import { User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../services/api";
import { useUser } from "@/context/UserContext";

const ProfileSidebar = ({ onNavigate = () => {} }) => {
  const { user } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);

  const userType = user?.role === "admin" ? "admin" : "user";

  const topIconSrc =
    userType === "admin"
      ? "/mage_dashboard-fill.png"
      : "/tabler_filters-filled.png";

  const userImage =
    userType === "admin" ? "/managerProfile.png" : "/profileEmployee.png";

  const BellIcon = () => (
    <img src="/bell.png" alt="Bell Icon" className="w-6 h-6" />
  );

  const FriskvardIcon = () => (
    <img src="/friskvård.png" alt="Friskvard Icon" className="w-6 h-6" />
  );

  const baseItems = [
    {
      id: "notifications",
      label: "Notifications",
      type: "icon",
      icon: BellIcon,
    },
    {
      id: "fitness",
      label: "Fitness",
      type: "icon",
      href: "/friskvard",
      icon: FriskvardIcon,
    },
  ];

  const mobileItems = [...baseItems].reverse();

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
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <div className="hidden md:flex h-[783px] w-16 bg-white rounded-[32px] shadow-sm flex-col items-center pb-3 pt-6 relative ml-12 mt-22">
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
                  className="w-6 h-6 object-contain"
                />
              </button>
            ) : (
              <img
                src={topIconSrc}
                alt="Survey"
                className="w-6 h-6 object-contain"
              />
            )}
          </div>

          <div className="flex flex-col space-y-4">
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

          <button
            onClick={() => setShowConfirm(true)}
            aria-label="Logout"
            className="mb-14 cursor-pointer text-black"
            title="Logout"
          >
            <IoIosLogOut size={28} />
          </button>

          <div className="text-sm font-bold tracking-wide text-black">
            {userType === "admin" ? "HR" : "M"}
          </div>
          <div className="w-6 h-px bg-gray-600 mb-2" />

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
        <div className="bg-white shadow-xl rounded-full pr-4 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            {/* Left: Logout */}
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="w-13 h-13 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 text-black "
                title="Logout"
              >
                <IoIosLogOut size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-3">
              {mobileItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-5 h-5  flex items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-full"
                  title={item.label}
                >
                  <item.icon strokeWidth={1} />
                </button>
              ))}
              {userType === "admin" ? (
                <button
                  onClick={() => (window.location.href = "/admin/dashboard")}
                  className="cursor-pointer"
                  title="Gå till admin dashboard"
                >
                  <img
                    src={topIconSrc}
                    alt="Dashboard"
                    className="w-6 h-6 object-contain"
                  />
                </button>
              ) : (
                <img
                  src={topIconSrc}
                  alt="Survey"
                  className="w-6 h-6 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#FBFAF5] p-12 rounded-md shadow-md space-y-4 w-full max-w-sm text-center font-montserrat">
            <p className="text-md font-medium">
              Är du säker på att du vill logga ut?
            </p>
            <div className="flex justify-center gap-4 pt-2 text-md font-medium">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#4A8220C2] rounded-md hover:bg-[#464C35] hover:text-white"
              >
                Logga ut
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 bg-[#FA4B42] rounded-md hover:bg-[#820B04] hover:text-white"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSidebar;
