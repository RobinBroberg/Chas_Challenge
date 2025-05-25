import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const FOOTER_LINKS1 = [
  { href: "/about", label: "Om Balance" },
  { href: "/contact", label: "Kontakt" },
  { href: "/", label: "Start" },
];

const FOOTER_LINKS2 = [
  { href: "/privacy", label: "Integritetspolicy" },
  { href: "/cookies", label: "Cookie Settings" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="p-6 font-montserrat bg-[#FBFAF5]">
      <div className="container mx-auto">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-start mb-4 mt-4">
          {/* Vänster: Balance logga */}
          <div>
            <Link href="/">
              <img
                src="/logo.png"
                alt="Balance logo"
                className="w-[180px] h-auto mt-6 ml-6"
              />
            </Link>
          </div>

          {/* Mitten: Navigationslänkar */}
          <div className="flex flex-col items-center">
            <div className="flex gap-8 mb-12  mt-4">
              {FOOTER_LINKS1.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-gray-400 transition-colors text-sm font-medium"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex gap-8 text-xs">
              <p>© {currentYear} Balance. Alla rättigheter förbehållna.</p>
              {FOOTER_LINKS2.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="underline hover:text-gray-400"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Höger: Socials + CTA */}
          <div className="flex flex-col items-center gap-4 mt-9 mr-6">
            <div className="flex gap-4 text-xl mb-2 ">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
            <p className="text-lg">Kom igång med Balance</p>
          </div>
        </div>

        {/* Mobil layout */}
        <div className="md:hidden text-center">
          <div>
            <Link href="/">
              <img
                src="/logo.png"
                alt="Balance logo"
                className="mx-auto w-[150px] m-8"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-5 mb-4">
            {FOOTER_LINKS1.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gray-400 transition-colors text-sm"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-4 my-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
          {/* Separationslinje */}
          <div className="block md:hidden h-px w-full bg-black my-4" />

          <div className="flex flex-col gap-5 text-xs">
            {FOOTER_LINKS2.map(({ href, label }) => (
              <Link key={href} href={href} className="underline">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs  mt-10">
            © {currentYear} Balance. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
