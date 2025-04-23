import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

// För att förbättra SEO?
// export const metadata = {
//   title: "Website Name?",
//   description: "Description",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
