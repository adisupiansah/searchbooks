import Navbar from "@/components/Navbar";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Roboto } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Books",
  description: "cari buku terkenal 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
