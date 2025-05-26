import React from "react";
import { Grid3X3, FileText, Bell, Dumbbell, User } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../services/api";

const ProfileSidebar = ({
  userType = "user", // 'admin' or 'user'
  userName = "Ryan Garcia",
  userEmail = "ryan.garcia@gmail.com",
  userImage = null,
  onNavigate = () => {},
}) => {
  const navigationItems = [
    { icon: Grid3X3, id: "dashboard", label: "Dashboard" },
    { icon: FileText, id: "documents", label: "Documents" },
    { icon: Bell, id: "notifications", label: "Notifications" },
    { icon: Dumbbell, id: "fitness", label: "Fitness" },
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

  return (
    <div className="h-screen w-16 bg-white rounded-[32px] shadow-sm flex flex-col items-center py-8 relative ml-12 mt-18">
      {/* Navigation Icons */}
      <div className="flex flex-col space-y-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-8 h-8 flex items-center justify-center transition-colors duration-200 group"
            title={item.label}
          >
            <item.icon size={18} className="text-black" strokeWidth={1.5} />
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Logout */}
      <button onClick={handleLogout} aria-label="Logout" className="mb-10 ">
        <IoIosLogOut size={20} />
      </button>

      {/* HR Section Label */}
      <div className="text-xs font-bold text-black mb-3 tracking-wide">HR</div>

      {/* User Profile */}
      <button
        onClick={() => onNavigate("profile")}
        className="w-10 h-10 rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
        title={`${userName} - ${userEmail}`}
      >
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ProfileSidebar;
