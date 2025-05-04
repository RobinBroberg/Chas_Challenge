// components/Navbar.jsx
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "START" },
  { href: "/omOss", label: "OM OSS" },
  { href: "/undersökning", label: "OM MEDARBETARUNDERÖKNINGEN" },
];

const Navbar = () => {
  return (
    <nav className="w-full absolute top-0 left-0 z-10">
      <div className="w-full bg-white/15 backdrop-blur-[2px] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-[#413C38] dark:text-white text-4xl font-playfair"
          >
            BALANCE
          </Link>
          <div className="hidden md:flex gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#413C38] dark:text-white hover:text-[#5a534d] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
