import Link from "next/link";

const FOOTER_LINKS1 = [
  { href: "/start", label: "Start" },
  { href: "/om", label: "Om Balance" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/support", label: "Support" },
];

const FOOTER_LINKS2 = [
  { href: "/privacy", label: "Integritetspolicy" },
  { href: "/cookies", label: "Cookies Settings" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="p-6 text-coffee font-sans">
      <div className="container mx-auto">
        {/* Logga till vänster på desktop, centrerad på mobil */}
        <div className="w-full md:w-auto text-center md:text-left mb-6 md:mb-0">
          <Link href="/" className="text-3xl font-playfair">
            BALANCE
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center gap-4">
          {/* Centrera FOOTER_LINKS1 på desktop */}
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-8 text-sm md:text-base text-center leading-loose md:mb-12">
              {FOOTER_LINKS1.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-gray-300 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Separationslinje – synlig endast på mobil */}
        <div className="block md:hidden h-px w-full bg-gray-300 my-4" />

        {/* Copyright + FOOTER_LINKS2 */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center items-center mt-4 text-center">
          <p className="text-sm order-2 md:order-1 mt-6 mb-6 md:mt-0 ">
            © {currentYear} Balance. Alla rättigheter förbehållna.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center order-1 md:order-2 mb-6">
            {FOOTER_LINKS2.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gray-300 transition-colors underline text-sm leading-loose font-thin"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
