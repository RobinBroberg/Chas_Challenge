"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useUser } from "@/context/UserContext";

const MAIN_NAV = [
  { href: "/about", label: "OM OSS" },
  { href: "/about/survey", label: "OM BALANSUNDERSÖKNINGEN" },
];

const MAIN_NAV_USER = [
  { href: "/survey/intro", label: "BALANSUNDERSÖKNING" },
  { href: "/friskvard", label: "FRISKVÅRD" },
];

const MAIN_NAV_ADMIN = [
  { href: "/admin/surveys", label: "BALANSUNDERSÖKNING" },
  { href: "/admin/receipt-management", label: "KVITTOHANTERING" },
  { href: "/friskvard", label: "FRISKVÅRD" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useUser();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  if (loading) return null;

  return (
    <nav className="w-full bg-[#45463F] text-white px-6 py-5 relative z-20 font-montserrat">
      <div className="flex justify-between items-center w-full  mx-auto">
        {/* Left: Logo */}
        <Link href="/">
          <img
            src="/logonavbar.png"
            alt="Balance logo"
            className="w-[110px] sm:w-[150px] h-auto"
          />
        </Link>

        {/* Nav links in center (desktop only NOT logged in) */}
        {!isLoggedIn && (
          <div className="hidden md:flex gap-6 items-center justify-center flex-1 text-lg font-medium">
            {MAIN_NAV.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Nav links in center (desktop only when logged in) */}
        {isLoggedIn && (
          <div className="hidden md:flex gap-6 items-center justify-center flex-1 text-lg font-medium">
            {(isAdmin ? MAIN_NAV_ADMIN : MAIN_NAV_USER).map(
              ({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              )
            )}
          </div>
        )}

        {/* Right: Icons / Hamburger (mobile) / Login btn */}
        <div className="flex items-center gap-4">
          {/* Dashboard icon (visible on both mobile and desktop when admin) */}
          {isAdmin && (
            <Link href="/admin/dashboard">
              <img
                src="/dashboardIcon.png"
                alt="Admin Dashboard"
                className="w-6 h-6 cursor-pointer"
              />
            </Link>
          )}
          {isLoggedIn && (
            <>
              {menuOpen ? (
                <FiX
                  className="text-2xl cursor-pointer block md:hidden"
                  onClick={() => setMenuOpen(false)}
                />
              ) : (
                <FiMenu
                  className="text-2xl cursor-pointer block md:hidden"
                  onClick={() => setMenuOpen(true)}
                />
              )}
            </>
          )}

          {/* User icon (desktop only when logged in) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center">
              <Link
                href={
                  isAdmin ? "/admin/profile" : isUser ? "/profile" : "/profile"
                }
              >
                <AiOutlineUser className="w-6 h-6 cursor-pointer" />
              </Link>
            </div>
          )}

          {/* Login button (shown if NOT logged in) */}
          {!isLoggedIn && (
            <Link href="/login">
              <button className="font-montserrat text-sm sm:text-base px-4 py-2 sm:px-7 sm:py-3 bg-white text-black hover:bg-[#7B7D70] hover:text-white rounded-full font-semibold duration-200 hover:shadow-[inset_0px_5px_4px_rgba(0,0,0,0.25)]">
                Logga in
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown for hamburger menu on mobile */}
      {isLoggedIn && menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-[#4a4b41] px-6 py-3 flex flex-col gap-4 font-semibold text-sm shadow-md md:hidden">
          {(isAdmin ? MAIN_NAV_ADMIN : MAIN_NAV_USER).map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
          <Link
            href={isAdmin ? "/admin/profile" : "/profile"}
            className="hover:underline md:hidden"
          >
            PROFIL
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
