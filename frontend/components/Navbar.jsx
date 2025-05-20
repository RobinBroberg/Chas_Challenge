"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { useUser } from "@/context/UserContext";

const MAIN_NAV = [
  { href: "/", label: "OM OSS" },
  { href: "/aboutSurvey", label: "OM BALANSUNDERSÖKNINGEN" },
  { href: "/aboutChallenges", label: "OM UTMANINGAR" },
];

const MAIN_NAV_LOGGED_IN = [
  { href: "/survey", label: "BALANSUNDERSÖKNING" },
  { href: "/friskvard", label: "FRISKVÅRD" },
  { href: "/swipe", label: "SWIPE" },
  { href: "/challenges", label: "UTMANINGAR" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <nav className="w-full bg-[#45463F] text-white px-6 py-5 relative z-20 font-montserrat">
      <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto">
        {/* Left: Logo */}
        <Link href="/">
          <img
            src="/logonavbar.png"
            alt="Balance logo"
            className="w-[150px] h-auto"
          />
        </Link>
        {/* Nav links in center (desktop only NOT logged in) */}
        {!isLoggedIn && (
          <div className="hidden md:flex gap-6 items-center justify-center flex-1 text-l font-medium">
            {MAIN_NAV.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Nav links in center (desktop only when logged in) */}
        {isLoggedIn && (
          <div className="hidden md:flex gap-6 items-center justify-center flex-1 text-l font-medium">
            {MAIN_NAV_LOGGED_IN.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Right: Icons / Hamburger (mobile) / Login btn */}
        <div className="flex items-center gap-4">
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

          {/* Visible icons (desktop only when logged in) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-4">
              <AiOutlineSearch className="text-xl cursor-pointer" />
              <AiOutlineHeart className="text-xl cursor-pointer" />
              <AiOutlineUser className="text-xl cursor-pointer" />
            </div>
          )}
          {/* Login button (shown if NOT logged in) */}
          {!isLoggedIn && (
            <Link href="/login">
              <button className="bg-white text-black px-4 py-2 rounded-full text-xs">
                Logga in
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown for hamburger menu on mobile */}
      {isLoggedIn && menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-[#4a4b41] px-6 py-3 flex flex-col gap-4 font-semibold text-sm shadow-md md:hidden">
          {MAIN_NAV_LOGGED_IN.map(({ href, label }) => (
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
