"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";

const MAIN_NAV = [
  { href: "/", label: "START" },
  { href: "/about", label: "OM OSS" },
  { href: "/survey", label: "OM MEDARBETARUNDERSÖKNINGEN" },
];

const HAMBURGER_MENU_LINKS = [
  { href: "/survey", label: "MEDARBETARUNDERSÖKNING" },
  { href: "/health", label: "FRISKVÅRD" },
  { href: "/swipe", label: "SWIPE" },
  { href: "/challenges", label: "UTMANINGAR" },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // toggle to true for testing
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#56584D] text-white px-6 py-4 relative z-20">
      <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl tracking-widest">
          BALANCE
        </Link>

        {/* Nav links in center (desktop only) */}
        <div className="hidden md:flex gap-6 items-center justify-center flex-1">
          {MAIN_NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm">
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Icons / Hamburger / Login btn */}
        <div className="flex items-center gap-4">
          {/* Hamburger menu (only if logged in) */}
          {isLoggedIn && (
            <>
              {menuOpen ? (
                <FiX
                  className="text-2xl cursor-pointer md:block"
                  onClick={() => setMenuOpen(false)}
                />
              ) : (
                <FiMenu
                  className="text-2xl cursor-pointer md:block"
                  onClick={() => setMenuOpen(true)}
                />
              )}
            </>
          )}

          {/* Visible icons (desktop only) */}
          <div className="hidden md:flex items-center gap-4">
            <FiSearch className="text-xl cursor-pointer" />
            <FiHeart className="text-xl cursor-pointer" />
            <FiUser className="text-xl cursor-pointer" />
          </div>

          {/* Login button (shown if NOT logged in) */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
              }}
              className="bg-white text-black px-4 py-2 rounded-full text-xs"
            >
              Logga in
            </button>
          )}
        </div>
      </div>

      {/* Dropdown for hamburger menu */}
      {isLoggedIn && menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-[#4a4b41] px-6 py-3 flex flex-col md:flex-row md:justify-center gap-4 font-semibold text-sm shadow-md">
          {HAMBURGER_MENU_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
