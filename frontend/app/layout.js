import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { Wix_Madefor_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const wixDisplay = Wix_Madefor_Display({
  weight: ["600", "800"],
  subsets: ["latin"],
  variable: "--font-wix-display",
});

// För att förbättra SEO?
// export const metadata = {
//   title: "Website Name?",
//   description: "Description",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${wixDisplay.variable}`}>
      <body className="font-montserrat flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
