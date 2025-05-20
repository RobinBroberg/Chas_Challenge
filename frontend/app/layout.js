import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // eller fler beroende på behov
  variable: "--font-montserrat",
});
// För att förbättra SEO?
// export const metadata = {
//   title: "Website Name?",
//   description: "Description",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
