import React from "react";
import { FileText, Bell, Dumbbell, User } from "lucide-react";
import { logout } from "../services/api";

const ProfileSidebar = ({
  userType = "admin", // 'admin' or 'user'
  userName = "Ryan Garcia",
  userEmail = "ryan.garcia@gmail.com",
  userImage = null,
  onNavigate = () => {},
}) => {
  // Base navigation items (always shown)
  const baseItems = [
    { id: "documents", label: "Documents", type: "icon", icon: FileText },
    { id: "notifications", label: "Notifications", type: "icon", icon: Bell },
    { id: "fitness", label: "Fitness", type: "icon", icon: Dumbbell },
    {
      id: "logout",
      label: "Logout",
      type: "image",
      iconSrc: "/logout-button.png",
    },
  ];

  // Admin-only item
  const adminItem = {
    id: "dashboard",
    label: "Dashboard",
    type: "image",
    iconSrc: "/mage_dashboard-fill.png",
    href: "/dashboard",
  };

  // User-only item
  const userItem = {
    id: "user profile",
    label: "User profile",
    type: "image",
    iconSrc: "/tabler_filters-filled.png",
  };

  // Assemble navigation list
  const logoutItem = baseItems.find((item) => item.id === "logout");
  const mainNavItems = baseItems.filter((item) => item.id !== "logout");

  const navigationItems =
    userType === "admin"
      ? [adminItem, ...mainNavItems]
      : [userItem, ...mainNavItems];

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
    if (item.id === "logout") {
      handleLogout();
      return;
    }

    if (item.href) {
      window.location.href = item.href;
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <>
      <div className="hidden md:flex ...">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-screen w-16 bg-white rounded-[32px] shadow-sm flex-col items-center py-8 relative ml-12 mt-18">
          {/* Navigation Icons */}
          <div className="flex flex-col space-y-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-8 h-8 flex items-center justify-center transition-colors duration-200 group"
                title={item.label}
              >
                {item.type === "image" ? (
                  <img
                    src={item.iconSrc}
                    alt={item.label}
                    className="w-5 h-5 object-contain"
                    onError={() =>
                      console.error(`Failed to load ${item.iconSrc}`)
                    }
                  />
                ) : (
                  <item.icon
                    size={18}
                    className="text-black"
                    strokeWidth={1.5}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Logout */}

          {logoutItem && (
            <button
              onClick={() => handleItemClick(logoutItem)}
              aria-label="Logout"
              className="mb-10 w-8 h-8 flex items-center justify-center transition-colors duration-200 group"
              title={logoutItem.label}
            >
              <img
                src={logoutItem.iconSrc}
                alt={logoutItem.label}
                className="w-5 h-5 object-contain"
                onError={() =>
                  console.error(`Failed to load ${logoutItem.iconSrc}`)
                }
              />
            </button>
          )}

          {/* HR Section Label */}
          <div className="text-xs font-bold  tracking-wide">HR</div>

          {/* Separator line */}
          <div className="w-8 h-px bg-gray-500 my-2 mx-auto mb-4" />

          {/* User Profile */}
          <button
            onClick={() => onNavigate("profile")}
            className="w-10 h-10 rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
            title={`${userName} - ${userEmail}`}
          >
            <img
              src={
                userImage
                  ? userImage
                  : userType === "admin"
                  ? "/managerProfile.png"
                  : "/profileEmployee.png"
              }
              alt={userName}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* ____________Mobile Top Navigation _____________*/}

      <div className="block md:hidden w-full mt-4">
        <div className="bg-white rounded-full px-4 py-3 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between">
            {/* Logout Icon */}
            {logoutItem && (
              <button
                onClick={() => handleItemClick(logoutItem)}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-full"
                title={logoutItem.label}
              >
                <img
                  src={logoutItem.iconSrc}
                  alt={logoutItem.label}
                  className="w-5 h-5 object-contain"
                  onError={() =>
                    console.error(`Failed to load ${logoutItem.iconSrc}`)
                  }
                />
              </button>
            )}

            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 rounded-full"
                title={item.label}
              >
                {item.type === "image" ? (
                  <img
                    src={item.iconSrc}
                    alt={item.label}
                    className="w-5 h-5 object-contain"
                    onError={() =>
                      console.error(`Failed to load ${item.iconSrc}`)
                    }
                  />
                ) : (
                  <item.icon
                    size={20}
                    className="text-gray-700"
                    strokeWidth={1.5}
                  />
                )}
              </button>
            ))}

            {/* User Profile */}
            <button
              onClick={() => onNavigate("profile")}
              className="hidden md:block w-8 h-8 rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
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
