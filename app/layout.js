import "./globals.css";
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";

export const metadata = {
  title: "LY CSD Elective Portal | ODD 2026-27",
  description:
    "Look up your final elective subjects and subject codes for Semester 7, LY CSD, ODD 2026-27.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf9f7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
